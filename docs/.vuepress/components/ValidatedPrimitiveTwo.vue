<template>
  <div class="component-block">
    <span class="name">ValidatedPrimitiveTwo</span>

    <span><b>Значение validatedString:</b> {{ validatedString.value }}</span>
  </div>
</template>

<script>
import ValidatedPrimitiveProperty from '@example-services/ValidatedPrimitiveProperty';

export default {
  data() {
    return {
      validatedString: ValidatedPrimitiveProperty.validatedString,
    };
  },
}
</script>
