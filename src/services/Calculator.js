class Calculator {
  /**
   * Общий инстанс класса, для сохранения экземпляра между компонентами
   * 
   * @type {Calculator}
   */
  static instance = null;
  /**
   * Закрытый инстанс класса, который можно получить по ключу
   * 
   * @type {[key]: Calculator}
   */
  static scopedInstances = {};

  /**
   * Приватное свойство
   * Не подразумевается, что его нужно будет читать извне
   */
  _showedResult = false;

  /**
   * Публичное свойство, хранящее в себе примитив
   * 
   * К сожалению, примитивы сами по себе не очень хорошо дружат с реактивностью,
   * но оборачивая его в объект и передавая ссылку мы можем добиться реактивности
   * 
   * Я вдохновлялась функцией `ref` из vue 3
   * 
   * @see https://vuejs.org/api/reactivity-core.html#ref
   * 
   * Примитив внутри класса по сути можно хранить в оригинальном виде, лишь
   * на выход в геттере отдавать объект
   * 
   * @example
   * // внутри класса работаем как с обычной строкой
   * _someString: '',
   * // для компонента отдаем объект с `value`
   * get someString() {
   *  return { value: this._someString };
   * }
   */
  _operation = {
    value: '',
    /**
     * Это аналог `computed` для одного свойства, либо для нескольких,
     * если они объединены в один объект
     * 
     * Для него нельзя создавать алиас, по типу
     * this.someOtherProp = this.operation.withSpaces
     * иначе оно не будет работать
     * 
     * Если вы не понимаете, как это работает, то советую прочитать книгу про контекст
     * @see https://kbpsystem777.github.io/You-Dont-Know-JS/this&object-prototypes/ch1.html
     * 
     * @example
     * <template>
     *  <div>{{ operation.withSpaces }}</div>
     * </template>
     * <script>
     * import ..
     * export default {
     *  ..
     *  data() {
     *    ...calculatorData(['operation']),
     *    ..
     *  },
     *  ..
     * }
     * </script>
     */
    get withSpaces() {
      return String(this.value).replace(/\+/g, ' + ');
    }
  };

  /**
   * Алиас для публичного свойства
   * 
   * Мы можем спокойно передавать само свойство без алиаса, но тогда
   * любой компонент принимающий это свойство сможет изменить его собственноручно
   * 
   * Если вы хотите запретить проверку, или добавить валидатор, то необходимо сделать алиас
   */
  get operation() {
    /**
     * Вся магия происходит из-за оборачивания свойства в Proxy
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
     * 
     * Именно с помощью перехватывания `set`, можно либо запретить изменение, либо отвалидировать
     * В данном случае ф-я `set` выкидывает exception с описанием ошибки, но также можно
     * просто вернуть `false` из функции (также будет ошибка, просто без толкового описания)
     */
    return new Proxy(this._operation, {
      set() {
        throw new Error('This property is read-only')
      }
    });
  }

  /**
   * Публичный метод, здесь ничего необычного, реактивность сработает
   * засчет того, что мы отдаем в компонент ссылку на объект
   */
  addSymbolToOperation(s) {
    if (this._showedResult) {
      this._operation.value = '';
      this._showedResult = false;
    }

    this._operation.value += s;
  }

  calculateResult() {
    this._operation.value = eval(this.operation.value);
    this._showedResult = true;
  }

  // Публичное свойство, подразумевающее, что его будут изменять снаружи
  _resultCounter = {
    value: 0,
  }

  // Алиас для публичного свойства, чтобы добавить валидатор
  get resultCounter() {
    return new Proxy(this._resultCounter, {
      set(obj, prop, value) {
        // Запрещаем добавление новых полей
        if (prop !== 'value') {
          throw new Error('Only accesible property is "value"');
        }

        // Запрещаем записывать НЕ число
        if (!Number.isInteger(value)) {
          throw new TypeError('Value must be integer');
        }

        // Проводим операцию присваивания
        obj[prop] = value;
        // Сигнализируем, что ошибки не возникло
        return true;
      }
    })
  }

  /**
   * Публичное свойство массив, реактивность работает безупречно сама по себе
   * Проверено в версии vue 2.7.14
   * Если вы не хотите запрещать изменение массива извне, достаточно просто создать массив
   * 
   * Важно отметить, что даже если вы разрешаете изменение извне, оно должно
   * работать по тем же правилам, что описаны в комментарии перед методом `setNewSymbols`,
   * т.е. использовать только мутирующие сам массив методы, без перезаписывания ссылки
   * Иначе связь с сервисом потеряется
   * 
   * Но проще просто все операции изменения проводить внутри сервиса, где и хранить
   * такую неприглядную логику
   */
  _symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-'];

  /**
   * С запретом изменения становится интересно, для того чтобы работала реактивность
   * vue должен иметь возможность установить свойство `__proto__`
   */
  get symbols() {
    return new Proxy(this._symbols, {
      set(obj, prop, value) {
        // Даем возможность vue установить `__proto__` для реактивности
        if (prop === '__proto__') {
          obj[prop] = value;

          return true;
        }

        // Запрещаем любые остальные изменения
        return false;
      },
    });
  }

  addSymbolToButtons(s) {
    this._symbols.push(s);
  }

  /**
   * Реактивность массивов работает засчет ссылки, если нам нужно полностью
   * пересоздать массив, мы не можем просто заменить его `this._symbols = []`
   * 
   * Чтобы реактивность продолжала работать, мы можем использовать только
   * методы, мутирующие сам массив. Если таких методов недостаточно, то
   * стоит создать объект-обертку для того чтобы ссылаться на ссылку-объект,
   * которая не меняется
   */
  setNewSymbols() {
    // Удаляем все элементы
    this._symbols.length = 0;
    // Добавляем новые
    for (const s of ['8', '5', '6', '+']) {
      this._symbols.push(s);
    }
  }

  /**
   * Аналог computed для нескольких свойств, фишка опять же в том, что мы возвращаем объект,
   * что позволяет ссылаться на ссылку и засчет этого работает реактивность
   * 
   * Переменные, которые вам необходимо отслеживать, нужно добавить в свойства объекта
   * Как вы видите я добавила сразу алиасы, что продолжает запрещать прямое изменение
   * наших ссылок
   * 
   * Само вычисляемое значение я положила в геттер `value`
   * 
   * Обращаю ваше внимание, что `this` при правильном использовании будет означать
   * объект, который мы возвращаем из геттера
   * 
   * О том, почему это так работает, можете прочитать в книге
   * @see https://kbpsystem777.github.io/You-Dont-Know-JS/this&object-prototypes/ch1.html
   * 
   * Мы не можем вернуть сразу наше значение, т.к. оно будет строкой и реактивность
   * тогда работать не будет
   */
  get symbolsWithOperation() {
    return {
      symbols: this.symbols,
      operation: this.operation,
      get value() {
        return this.symbols.join() + this.operation.value;
      }
    };
  }
};

