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
          :isExpanded="!!$slots.addon"
          :id="inputId"
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
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
