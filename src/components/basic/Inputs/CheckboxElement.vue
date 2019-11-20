<template>
  <p class="control">
    <label class="checkbox">
      <input type="checkbox" v-model="localValue" :id="inputId" />
      {{ name }}
    </label>
  </p>
</template>

<script>
import inputMixin from './inputMixin';

export default {
  mixins: [inputMixin],
  props: {
    value: Boolean,
  },
};
</script>
