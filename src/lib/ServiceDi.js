/**
 * @class
 * 
 * Добавляет сервисные поля для хранения экземпляров класса
 * 
 * @example
 * class SomeService extends ServiceDi { }
 */
export default class ServiceDI {
  /**
   * @static
   * @public
   * @type {?Object} - экземпляр класса
   */
  static instance = null;

  /**
   * @static
   * @public
   * @type {{[string]: ?Object}} - объект для хранения экземпляров по ключу
   */
  static scopedInstances = {};
}

/**
 * Фабрика для создания функции типа InstanceGetter для переданного класса
 * Использует поля из ServiceDI
 * 
 * @param {Function} Service - ваш класс
 * @returns {InstanceGetter}
 * 
 * @example
 * class SomeService extends ServiceDI { }
 * const getInstance = getInstanceFactory(SomeService)
 */
export const getInstanceFactory = (Service) =>
  /**
   * Отдает существующий или новый экземпляр класса (если существующий еще не создан)
   * 
   * @callback InstanceGetter
   * @param {string} [key] - ключ для получения именнованного экземпляря, иначе отдает общий
   * @returns {Object} - требуемый экземпляр класса
   */
  (key = '') => {
    if (key) {
      return Service.scopedInstances[key]
        || (Service.scopedInstances[key] = new Service())
    }

    return Service.instance || (Service.instance = new Service);
  }

/**
 * Фабрика для создания функция уничтожении экземпляров
 * Использует поля из ServiceDI
 * 
 * @param {Function} Service - ваш класс
 * @returns {DestroyFunction}
 */
export const destroyFactory = (Service) =>
  /**
   * Уничтожение базового экземпляра или по ключам
   * 
   * @callback DestroyFunction
   * @param  {...string} [keys] - если не передано ничего, то уничтожаем базовый,
   *  если переданы строки через запятую, то уничтожаем все экземпляры
   * 
   * @example
   * destroyServiceName();
   * destroyServiceName('someKey');
   * destroyServiceName('someKey', 'someAnotherKey');
   */
  (...keys) => {
    if (keys.length > 0) {
      for (const key of keys) {
        delete Service.scopedInstances[key];
      }
    } else {
      Service.instance = null;
    }
  }