<template>
  <div class="field">
    <label class="label" :for="inputId">{{ name }}</label>
    <div class="control">
      <input
        class="input"
        :class="validationClass"
        :type="type"
        v-model="localValue"
        :id="inputId"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: [String, Number],
    name: String,
    validation: String,
  },
  computed: {
    inputId() {
      return this.name.split(' ').join('');
    },
    validationClass() {
      return {
        'is-danger': this.validation === 'valid' || !this.validation ? false : true,
        'is-success': this.validation === 'valid',
      };
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
.input:invalid {
  @extend .is-danger;
}
</style>
