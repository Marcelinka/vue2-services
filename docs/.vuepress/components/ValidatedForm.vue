<template>
  <div class="component-block">
    <span class="name">ValidatedForm</span>

    <p>
      <input
        v-model="form.firstName"
        placeholder="Имя"
        :class="{ 'error': errors.firstName }"
      /><br/>
      <span v-if="errors.firstName" class="error">
        {{ errors.firstName }}
      </span>
    </p>

    <p>
      <input
        v-model="form.age"
        placeholder="Возраст"
        :class="{ 'error': errors.age }"
      /><br />
      <span v-if="errors.age" class="error">
        {{ errors.age }}
      </span>
    </p>
  </div>
</template>

<script>
import ValidatedForm from '@example-services/ValidatedForm';

export default {
  data() {
    return {
      form: ValidatedForm.form,
      errors: ValidatedForm.errors,
    };
  },
}
</script>
