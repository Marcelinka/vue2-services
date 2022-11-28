<template>
  <div class="component-block">
    <span class="name">ChangeElemArrOne</span>

    <div>{{ arr.join(', ') }}</div>
    <button @click="changeElem">Изменить элемент</button><br />
  </div>
</template>

<script>
import ChangeElementArray from '@example-services/ChangeElementArray';

export default {
  data() {
    return {
      arr: ChangeElementArray.arr,
      changeElem: ChangeElementArray.changeElem.bind(ChangeElementArray),
    };
  },
};
</script>
