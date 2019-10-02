<template>
  <button
    class="button is-outlined"
    :class="{ 'is-loading': isLoading, 'is-primary': isPrimary }"
    :disabled="isDisabled"
    @click.prevent="emitEvent"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    isLoading: {
      required: false,
      default: false,
      type: Boolean,
    },
    isPrimary: {
      required: false,
      default: false,
      type: Boolean,
    },
    isDisabled: {
      required: false,
      default: false,
      type: Boolean,
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    },
  },
  methods: {
    emitEvent() {
      console.log(this.type === 'submit' ? 'submit' : 'click');
      this.$emit(this.type === 'submit' ? 'submit' : 'click');
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  min-width: 120px;
  text-transform: uppercase;
}
</style>
