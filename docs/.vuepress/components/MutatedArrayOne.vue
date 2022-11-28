<template>
  <div class="component-block">
    <span class="name">MutatedArrayOne</span>

    <div>{{ arr.join(', ') }}</div>
    <button @click="addElement">Добавить цифру</button><br />
    <button @click="removeElement">Удалить элемент</button>
  </div>
</template>

<script>
import MutatedArray from '@example-services/MutatedArray';

export default {
  data() {
    return {
      arr: MutatedArray.arr,
      addElement: MutatedArray.addElement.bind(MutatedArray),
      removeElement: MutatedArray.removeElement.bind(MutatedArray),
    };
  },
};
</script>
