<template>
  <div class="component-block">
    <span class="name">ReadonlyArrayOne</span>

    <div><b>Значение arr:</b> {{ arr }}</div>
    <button @click="addElement">Добавить элемент через класс</button><br />
    <button @click="tryToChange">Добавить элемент через компонент</button><br />
    <div>{{ error }}</div>
  </div>
</template>

<script>
import ReadonlyArray from '@example-services/ReadonlyArray';

export default {
  data() {
    return {
      arr: ReadonlyArray.arr,
      addElement: ReadonlyArray.addElement.bind(ReadonlyArray),
      error: null,
    };
  },
  methods: {
    tryToChange() {
      try {
        this.arr.push('fromComponent'); // Ошибка!
      } catch(e) {
        this.error = e;
      }
    }
  }
}
</script>
