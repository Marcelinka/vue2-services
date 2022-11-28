<template>
  <div class="component-block">
    <span class="name">ChangeElemArrTwo</span>

    <div>{{ arr.join(', ') }}</div>
  </div>
</template>

<script>
import ChangeElementArray from '@example-services/ChangeElementArray';

export default {
  data() {
    return {
      arr: ChangeElementArray.arr,
    };
  },
};
</script>
