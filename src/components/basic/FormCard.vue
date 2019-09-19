<template>
  <div class="form-card">
    <form>
      <header class="form-card__header">
        <h2 class="title is-1">{{ title }}</h2>
      </header>
      <div class="form-card__container">
        <slot name="body"></slot>
      </div>
      <div class="form-card__footer">
        <slot name="footer"></slot>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
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
