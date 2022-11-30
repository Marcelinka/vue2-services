import Vue from 'vue';

class ArrWithObjects {
  arr = [
    { id: 1, a: 'test', b: 'test' },
    { id: 2, a: 'test', b: 'test' }
  ];

  rewriteFirstElem() {
    Vue.set(this.arr, 0, { id: 1, a: 'anotherTest', b: 'test' });
  }

  changePropOfSecond() {
    this.arr[1].a = 'anotherTest'; // Works!
  }

  changeByLink() {
    const elem = this.arr[0];
    elem.a = 'changed by link';
  }
}

const instance = new ArrWithObjects();

export default instance;