class PrivatePrimitiveProperty {
  _privateString = {
    value: 'I\'m private',
  }

  get privateString() {
    return new Proxy(this._privateString, {
      set() {
        throw new Error('This property is read-only');
      },
    });
  }

  changePrivateString() {
    this._privateString.value = 'My value is changed from method';
  }
}

const instance = new PrivatePrimitiveProperty();

export default instance;