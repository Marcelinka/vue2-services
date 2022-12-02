<template>
  <div class="component-block">
    <span class="name">PrimitiveGetterTwo</span>

    <div><b>prop value:</b> {{ prop.value }}</div>
    <div><b>getter value:</b> {{ prop.valueUp }}</div>
  </div>
</template>

<script>
import PrimitiveGetter from '@example-services/PrimitiveGetter';

export default {
  data() {
    return {
      prop: PrimitiveGetter.prop,
    };
  },
};
</script>
