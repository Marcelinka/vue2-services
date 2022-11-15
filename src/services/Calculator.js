class Calculator {
  /**
   * Публичное свойство массив, реактивность работает безупречно сама по себе в версии vue 2.7.14
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
   */
  _operation = {
    value: '',
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

  addSymbolToButtons(s) {
    this._symbols.push(s);
  }

  /**
   * Реактивность массивов работает засчет ссылки, если нам нужно полностью
   * пересоздать массив, мы не можем просто заменить его `this._symbols = []`
   * 
   * Чтобы реактивность продолжала работать, мы можем использовать только
   * методы, мутирующие сам массив. Если таких методов недостаточно, то
   * стоит создать объект-обертку  того чтобы ссылаться на ссылку-объект, которая не меняется
   */
  setNewSymbols() {
    // Удаляем все элементы
    this._symbols.length = 0;
    // Добавляем новые
    for (const s of ['8', '5', '6', '+']) {
      this._symbols.push(s);
    }
  }
};

let instance;

/**
 * Это простенький DI, позволяющий получать один и тот же экземпляр,
 * но при этом создавать его только тогда, когда он действительно нужен
 */
const getInstance = () => {
  if (!instance) {
    instance = new Calculator();
  }

  return instance;
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
const PUBLIC_PROPERTY_NAMES = ['operation', 'resultCounter', 'symbols'];
/**
 * Специальная функция, позволяющая записать данные для чтения
 * в блок `data` в компоненте
 * 
 * На самом деле его необязательно записывать в `data`, сама переменная
 * в любом случае будет в актуальном состоянии, но чтобы воспользоваться
 * ей в секции `template` или использовать другую функциональность (e.g watchers/computed)
 * ее нужно встраивать в секцию `data`
 * 
 * @param {string[]} propNames - свойства, которые вы хотите получите
 * @returns { {[property]: unknown} } - отдает объект со всеми запрашиваемыми свойствами
 * 
 * @example
 * data() {
 *  return {
 *    ...calculatorData(['operation']),
 *  };
 * }
 */
const calculatorData = (propNames) => {
  const _ = getInstance();
  const res = { };
  
  for (const prop of propNames) {
    // Если не нужна проверка доступных свойств, этот `if` не нужен
    if (PUBLIC_PROPERTY_NAMES.includes(prop)) {
      res[prop] = _[prop];
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
 * Специальная функция, позволяющая получить методы сервиса
 * 
 * Также как и в предыдущем примере, она также будет работать и без встраивания в
 * компонент в секцию `methods`, но если вы хотите их использовать в `template`,
 * то без встраивания не обойтись
 * 
 * @param {string[]} methodsNames - методы, которые вы хотите получить
 * @returns { {[methodName]: Function} }
 * 
 * @example
 * methods: {
 *  ...calculatorMethods(['calculateResult']),
 * },
 */
const calculatorMethods = (methodsNames) => {
  const _ = getInstance();
  const res = { };

  for (const method of methodsNames) {
    if (PUBLIC_METHODS_NAMES.includes(method)) {
      res[method] = _[method].bind(_);
    }
  }
  
  return res;
};

export { calculatorData, calculatorMethods };