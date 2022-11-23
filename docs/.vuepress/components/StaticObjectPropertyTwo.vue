<template>
  <div class="component-block">
    <span class="name">StaticObjectPropertyTwo</span>

    <span><b>Значение settings:</b> {{ settings }}</span>
  </div>
</template>

<script>
import StaticObjectProperty from '@example-services/StaticObjectProperty';

export default {
  data() {
    return {
      settings: StaticObjectProperty.settings,
    };
  },
}
</script>
