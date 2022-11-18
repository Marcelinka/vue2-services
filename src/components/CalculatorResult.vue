<template>
  <div>
    <button @click="calculateResultAndAddCounter">=</button>
    <div>
      <span>{{ resultCounter.value }}</span><br />
      <span>{{ operation.withSpaces }}</span><br />
      <button @click="causeTypeError">Try to set string</button><br />
      <button @click="causePropError">Try to set another property</button><br />
      <span>{{ symbolsWithOperation.value }}</span>
    </div>
  </div>
</template>

<script>
import { calculatorData, calculatorMethods } from '../services/Calculator.js';

export default {
  name: 'CalculatorResult',
  data() {
    return {
      ...calculatorData(['operation', 'resultCounter', 'symbolsWithOperation']),
      ...calculatorMethods(['calculateResult']),
    };
  },
  methods: {
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
