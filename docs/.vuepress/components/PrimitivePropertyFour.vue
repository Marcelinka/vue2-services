<template>
  <div class="component-block">
    <span class="name">PrimitivePropertyFour</span>
    <div>{{ someString }}</div>
  </div>
</template>

<script>
import PrimitivePropertyWithMethod from '@example-services/PrimitivePropertyWithMethod';

export default {
  data() {
    return {
      someString: PrimitivePropertyWithMethod.someString,
    };
  },
};
</script>
