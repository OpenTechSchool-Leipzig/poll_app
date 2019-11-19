<template>
  <div class="field">
    <label v-if="!withoutLabel" class="label" :for="inputId">{{ name }}</label>
    <div class="control">
      <div
        class="field"
        :class="{ 'has-addons': $slots.addon, 'is-grouped': $slots.group && !$slots.addon }"
      >
        <SelectElement :name="name" v-model="localValue">
          <template slot="icon">
            <slot name="icon"></slot>
          </template>
          <slot name="default"></slot>
        </SelectElement>
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
};
</script>
