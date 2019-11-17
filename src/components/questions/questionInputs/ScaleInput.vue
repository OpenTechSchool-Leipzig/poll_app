<template>
  <div class="wrapper">
    <ul class="scale" :class="{ selected: localValue }">
      <li>{{ options.startValue }}</li>
      <li v-if="options.scaleSteps > 0">
        <input
          type="radio"
          :value="n"
          v-model="localValue"
          v-for="n in parseInt(options.scaleSteps)"
          :key="n"
        />
      </li>
      <li>{{ options.endValue }}</li>
    </ul>
  </div>
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
.wrapper {
  display: flex;
  justify-content: center;
}
.scale {
  @extend .question-input;
  display: flex;
  justify-content: center;
  list-style-type: none;

  li {
    margin: 0 10px;
    display: flex;
    align-items: center;
  }
  input:not(:last-child) {
    margin-right: 6px;
  }
}
</style>
