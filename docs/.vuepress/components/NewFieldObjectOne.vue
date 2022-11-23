<template>
  <div class="component-block">
    <span class="name">NewFieldObjectOne</span>

    <div><b>testObject:</b> {{ testObject }}</div>
    <button @click="addNewField">Добавить поле</button><br />
    <button @click="addField">Добавить поле из компонента</button>
  </div>
</template>

<script>
import ObjectWithNewField from '@example-services/ObjectWithNewField';

export default {
  data() {
    return {
      testObject: ObjectWithNewField.testObject,
      addNewField: ObjectWithNewField.addNewField.bind(ObjectWithNewField),
    };
  },
  methods: {
    addField() {
      this.$set(this.testObject, 'fieldFromComponent', 'I was added from component!');
    }
  }
};
</script>
