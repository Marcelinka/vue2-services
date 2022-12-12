class MultipleObjects {
  firstPerson = {
    name: 'Alex',
  }

  secondPerson = {
    name: 'Dora',
  }

  plus = {
    _first: this.firstPerson,
    _second: this.secondPerson,
    get val() {
      return `${this._first.name} + ${this._second.name}`;
    }
  }

  nextPair() {
    this.firstPerson.name = 'Kirill';
    this.secondPerson.name = 'Diana';
  }
}

const instance = new MultipleObjects();

export default instance;
