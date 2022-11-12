<template>
  <div>
    <button
      v-for="s in symbols"
      :key="s"
      @click="() => addSymbolToOperation(s)"
    >
      {{ s }}
    </button>
  </div>
</template>

<script>
import { calculatorMethods } from '../services/Calculator.js';

const SYMBOLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-'];

export default {
  name: 'CalculatorButton',
  data() {
    return {
      symbols: SYMBOLS,
    }
  },
  methods: {
    ...calculatorMethods(['addSymbolToOperation']),
  },
};
</script>
