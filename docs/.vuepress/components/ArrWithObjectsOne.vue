<template>
  <div class="component-block">
    <span class="name">ArrWithObjectsOne</span>

    <div v-for="el in arr" :key="el.id">
      {{ el.a }} {{ el.b }}
    </div>
    <button @click="rewriteFirstElem">Перезаписать первый элемент</button><br />
    <button @click="changePropOfSecond">Изменить свойство второго</button><br />
    <button @click="changeByLink">Изменить по ссылке</button>
  </div>
</template>

<script>
import ArrWithObjects from '@example-services/ArrWithObjects';

export default {
  data() {
    return {
      arr: ArrWithObjects.arr,
      rewriteFirstElem: ArrWithObjects.rewriteFirstElem.bind(ArrWithObjects),
      changePropOfSecond: ArrWithObjects.changePropOfSecond.bind(ArrWithObjects),
      changeByLink: ArrWithObjects.changeByLink.bind(ArrWithObjects),
    };
  },
};
</script>
