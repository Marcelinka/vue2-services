class StaticObjectProperty {
  settings = {
    firstProp: 'I\'m a prop in object',
    secondProp: 666,
  }

  changeFirstProp() {
    this.settings.firstProp = 'I was changed from a method!';
  }

  addSomeLuck() {
    this.settings.secondProp = 777;
  }
}

const instance = new StaticObjectProperty();

export default instance;