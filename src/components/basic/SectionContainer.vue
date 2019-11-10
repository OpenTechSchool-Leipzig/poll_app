<template>
  <div class="container" :class="{ 'full-height': isFullHeight }">
    <header>
      <h2>{{ title }}</h2>
    </header>
    <slot name="filter"></slot>

    <div class="body">
      <slot name="default"></slot>
    </div>

    <div v-if="$slots.controls" class="controls">
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    isFullHeight: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: $primary-dark;
  @include main-radius;
  margin-bottom: 0.75rem;

  header {
    width: 100%;
    padding: 10px 0;
    margin: 0;
    background-color: $primary;
    @include shadow1;
    @include top-radius;
    h2 {
      margin: 0 auto;
      font-size: 1.75rem;
      text-decoration: underline;
    }
  }
  &.full-height {
    height: 100%;
  }

  .body {
    padding: 0.75rem;
  }

  .controls {
    border-top: 1px solid $primary;
    padding: 0.75rem;
  }
}
</style>
