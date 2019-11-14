<template>
  <div class="section-container" :class="{ 'full-height': isFullHeight }">
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
.section-container {
  @include main-radius;
  width: 100%;
  background-color: $primary-dark;
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;

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
    overflow: hidden;
  }

  .body {
    padding: 0.75rem;
    flex-grow: 1;
  }

  .controls {
    border-top: 1px solid $primary;
    padding: 0.75rem;
  }
}
</style>
