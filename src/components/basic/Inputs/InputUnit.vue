<template>
  <div class="field">
    <label v-if="!withoutLabel" class="label" :for="inputId">{{ name }}</label>
    <div class="control">
      <div class="field" :class="{ 'has-addons': $slots.addon }">
        <div
          class="control"
          :class="{ 'has-icons-left': $slots.default, 'is-expanded': $slots.addon }"
        >
          <span v-if="$slots.default" class="icon is-small is-left">
            <slot></slot>
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
        <div class="control" v-if="$slots.addon">
          <slot name="addon"></slot>
        </div>
      </div>
    </div>
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
  },
};
</script>

<style lang="scss" scoped>
.input:invalid {
  @extend .is-danger;
}
</style>
