<template>
  <div class="component-block">
    <span class="name">ReadonlyArrayTwo</span>

    <div><b>Значение arr:</b> {{ arr }}</div>
  </div>
</template>

<script>
import ReadonlyArray from '@example-services/ReadonlyArray';

export default {
  data() {
    return {
      arr: ReadonlyArray.arr,
    };
  },
}
</script>
