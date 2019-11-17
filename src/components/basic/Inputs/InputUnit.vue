<template>
  <div class="field">
    <label v-if="!withoutLabel" class="label" :for="inputId">{{ name }}</label>
    <div class="control">
      <div class="field" :class="{ 'has-addons': $slots.addon }">
        <div
          class="control"
          :class="{ 'has-icons-left': $slots.default, 'is-expanded': $slots.addon }"
        >
          <span v-if="$slots.default" class="icon is-small is-left">
            <slot></slot>
          </span>
          <input
            class="input"
            :class="{ validationClass }"
            :type="type"
            v-model="localValue"
            :id="inputId"
            :min="min"
            :max="max"
          />
        </div>
        <div class="control" v-if="$slots.addon">
          <slot name="addon"></slot>
        </div>
      </div>
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
    withoutLabel: Boolean,
    min: {
      type: String,
      default: '',
    },
    max: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputId() {
      return this.name.split(' ').join('') + Math.floor(Math.random() * 999999);
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
