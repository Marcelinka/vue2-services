<template>
  <div>
    <input :value="operation.value" disabled />
    <button @click="test" />
  </div>
</template>

<script>
import { calculatorData } from '../services/Calculator.js';

export default {
  name: 'CalculatorInput',
  data() {
    return {
      ...calculatorData(['operation']),
    }
  },
  methods: {
    test() {
      this.operation.value = '5';
    }
  }
};
</script>
