<template>
  <div class="component-block">
    <span class="name">ObjectGetterTwo</span>

    <div><b>fullName:</b> {{ person.fullName }}</div>
  </div>
</template>

<script>
import ObjectGetter from '@example-services/ObjectGetter';

export default {
  data() {
    return {
      person: ObjectGetter.person,
    };
  },
};
</script>
