<template>
  <textarea v-model="localValue" />
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
  width: 90%;
  height: 100px;
  border-radius: 5px;
  resize: none;
}
</style>
