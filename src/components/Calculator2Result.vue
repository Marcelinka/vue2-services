<template>
  <div>{{ operation.value }}</div>
</template>

<script>
import { calculatorData } from '../services/Calculator';
import { KEY } from './Calculator2.vue';

export default {
  name: 'Calculator2Result',
  data() {
    return {
      ...calculatorData(KEY, ['operation']),
    };
  },
}
</script>
