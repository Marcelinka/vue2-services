<template>
  <div class="component-block">
    <span class="name">PrivatePrimitiveOne</span>

    <span><b>Значение privateString:</b> {{ privateString.value }}</span><br/>
    <button @click="changeValue">Change value</button><br />

    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import PrivatePrimitiveProperty from '@example-services/PrivatePrimitiveProperty';

export default {
  data() {
    return {
      privateString: PrivatePrimitiveProperty.privateString,
      error: '',
    };
  },
  methods: {
    changeValue() {
      try {
        this.privateString.value = 'someAnotherString';
      } catch (e) {
        this.error = e;
      }
    },
  },
}
</script>
