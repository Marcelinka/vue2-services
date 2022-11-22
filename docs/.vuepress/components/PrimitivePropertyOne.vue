<template>
  <div class="component-block">
    <span class="name">PrimitivePropertyOne</span>
    <span>Value: {{ someString.value }}</span><br/>
    <button @click="changeValue">Change value</button>
  </div>
</template>

<script>
import PrimitiveProperty from '@example-services/PrimitiveProperty';

export default {
  data() {
    return {
      someString: PrimitiveProperty.someString,
    };
  },
  methods: {
    changeValue() {
      this.someString.value = 'someAnotherString';
    },
  },
}
</script>
