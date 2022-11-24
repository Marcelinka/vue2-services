class ReadonlyObject {
  _obj = {
    field: 'string',
    field2: 'anotherString'
  }

  get obj() {
    return new Proxy(this._obj, {
      set() {
        throw new Error('This property is read-only')
      }
    })
  }

  changeField() {
    this._obj.field = 'number';
    this._obj.field2 = 'anotherNumber';
  }
}

const instance = new ReadonlyObject();

export default instance;