<template>
  <textarea v-model="localValue" :class="{ selected: localValue && localValue.length > 5 }" />
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
textarea {
  width: 100%;
  max-width: 800px;
  height: 100px;
  border-radius: 5px;
  border: 2px solid $grey-light;
  resize: none;
  @include shadow1;
}
.selected {
  border-color: $primary-light;
}
</style>
