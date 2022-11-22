<template>
  <div class="component-block">
    <span class="name">PrimitivePropertyThree</span>
    <span>Value: {{ someString.value }}</span><br/>
    <button @click="changeValue">Change value</button>
  </div>
</template>

<script>
import PrimitivePropertyWithMethod from '@example-services/PrimitivePropertyWithMethod';

export default {
  data() {
    return {
      someString: PrimitivePropertyWithMethod.someString,
      changeValue: PrimitivePropertyWithMethod.changeValue.bind(PrimitivePropertyWithMethod),
    };
  },
}
</script>
