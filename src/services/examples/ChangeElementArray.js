import Vue from 'vue';

class ChangeElementArray {
  arr = ['init', 'init'];

  changeElem() {
    Vue.set(this.arr, 1, 'I\'m changed!');
  }
}

const instance = new ChangeElementArray();

export default instance;