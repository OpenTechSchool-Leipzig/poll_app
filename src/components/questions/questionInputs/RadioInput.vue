<template>
  <label
    class="radio"
    :for="inputId"
    :class="[localValue === answerValue ? (isDanger ? 'danger' : 'selected') : '']"
  >
    <input :id="inputId" :value="answerValue" v-model="localValue" type="radio" />
    {{ name }}
  </label>
</template>

<script>
export default {
  props: {
    value: null,
    answerValue: null,
    name: String,
    isDanger: Boolean,
  },
  computed: {
    inputId() {
      return this.name.split(' ').join('') + Math.floor(Math.random() * 999999);
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
.radio {
  @extend .question-input;
}
</style>
