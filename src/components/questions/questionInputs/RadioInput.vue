<template>
  <label class="radio" :for="inputId">
    <input :id="inputId" :value="answerValue" v-model="localValue" type="radio" />
    {{ name }}
  </label>
</template>

<script>
export default {
  props: ['value', 'answerValue', 'name'],
  computed: {
    inputId() {
      return this.name.split(' ').join('');
    },
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
// ToDo: style radiobuttons here
</style>
