<template>
  <div class="component-block">
    <span class="name">RewritableObjectTwo</span>

    <div><b>obj:</b> {{ obj }}</div>
  </div>
</template>

<script>
import RewritableObject from '@example-services/RewritableObject';

export default {
  data() {
    return {
      obj: RewritableObject.obj,
    };
  },
};
</script>
