<template>
  <div id="app">
    <calculator-input />
    <calculator-buttons />
    <calculator-result /><br /><br />
    <template v-if="showCalculator2">
      <calculator-2 />
      <calculator-2-result />
    </template>
    <button @click="toggleCalculator2">Hide and destroy Calculator 2 / Show</button>
  </div>
</template>

<script>
import CalculatorInput from './components/CalculatorInput.vue';
import CalculatorButtons from './components/CalculatorButtons.vue';
import CalculatorResult from './components/CalculatorResult.vue';
import Calculator2 from './components/Calculator2.vue';
import Calculator2Result from './components/Calculator2Result.vue';

export default {
  name: 'App',
  components: {
    CalculatorInput,
    CalculatorButtons,
    CalculatorResult,
    Calculator2,
    Calculator2Result,
  },
  data() {
    return {
      showCalculator2: true,
    };
  },
  methods: {
    toggleCalculator2() {
      this.showCalculator2 = !this.showCalculator2;
    }
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
