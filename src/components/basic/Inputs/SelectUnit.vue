<template>
  <div class="field">
    <label v-if="!withoutLabel" class="label" :for="inputId">{{ name }}</label>
    <div class="control">
      <div class="field" :class="{ 'has-addons': $slots.addon }">
        <div
          class="control"
          :class="{ 'has-icons-left': $slots.default, 'is-expanded': $slots.addon }"
        >
          <span v-if="$slots.icon" class="icon is-small is-left">
            <slot name="icon"></slot>
          </span>
          <div class="select">
            <select v-model="localValue" :class="{ validationClass }" :id="inputId">
              <slot name="default"></slot>
            </select>
          </div>
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
};
</script>