/**
 * Это простенький DI, позволяющий получать один и тот же экземпляр,
 * но при этом создавать его только тогда, когда он действительно нужен
 */
const getInstance = (key = '') => {
  if (key) {
    if (!Calculator.scopedInstances[key]) {
      Calculator.scopedInstances[key] = new Calculator();
    }

    return Calculator.scopedInstances[key];
  }

  if (!Calculator.instance) {
    Calculator.instance = new Calculator();
  }

  return Calculator.instance;
};

/**
 * Константа, в которую мы зашиваем доступные данные для чтения
 * (и записи, если вы делаете публичное свойство без алиаса)
 * 
 * Позволяет ограничить свойства, не давая читать любые данные
 * 
 * Подобные константы опциональны, если вам не нужно ограничивать чтение
 * свойств и методов, можете просто не добавлять такие проверки
 */
const PUBLIC_PROPERTY_NAMES = [
  'operation',
  'resultCounter',
  'symbols',
  'symbolsWithOperation',
];
/**
 * @typedef {string} NewPropName
 */
/**
 * @typedef {string} PropName
 */
/**
 * @typedef {{[NewPropName]: PropName}} PropNamesWithAliases
 */
/**
 * @typedef {PropName[] | PropNamesWithAliases} PropNames
 */
/**
 * Специальная функция, позволяющая записать данные для чтения
 * в блок `data` в компоненте
 * 
 * На самом деле его необязательно записывать в `data`, сама переменная
 * в любом случае будет в актуальном состоянии, но чтобы воспользоваться
 * ей в секции `template` или использовать другую функциональность (e.g watchers/computed)
 * ее нужно встраивать в секцию `data`
 * 
 * @param {string | PropNames} keyOrPropNames - ключ ИЛИ свойства, которые вы хотите получите
 * @param {PropNames} [propNames] - если передается ключ, то вторым параметром передаем свойства
 * @returns { {[PropName]: any} } - отдает объект со всеми запрашиваемыми свойствами
 * 
 * @example
 * data() {
 *  return {
 *    ...calculatorData(['operation']),
 *    ...calculatorData('someKey', { newOp: 'operation' })
 *  };
 * }
 */
