<template>
  <div class="filter-body">
    <div class="level is-mobile">
      <div class="level-left">
        <div class="control">
          <input class="input" v-model="value.search" />
        </div>
      </div>
      <div class="level-left">
        <div class="control">
          <button
            class="button is-outlined is-primary"
            :class="{ 'is-inverted': !showFilters }"
            @click="showFilters = !showFilters"
          >
            filter
          </button>
        </div>
      </div>
    </div>

    <div v-if="showFilters">
      <div class="field">
        <div class="control">
          <div class="select">
            <select v-model="value.type">
              <option disabled value>Select question type</option>
              <option value>All</option>
              <option value="open">Open question</option>
              <option value="choice">Multiple choice</option>
              <option value="scale">Scale Question</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <div class="select">
            <select v-model="value.sortBy">
              <option disabled value>Selct sorting Option</option>
              <option value>Default</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
  },
  data() {
    return {
      showFilters: false,
    };
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-body {
  padding: 10px 10px 20px 10px;
  background-color: $dark;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  @include shadow1;
}
</style>
