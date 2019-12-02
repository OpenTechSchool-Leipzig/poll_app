<template>
  <div class="field">
    <label v-if="!withoutLabel" class="label">{{ title }}</label>
    <div class="control" :class="{ 'is-grouped': $slots.group }">
      <CheckboxElement :name="name" v-model="localValue" :id="inputId" />
      <slot name="group"></slot>
    </div>
  </div>
</template>

<script>
import inputMixin from './inputMixin';

export default {
  mixins: [inputMixin],
  props: {
    value: Boolean,
    title: String,
  },
};
</script>
