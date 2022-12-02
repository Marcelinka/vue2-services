<template>
  <div class="component-block">
    <span class="name">PrimitiveGetterOne</span>

    <div><b>prop value:</b> {{ prop.value }}</div>

    <!-- `prop.valueUp()` писать не надо, геттер используется без скобок -->
    <div><b>getter value:</b> {{ prop.valueUp }}</div>

    <button @click="changeProp">Изменить value</button>
  </div>
</template>

<script>
import PrimitiveGetter from '@example-services/PrimitiveGetter';

export default {
  data() {
    return {
      // Получаем только prop
      prop: PrimitiveGetter.prop,
    };
  },
  methods: {
    changeProp() {
      this.prop.value = 'newstring'; // геттер пересчитается автоматически
    }
  }
};
</script>
