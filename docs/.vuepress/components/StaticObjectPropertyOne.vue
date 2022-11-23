<template>
  <div class="component-block">
    <span class="name">StaticObjectPropertyOne</span>

    <span><b>Значение firstProp:</b> {{ settings.firstProp }}</span><br/>
    <span><b>Значение secondProp:</b> {{ settings.secondProp }}</span><br/><br />

    <button @click="changeFirstProp">Change firstProp</button><br />
    <button @click="addSomeLuck">Change secondProp</button>
  </div>
</template>

<script>
import StaticObjectProperty from '@example-services/StaticObjectProperty';

export default {
  data() {
    return {
      settings: StaticObjectProperty.settings,
      changeFirstProp: StaticObjectProperty.changeFirstProp.bind(StaticObjectProperty),
      addSomeLuck: StaticObjectProperty.addSomeLuck.bind(StaticObjectProperty),
    };
  },
}
</script>
