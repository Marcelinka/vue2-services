<template>
  <div class="component-block">
    <span class="name">RewritableArrayTwo</span>

    <div><b>Значение arr:</b> {{ arr.value }}</div>
  </div>
</template>

<script>
import RewritableArray from '@example-services/RewritableArray';

export default {
  data() {
    return {
      arr: RewritableArray.arr,
    };
  },
}
</script>
