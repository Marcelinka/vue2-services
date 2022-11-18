/**
 * Фабрика для создания функция получения свойств/методов
 * 
 * @param {string[]} [PUBLIC_NAMES] - при передаче будут добавляться только свойства/методы
 *  из разрешенного списка
 * @param {function} getInstance - функция получения экземпляра сервиса с/без ключа,
 *  фабрику для такой функции можно найти в `ServiceDI.js`
 * @param {boolean} [isProp=true] - если `true` то просто добавляется в объект,
 *  если `false`, то это считается методом, и он биндится к экземпляру класса
 * @returns {GetDataForComponent}
 */
const baseFactory = (getInstance, PUBLIC_NAMES, isProp = true) =>
  /**
   * Отдает подготовленный объект свойств/методов для встраивания во Vue component
   * 
   * @callback GetDataForComponent
   * 
   * @param {string|string[]|{[string]: string}} keyOrNames первым параметром можно передать
   *  либо ключ экземпляра, либо названия свойств/методов, которые вы хотите получить
   * @param {string[]|{[string]: string}} [names] - названия свойств/методов (если первым параметром
   *  передали ключ), можно передать в формате массива (тогда будут встроены с изначальными названиями)
   *  или в формате объекта (тогда ключи объекта - это новые названия, а значения - имена свойств/методов)
   * @returns {{[string]: *}} объект для встройки в секцию `data` (можно использовать без встраивания)
   * 
   * @example
   * data() {
   *  ...serviceNameData(['somePropertyName']),
   *  ...serviceNameData('keyForInstance', ['someOtherName']),
   *  ...serviceNameData({ aliasOne: 'somePropertyName' }),
   *  ...serviceNameData('keyForInstance', { aliasTwo: 'someOtherName' })
   * }
   */
  (keyOrNames, names) => {
    let instance = null;

    if (typeof keyOrNames === 'string') {
      instance = getInstance(keyOrNames);
    } else {
      names = keyOrNames;
      instance = getInstance();
    }

    if (!Array.isArray(names)) {
      names = Object.entries(names);
    }

    const res = { };

    for (const name of names) {
      let nameAlias = name instanceof Array ? name[0] : name;
      let nameFromClass = name instanceof Array ? name[1] : name;
      
      if (!PUBLIC_NAMES || PUBLIC_NAMES.includes(nameFromClass)) {
        res[nameAlias] = isProp ? instance[nameFromClass] : instance[nameFromClass].bind(instance);
      }
    }

    return res;
  }

/**
 * Фабрика для создания функции получения свойств
 * 
 * @param {function} getInstance 
 * @param {string[]} [PUBLIC_PROPERTY_NAMES]
 * @returns {GetDataForComponent}
 * 
 * @example
 * const PUBLIC_PROPERTY_NAMES = ['somePropName']
 * const serviceNameData = dataFactory(getInstance, PUBLIC_PROPERTY_NAMES)
 * const serviceNameWithoutChecksData = dataFactory(getInstance)
 */
export const dataFactory = (getInstance, PUBLIC_PROPERTY_NAMES) =>
  baseFactory(getInstance, PUBLIC_PROPERTY_NAMES, true);

/**
 * Фабрика для создания функции получения методов
 * 
 * @param {function} getInstance 
 * @param {string[]} [PUBLIC_METHOD_NAMES]
 * @returns {GetDataForComponent}
 * 
 * @example
 * const PUBLIC_METHOD_NAMES = ['getSomething']
 * const serviceNameMethods = methodsFactory(getInstance, PUBLIC_METHOD_NAMES)
 * const serviceNameWithoutChecksMethods = methodsFactory(getInstance)
 */
export const methodsFactory = (getInstance, PUBLIC_METHOD_NAMES) =>
  baseFactory(getInstance, PUBLIC_METHOD_NAMES, false);