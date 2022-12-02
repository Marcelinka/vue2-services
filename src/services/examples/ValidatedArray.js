class ValidatedArray {
  _arr = [0, 1, 2];

  get arr() {
    return new Proxy(this._arr, {
      set(obj, prop, value) {
        // Записываем, если значение - это число ИЛИ свойство - это __proto__
        if (typeof value === 'number' || prop === '__proto__') {
          obj[prop] = value;

          return true;
        }

        throw new TypeError('Value must be number');
      }
    })
  }
}

const instance = new ValidatedArray();

export default instance;