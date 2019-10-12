<template>
  <label class="checkbox" for="custom-answer">
    <input id="custom-answer" :checked="localValue" type="checkbox" />
    <input type="text" v-model="localValue" />
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
// ToDo: style for custom checkbox here
</style>