const calculatorData = (keyOrPropNames, propNames) => {
  let instance = null;

  if (typeof keyOrPropNames === 'string') {
    instance = getInstance(keyOrPropNames);
  } else {
    propNames = keyOrPropNames;
    instance = getInstance();
  }

  if (!Array.isArray(propNames)) {
    propNames = Object.entries(propNames);
  }

  const res = { };
  
  for (const prop of propNames) {
    let propAlias = prop instanceof Array ? prop[0] : prop;
    let propName = prop instanceof Array ? prop[1] : prop;
    
    // Если не нужна проверка доступных свойств, этот `if` не нужен
    if (PUBLIC_PROPERTY_NAMES.includes(propName)) {
      res[propAlias] = instance[propName];
    }
  }

  return res;
};

/**
 * Такого же типа константа, только определяющая список доступных методов
 */
const PUBLIC_METHODS_NAMES = [
  'addSymbolToOperation',
  'calculateResult',
  'addSymbolToButtons',
  'setNewSymbols',
];
/**
 * @typedef {string} NewMethodName
 */
/**
 * @typedef {string} MethodName
 */
/**
 * @typedef {{[NewMethodName]: MethodName}} MethodsNamesWithAliases
 */
/**
 * @typedef {MethodName[] | MethodsNamesWithAliases} MethodsNames
 */
/**
 * Специальная функция, позволяющая получить методы сервиса
 * 
 * Также как и в предыдущем примере, она также будет работать и без встраивания в
 * компонент в секцию `methods`, но если вы хотите их использовать в `template`,
 * то без встраивания не обойтись
 * 
 * @param {string | MethodsNames} keyOrMethodsNames - ключ ИЛИ методы, которые вы хотите получить
 * @param {MethodsNames} [methodsNames] - если передали ключ, то вторым параметром передаем методы
 * @returns { {[MethodName]: Function} }
 * 
 * @example
 * methods: {
 *  ...calculatorMethods(['calculateResult']),
 *  ...calculatorMethods('key', { newCalc: 'calculateResult' })
 * },
 */
const calculatorMethods = (keyOrMethodsNames, methodsNames) => {
  let instance = null;

  if (typeof keyOrMethodsNames === 'string') {
    instance = getInstance(keyOrMethodsNames);
  } else {
    methodsNames = keyOrMethodsNames;
    instance = getInstance();
  }

  if (!Array.isArray(methodsNames)) {
    methodsNames = Object.entries(methodsNames);
  }

  const res = { };

  for (const method of methodsNames) {
    let methodAlias = method instanceof Array ? method[0] : method;
    let methodName = method instanceof Array ? method[1] : method;

    if (PUBLIC_METHODS_NAMES.includes(methodName)) {
      res[methodAlias] = instance[methodName].bind(instance);
    }
  }
  
  return res;
};

export { calculatorData, calculatorMethods };