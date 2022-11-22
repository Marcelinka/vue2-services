class PrimitivePropertyWithMethod {
  someString = {
    value: 'someString',
  };

  changeValue() {
    this.someString.value = 'anotherString';
  }
}

const instance = new PrimitivePropertyWithMethod();

export default instance;