const buttonMixin = {
  props: {
    name: {
      type: String,
      required: true,
    },
    isLoading: {
      required: false,
      default: false,
      type: Boolean,
    },
    isPrimary: {
      required: false,
      default: false,
      type: Boolean,
    },
    isDanger: {
      required: false,
      default: false,
      type: Boolean,
    },
    isDisabled: {
      required: false,
      default: false,
      type: Boolean,
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    hasConfirmation: {
      required: false,
      default: false,
      type: Boolean,
    },
    confirmationText: {
      type: String,
      required: false,
      default: 'Are you sure?',
    },
  },
  methods: {
    emitEvent() {
      this.$emit(this.type === 'submit' ? 'submit' : 'click');
    },
    checkEmit() {
      if (!this.hasConfirmation) {
        this.emitEvent();
      } else {
        this.$store.commit('setDialog', {
          title: this.name,
          text: this.confirmationText,
          type: this.name.split(' ')[0],
          isDanger: this.isDanger,
          action: this.emitEvent,
        });
      }
    },
  },
};

export default buttonMixin;
