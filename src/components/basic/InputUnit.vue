<template>
  <div class="field">
    <label class="label" :for="inputId">{{ name }}</label>
    <div class="control">
      <input class="input" :type="type" v-model="localValue" :id="inputId" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    value: [String, Number],
    name: String,
  },
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
.input:invalid {
  @extend .is-danger;
}
</style>
