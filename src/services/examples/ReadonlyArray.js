class ReadonlyArray {
  _arr = [0, 1, 2];

  get arr() {
    return new Proxy(this._arr, {
      set(obj, prop, value) {
        // Даем возможность vue установить `__proto__` для реактивности
        if (prop === '__proto__') {
          obj[prop] = value;

          return true;
        }
        
        // В остальных случаях ошибка
        throw new Error('This value is readonly');
      }
    })
  }

  addElement() {
    this._arr.push(3); // Works!
  }
}

const instance = new ReadonlyArray();

export default instance;