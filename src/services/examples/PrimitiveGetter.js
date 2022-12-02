class PrimitiveGetter {
  prop = {
    value: 'lowercase',
    get valueUp() {
      return this.value.toUpperCase();
    }
  }
}

const instance = new PrimitiveGetter();

export default instance;