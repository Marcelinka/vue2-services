<template>
  <div class="component-block">
    <span class="name">MultiplePropsTwo</span>

    <div><b>Пара: </b> {{ plus.val }}</div>
  </div>
</template>

<script>
import MultipleObjects from '@example-services/MultipleObjects';

export default {
  data() {
    return {
      plus: MultipleObjects.plus,
    };
  },
};
</script>
