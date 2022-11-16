<template>
  <div id="app">
    <calculator-input />
    <calculator-buttons />
    <calculator-result /><br /><br />
    <calculator-2 />
  </div>
</template>

<script>
import CalculatorInput from './components/CalculatorInput.vue';
import CalculatorButtons from './components/CalculatorButtons.vue';
import CalculatorResult from './components/CalculatorResult.vue';
import Calculator2 from './components/Calculator2.vue';

export default {
  name: 'App',
  components: {
    CalculatorInput,
    CalculatorButtons,
    CalculatorResult,
    Calculator2,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
