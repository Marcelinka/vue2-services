<template>
  <div class="component-block">
    <span class="name">ReadonlyObjectOne</span>

    <div><b>Значение obj:</b> {{ obj }}</div>
    <button @click="changeField">Изменить поля через метод</button><br />
    <button @click="tryToChange">Изменить поля через компонент</button><br />
    <div>{{ error }}</div>
  </div>
</template>

<script>
import ReadonlyObject from '@example-services/ReadonlyObject';

export default {
  data() {
    return {
      obj: ReadonlyObject.obj,
      changeField: ReadonlyObject.changeField.bind(ReadonlyObject),
      error: null,
    };
  },
  methods: {
    tryToChange() {
      try {
        this.obj.field = 'fromComponent'; // Ошибка!
      } catch(e) {
        this.error = e;
      }
    }
  }
}
</script>
