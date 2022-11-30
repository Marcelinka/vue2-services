<template>
  <div class="component-block">
    <span class="name">RewritableArrayOne</span>

    <div><b>Значение arr:</b> {{ arr.value }}</div>
    <button @click="changeArr">Перезаписать массив</button>
  </div>
</template>

<script>
import RewritableArray from '@example-services/RewritableArray';

export default {
  data() {
    return {
      arr: RewritableArray.arr,
      changeArr: RewritableArray.changeArr.bind(RewritableArray),
    };
  },
}
</script>
