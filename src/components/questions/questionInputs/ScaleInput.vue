<template>
  <ul class="scale">
    <li>{{ options.startValue }}</li>
    <input
      type="radio"
      :value="n"
      v-model="localValue"
      v-for="n in parseInt(options.scaleSteps)"
      :key="n"
    />
    <li>{{ options.endValue }}</li>
  </ul>
</template>

<script>
export default {
  props: ['value', 'options'],
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
.scale {
  display: flex;
  justify-content: center;
  list-style-type: none;
}
</style>
