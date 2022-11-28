class MutatedArray {
  arr = [0, 1, 2, 3];

  addElement() {
    const lastElem = this.arr.at(-1);
    this.arr.push(lastElem + 1);
  }

  removeElement() {
    this.arr.pop();
  }
}

const instance = new MutatedArray();

export default instance;