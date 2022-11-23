class ValidatedPrimitiveProperty {
  _validatedString = {
    value: 'I\'m only string',
  }

  get validatedString() {
    return new Proxy(this._validatedString, {
      set(obj, prop, value) {
        // Запрещаем добавление новых полей
        if (prop !== 'value') {
          throw new Error('Only accesible property is "value"');
        }

        // Запрещаем записывать НЕ строку
        if (typeof value !== 'string') {
          throw new TypeError('Value must be string');
        }

        // Проводим операцию присваивания
        obj[prop] = value;

        // Сигнализируем, что ошибки не возникло
        return true;
      },
    });
  }
}

const instance = new ValidatedPrimitiveProperty();

export default instance;