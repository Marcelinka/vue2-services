class Calculator {
  _showedResult = false;

  _operation = {
    value: '',
  };

  get operation() {
    return new Proxy(this._operation, { set: () => false });
  }

  addSymbolToOperation(s) {
    if (this._showedResult) {
      this._operation.value = '';
      this._showedResult = false;
    }

    this._operation.value += s;
  }

  calculateResult() {
    this._operation.value = eval(this.operation.value);
    this._showedResult = true;
  }
};

let instance;

const getInstance = () => {
  if (!instance) {
    instance = new Calculator();
  }

  return instance;
};

const PUBLIC_PROPERTY_NAMES = ['operation'];
const calculatorData = (propNames) => {
  const _ = getInstance();
  const res = { };
  
  for (const prop of propNames) {
    if (PUBLIC_PROPERTY_NAMES.includes(prop)) {
      res[prop] = _[prop];
    }
  }

  return res;
};

const PUBLIC_METHODS_NAMES = ['addSymbolToOperation', 'calculateResult'];
const calculatorMethods = (methodsNames) => {
  const _ = getInstance();
  const res = { };

  for (const method of methodsNames) {
    if (PUBLIC_METHODS_NAMES.includes(method)) {
      res[method] = _[method].bind(_);
    }
  }
  
  return res;
};

export { calculatorData, calculatorMethods };