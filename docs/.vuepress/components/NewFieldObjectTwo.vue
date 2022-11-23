<template>
  <div class="component-block">
    <span class="name">NewFieldObjectTwo</span>

    <div><b>testObject:</b> {{ testObject }}</div>
  </div>
</template>

<script>
import ObjectWithNewField from '@example-services/ObjectWithNewField';

export default {
  data() {
    return {
      testObject: ObjectWithNewField.testObject,
    };
  },
};
</script>
