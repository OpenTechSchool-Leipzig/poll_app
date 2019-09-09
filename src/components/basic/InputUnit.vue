<template>
  <div class="input-unit">
    <label for="id">{{ name }}</label>
    <input :type="type" v-model="value" :id="id" />
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
    id() {
      return name.split(' ').join('');
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
};
</script>
