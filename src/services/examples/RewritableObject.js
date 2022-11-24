class RewritableObject {
  obj = {
    value: null,
  }

  fillObj() {
    this.obj.value = { field: 'field' };
  }
}

const instance = new RewritableObject();

export default instance;