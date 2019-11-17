export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: [String, Number],
    validation: String,
    withoutLabel: Boolean,
  },
  computed: {
    inputId() {
      return this.name.split(' ').join('') + Math.floor(Math.random() * 999999);
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
