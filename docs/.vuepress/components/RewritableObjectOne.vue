<template>
  <div class="component-block">
    <span class="name">RewritableObjectOne</span>

    <div><b>obj:</b> {{ obj }}</div>
    <button @click="fillObj">Заполнить объект</button>
  </div>
</template>

<script>
import RewritableObject from '@example-services/RewritableObject';

export default {
  data() {
    return {
      obj: RewritableObject.obj,
      fillObj: RewritableObject.fillObj.bind(RewritableObject),
    };
  },
};
</script>
