export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: [String, Number],
    validation: String,
    withoutLabel: Boolean,
    id: [String, Number],
  },
  computed: {
    inputId() {
      if (this.id) {
        return this.id;
      }
      return this.name && this.name.length > 0
        ? this.name.split(' ').join('') + Math.floor(Math.random() * 999999)
        : 'unknown' + Math.floor(Math.random() * 999999);
    },
    validationClass() {
      return {
        'is-danger': !(this.validation === 'valid' || !this.validation),
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
