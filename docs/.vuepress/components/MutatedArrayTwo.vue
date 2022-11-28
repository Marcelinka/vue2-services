<template>
  <div class="component-block">
    <span class="name">MutatedArrayTwo</span>

    <div>{{ arr.join(', ') }}</div>
  </div>
</template>

<script>
import MutatedArray from '@example-services/MutatedArray';

export default {
  data() {
    return {
      arr: MutatedArray.arr,
    };
  },
};
</script>
