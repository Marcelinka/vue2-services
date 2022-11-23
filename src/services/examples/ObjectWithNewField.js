import Vue from 'vue';

class ObjectWithNewField {
  testObject = {
    oldField: 'I was here from the beginning!'
  }

  addNewField() {
    Vue.set(this.testObject, 'newField', 'I was added recently!');
  }
}

const instance = new ObjectWithNewField();

export default instance;