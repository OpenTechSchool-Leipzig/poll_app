<template>
  <div class="control" :class="{ 'has-icons-left': $slots.icon }">
    <span v-if="$slots.icon" class="icon is-small is-left">
      <slot name="icon"></slot>
    </span>
    <input
      class="input"
      :class="validationClass"
      :type="type"
      v-model="localValue"
      :id="inputId"
      :min="min"
      :max="max"
      :required="isRequired"
    />
  </div>
</template>

<script>
import inputMixin from './inputMixin';

export default {
  mixins: [inputMixin],
  props: {
    type: {
      type: String,
      default: 'text',
    },
    min: {
      type: String,
      default: null,
    },
    max: {
      type: String,
      default: null,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.input:invalid {
  @extend .is-danger;
}
</style>
