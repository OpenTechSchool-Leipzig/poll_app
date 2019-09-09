<template>
  <div class="card">
    <header class="card__header">
      <h2>{{ title }}</h2>
    </header>
    <div class="container">
      <slot name="body"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
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
.card {
  max-width: 400px;
  margin: 60px auto;

  &__header {
    padding: 20px;
    border-bottom: 1px solid $secondary;
  }

  &__footer {
    border-top: 1px solid $secondary;
  }
}
</style>
