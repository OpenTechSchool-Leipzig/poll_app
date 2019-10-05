<template>
  <button
    class="button is-outlined"
    :class="{ 'is-loading': isLoading, 'is-primary': isPrimary, 'is-danger': isDanger }"
    :disabled="isDisabled"
    @click.prevent="checkEmit"
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
    isDanger: {
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
    hasConfirmation: {
      required: false,
      default: false,
      type: Boolean,
    },
    confirmationText: {
      type: String,
      required: false,
      default: 'Are you sure?',
    },
  },
  methods: {
    emitEvent() {
      this.$emit(this.type === 'submit' ? 'submit' : 'click');
    },
    checkEmit() {
      if (!this.hasConfirmation) {
        this.emitEvent();
      } else {
        this.$store.commit('setDialog', {
          title: this.name,
          text: this.confirmationText,
          type: this.name.split(' ')[0],
          isDanger: this.isDanger,
          action: this.emitEvent,
        });
      }
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
