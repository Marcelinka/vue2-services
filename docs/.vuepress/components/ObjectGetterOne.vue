<template>
  <div class="component-block">
    <span class="name">ObjectGetterOne</span>

    <div><b>fullName:</b> {{ person.fullName }}</div>
    <button @click="changeFirstName">Изменить имя</button>
  </div>
</template>

<script>
import ObjectGetter from '@example-services/ObjectGetter';

export default {
  data() {
    return {
      person: ObjectGetter.person,
      changeFirstName: ObjectGetter.changeFirstName.bind(ObjectGetter),
    };
  },
};
</script>
