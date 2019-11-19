<template>
  <div class="field">
    <label v-if="!withoutLabel" class="label" :for="inputId">{{ name }}</label>
    <div class="control">
      <div
        class="field"
        :class="{ 'has-addons': $slots.addon, 'is-grouped': $slots.group && !$slots.addon }"
      >
        <InputElement
          :name="name"
          v-model="localValue"
          :min="min"
          :max="max"
          :type="type"
          :isRequired="isRequired"
          :isExpanded="$slots.addon"
        >
          <template slot="icon">
            <slot name="default"></slot>
          </template>
        </InputElement>
        <slot name="group"></slot>
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
