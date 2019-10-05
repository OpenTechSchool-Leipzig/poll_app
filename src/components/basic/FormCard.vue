<template>
  <div class="form-card">
    <form @submit.prevent="$emit('submit')">
      <header class="form-card__header">
        <h2 class="title is-1">{{ title }}</h2>
      </header>
      <div class="form-card__container">
        <slot name="body"></slot>
      </div>
      <div class="form-card__footer">
        <DefaultButton
          v-if="submitBtn"
          isPrimary
          :isLoading="submitBtn.loading"
          :name="submitBtn.name"
          :isDisabled="submitBtn.disabled"
          :isDanger="submitBtn.danger"
          @click="$emit('submit')"
        />
        <slot name="footer"></slot>
      </div>
    </form>
  </div>
</template>

<script>
import DefaultButton from './Buttons/DefaultButton.vue';

export default {
  components: {
    DefaultButton,
  },
  props: {
    title: String,
    submitBtn: Object,
  },
};
</script>

<style lang="scss" scoped>
.form-card {
  max-width: 500px;
  margin: 60px auto;
  border-radius: 2px;
  @include shadow2;

  &__header {
    padding: 20px;
    border-bottom: 1px solid $light;
  }

  &__container {
    padding: 20px;
  }

  &__footer {
    padding: 20px;
    border-top: 1px solid $light;
  }
}
</style>
