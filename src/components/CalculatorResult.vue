<template>
  <button @click="calculateResult">=</button>
</template>

<script>
import { calculatorMethods } from '../services/Calculator.js';

export default {
  name: 'CalculatorResult',
  methods: {
    ...calculatorMethods(['calculateResult']),
  },
};
</script>
