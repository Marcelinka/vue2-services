<template>
  <div>
    <div>Второй экземпляр калькулятора</div>

    <input :value="input.value" disabled />
    <button @click="calc">=</button><br />
    <button @click="setOperation">Add some numbers</button>
  </div>
</template>

<script>
import { calculatorData, calculatorMethods, destroyCalculator } from '../services/Calculator';

export const KEY = 'test_instance';

export default {
  name: 'Calculator2',
  data() {
    return {
      ...calculatorData(KEY, {
        input: 'operation',
      }),
      ...calculatorMethods(KEY, {
        write: 'addSymbolToOperation',
        calc: 'calculateResult',
      }),
    };
  },
  destroyed() {
    destroyCalculator(KEY);
  },
  methods: {
    setOperation() {
      this.write('5+6', this.input);
    },
  }
}
</script>
