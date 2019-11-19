<template>
  <div class="control" :class="{ 'has-icons-left': $slots.icon }">
    <span v-if="$slots.icon" class="icon is-small is-left">
      <slot name="icon"></slot>
    </span>
    <div class="select is-fullwidth">
      <select v-model="localValue" :class="validationClass" :id="inputId">
        <slot name="default"></slot>
      </select>
    </div>
  </div>
</template>

<script>
import inputMixin from './inputMixin';

export default {
  mixins: [inputMixin],
};
</script>
