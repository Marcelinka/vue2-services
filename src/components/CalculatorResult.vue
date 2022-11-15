<template>
  <div>
    <button @click="calculateResultAndAddCounter">=</button>
    <div>
      <span>{{ resultCounter.value }}</span><br />
      <span>{{ operation.withSpaces }}</span><br />
      <button @click="causeTypeError">Try to set string</button><br />
      <button @click="causePropError">Try to set another property</button>
    </div>
  </div>
</template>

<script>
import { calculatorData, calculatorMethods } from '../services/Calculator.js';

export default {
  name: 'CalculatorResult',
  data() {
    return {
      ...calculatorData(['operation', 'resultCounter']),
    };
  },
  methods: {
    ...calculatorMethods(['calculateResult']),
    calculateResultAndAddCounter() {
      this.calculateResult();
      this.resultCounter.value += 1;
    },
    causeTypeError() {
      this.resultCounter.value = 'test';
    },
    causePropError() {
      this.resultCounter.test = 0;
    },
  },
};
</script>
