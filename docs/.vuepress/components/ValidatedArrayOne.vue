<template>
  <div class="component-block">
    <span class="name">ValidatedArrayOne</span>

    <span><b>Значение arr:</b> {{ arr }}</span><br/>

    <button @click="addString">Добавить строку</button><br />
    <button @click="addNumber">Добавить число</button><br />

    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import ValidatedArray from '@example-services/ValidatedArray';

export default {
  data() {
    return {
      arr: ValidatedArray.arr,
      error: '',
    };
  },
  methods: {
    addNumber() {
      this.arr.push(3);
    },
    addString() {
      try {
        this.arr.push('I don\'t work');
      } catch (e) {
        this.error = e;
      }
    }
  },
}
</script>
