<template>
  <transition name="modal" appear>
    <div class="modal">
      <div class="modal-background" @click.prevent="emitClose"></div>
      <div class="modal-content">
        <div class="box content">
          <slot></slot>
        </div>
      </div>
      <!--  replace with custom close button -->
      <button @click.prevent="emitClose" class="modal-close is-large" aria-label="close"></button>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    emitClose() {
      this.$emit('closeModal');
    },
    onEscapeKeyUp(event) {
      if (event.which === 27) {
        this.emitClose();
      }
    },
  },
  beforeMount() {
    window.addEventListener('keyup', this.onEscapeKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onEscapeKeyUp);
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex !important;
}

.modal-enter,
.modal-leave-to {
  opacity: 0.9;
  .modal-background {
    opacity: 0;
  }
  .modal-content,
  .modal-close {
    transform: translateY(-70vh);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.8s ease;
  .modal-background,
  .modal-close,
  .modal-content {
    transition: all 0.8s ease;
  }
}
</style>
