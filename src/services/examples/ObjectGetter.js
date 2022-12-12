class ObjectGetter {
  person = {
    firstName: 'Jane',
    lastName: 'Dow',
    get fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }

  changeFirstName() {
    this.person.firstName = 'Marcelinka';
  }
}

const instance = new ObjectGetter();

export default instance;