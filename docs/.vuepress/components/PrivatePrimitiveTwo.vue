<template>
  <div class="component-block">
    <span class="name">PrivatePrimitiveTwo</span>

    <span><b>Значение privateString:</b> {{ privateString.value }}</span><br/>
    <button @click="changePrivateString">Change value</button>
  </div>
</template>

<script>
import PrivatePrimitiveProperty from '@example-services/PrivatePrimitiveProperty';

export default {
  data() {
    return {
      privateString: PrivatePrimitiveProperty.privateString,
      changePrivateString: PrivatePrimitiveProperty.changePrivateString.bind(PrivatePrimitiveProperty),
    };
  },
}
</script>
