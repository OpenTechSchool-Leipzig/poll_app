<template>
  <button
    class="button"
    :class="{
      'is-loading': isLoading,
      'is-primary': isPrimary,
      'is-danger': isDanger,
      'is-outlined': !isAddon,
    }"
    :disabled="isDisabled"
    @click.prevent="checkEmit"
  >
    {{ name }}
  </button>
</template>

<script>
import buttonMixin from './buttonMixin';

export default {
  mixins: [buttonMixin],
};
</script>

<style lang="scss" scoped>
.button {
  min-width: 120px;
  text-transform: uppercase;
  &:not(:last-child) {
    margin-right: 2px;
  }
}
</style>
