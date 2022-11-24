<template>
  <div class="component-block">
    <span class="name">ReadonlyObjectTwo</span>

    <div><b>Значение obj:</b> {{ obj }}</div>
  </div>
</template>

<script>
import ReadonlyObject from '@example-services/ReadonlyObject';

export default {
  data() {
    return {
      obj: ReadonlyObject.obj,
    };
  },
}
</script>
