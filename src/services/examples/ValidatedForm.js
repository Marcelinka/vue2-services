class ValidatedForm {
  /**
   * В нашей форме будет 2 поля:
   *  - `firstname` для ввода имени (доступны только буквы)
   *  - `age` для ввода возраста (доступны только цифры)
   */
  _form = {
    firstName: '',
    age: '',
  }

  /**
   * Здесь мы будем собирать наши ошибки
   */
  errors = {
    firstName: '',
    age: '',
  }

  get form() {
    return new Proxy(this._form, {
      set: (obj, prop, value) => {
        // Обработка firstName
        if (prop === 'firstName') {
          // Проверяем все ли символы являются буквами
          if (/^[a-zа-яё]*$/i.test(value)) {
            // Обнуляем ошибку при валидном значении
            this.errors.firstName = '';
          } else {
            // Записываем ошибку, если значение не валидно
            this.errors.firstName = 'Доступны только буквы';
          }
        }

        // Обработка age
        if (prop === 'age') {
          // Проверяем все ли символы являются цифрами
          if (/^\d*$/.test(value)) {
            this.errors.age = '';
          } else {
            this.errors.age = 'Доступны только цифры';
          }
        }

        /**
         * Записываем значение в любом случае
         * Мы не запрещаем пользователю вписывать поля, а лишь сигнализируем
         * что с ними что-то не так
         */
        obj[prop] = value;
        // Сигнализируем, что все прошло успешно
        return true;
      }
    })
  }
}

const instance = new ValidatedForm();

export default instance;