<template>
  <label class="checkbox" :for="inputId" :class="{ selected: checkSelection }">
    <input :id="inputId" :value="answerValue" v-model="localValue" type="checkbox" />
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
    checkSelection() {
      return this.localValue.includes(this.answerValue);
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
.checkbox {
  @extend .question-input;
}
</style>
