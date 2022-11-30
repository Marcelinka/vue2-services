<template>
  <div class="component-block">
    <span class="name">ArrWithObjectsTwo</span>

    <div v-for="el in arr" :key="el.id">
      {{ el.a }} {{ el.b }}
    </div>
  </div>
</template>

<script>
import ArrWithObjects from '@example-services/ArrWithObjects';

export default {
  data() {
    return {
      arr: ArrWithObjects.arr,
    };
  },
};
</script>
