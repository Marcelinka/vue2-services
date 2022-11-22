<template>
  <div class="component-block">
    <span class="name">PrimitivePropertyTwo</span>
    <div>{{ someString }}</div>
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
};
</script>
