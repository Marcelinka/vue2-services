class RewritableArray {
  arr = {
    value: [0, 1, 2],
  };

  changeArr() {
    this.arr.value = [3, 2, 4];
  }
}

const instance = new RewritableArray();

export default instance;