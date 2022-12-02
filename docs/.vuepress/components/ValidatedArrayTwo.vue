<template>
  <div class="component-block">
    <span class="name">ValidatedArrayTwo</span>

    <span><b>Значение arr:</b> {{ arr }}</span>
  </div>
</template>

<script>
import ValidatedArray from '@example-services/ValidatedArray';

export default {
  data() {
    return {
      arr: ValidatedArray.arr,
    };
  },
}
</script>
