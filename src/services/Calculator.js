class Calculator {
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
     * В данном случае ф-я `set` возвращает `false`, что запрещает любое изменение
     */
    return new Proxy(this._operation, { set: () => false });

    /**
     * Так мог бы выглядеть валидатор для значения
     */
    // return new Proxy(this._operation, {
    //   set(val) {
    //     if (validator(val)) {
    //       return true;
    //     }

    //     return false;
    //   }
    // });
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
 */
const PUBLIC_PROPERTY_NAMES = ['operation'];
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
    if (PUBLIC_PROPERTY_NAMES.includes(prop)) {
      res[prop] = _[prop];
    }
  }

  return res;
};

/**
 * Такого же типа константа, только определяющая список доступных методов
 */
const PUBLIC_METHODS_NAMES = ['addSymbolToOperation', 'calculateResult'];
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