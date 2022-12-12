<template>
  <div class="component-block">
    <span class="name">MultiplePropsOne</span>

    <div><b>Пара: </b> {{ plus.val }}</div>
    <button @click="nextPair">Следующая пара</button>
  </div>
</template>

<script>
import MultipleObjects from '@example-services/MultipleObjects';

export default {
  data() {
    return {
      plus: MultipleObjects.plus,
      nextPair: MultipleObjects.nextPair.bind(MultipleObjects),
    };
  },
};
</script>
