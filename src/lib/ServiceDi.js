/**
 * @class
 * 
 * Добавляет сервисные поля для хранения экземпляров класса
 * 
 * Эти поля используются фукцией `getInstance`, чтобы корректно
 * найти экземпляр класса
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
   * @type {{[key]: ?Object}} - объект для хранения экземпляров по ключу
   */
  static scopedInstances = {};
}

/**
 * Отдает существующий или новый экземпляр класса (если существующий еще не создан)
 * 
 * @callback InstanceGetter
 * @param {string} [key] - ключ для получения именнованного экземпляря, иначе отдает общий
 * @returns {Object} - требуемый экземпляр класса
 */
/**
 * Фабрика для создания функции типа InstanceGetter для переданного класса
 * 
 * @param {Function} Service - ваш класс
 * @returns {InstanceGetter}
 * 
 * @example
 * class SomeService extends ServiceDI { }
 * const getInstance = getInstanceFactory(SomeService)
 */
export const getInstanceFactory = (Service) => (key = '') => {
  if (key) {
    return Service.scopedInstances[key]
      || (Service.scopedInstances[key] = new Service())
  }

  return Service.instance || (Service.instance = new Service);
}