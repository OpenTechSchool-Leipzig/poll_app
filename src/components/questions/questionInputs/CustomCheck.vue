<template>
  <label class="checkbox" for="custom-answer" :class="{ selected: value }">
    <input @click.prevent id="custom-answer" :checked="localValue" type="checkbox" />
    <input class="custom-check" type="text" v-model="localValue" />
  </label>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(localValue) {
        this.$emit('input', localValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  @extend .question-input;
  padding: 2px 2px 2px 10px;
  &.selected {
    .custom-check {
      border-color: $primary;
    }
  }
}
.custom-check {
  padding: 8px;
  border-radius: 18px;
  border: 1px solid $grey-light;
  &:focus {
    outline: none;
    border-color: $cyan;
  }
}
</style>
