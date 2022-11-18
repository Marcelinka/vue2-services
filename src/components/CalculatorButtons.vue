<template>
  <div>
    <button
      v-for="s in symbols"
      :key="s"
      @click="() => addSymbolToOperation(s)"
    >
      {{ s }}
    </button>
    <button @click="() => addSymbolToButtons('*')">Add button</button><br/>
    <button @click="addSymbol">Add symbol directly</button>
    <button @click="setNewSymbols">Recreate buttons</button>
  </div>
</template>

<script>
import { calculatorData, calculatorMethods } from '../services/Calculator.js';

export default {
  name: 'CalculatorButton',
  data() {
    return {
      ...calculatorData(['symbols']),
      ...calculatorMethods(['addSymbolToOperation', 'addSymbolToButtons', 'setNewSymbols']),
    }
  },
  methods: {
    addSymbol() {
      this.symbols.push('*');
    }
  },
};
</script>
