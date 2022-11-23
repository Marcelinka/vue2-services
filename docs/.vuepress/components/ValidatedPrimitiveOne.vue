<template>
  <div class="component-block">
    <span class="name">ValidatedPrimitiveOne</span>

    <span><b>Значение validatedString:</b> {{ validatedString.value }}</span><br/>

    <button @click="addProperty">Задать дополнительное поле</button><br />
    <button @click="changeToNumber">Присвоить число</button><br />
    <button @click="changeToString">Присвоить строку</button><br />

    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import ValidatedPrimitiveProperty from '@example-services/ValidatedPrimitiveProperty';

export default {
  data() {
    return {
      validatedString: ValidatedPrimitiveProperty.validatedString,
      error: '',
    };
  },
  methods: {
    addProperty() {
      try {
        this.validatedString.anotherField = 'someString';
      } catch (e) {
        this.error = e;
      }
    },
    changeToNumber() {
      try {
        this.validatedString.value = 15;
      } catch (e) {
        this.error = e;
      }
    },
    changeToString() {
      this.validatedString.value = 'I got through validation!';
    }
  },
}
</script>
