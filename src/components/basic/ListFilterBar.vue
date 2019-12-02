<template>
  <div class="filter-body">
    <div class="level is-mobile">
      <div class="level-left">
        <InputUnit
          name="search"
          v-model="value.search"
          v-tooltip="'Search in ' + searchTarget"
          withoutLabel
        >
          <font-awesome-icon icon="search" />
        </InputUnit>
      </div>
      <div class="level-left">
        <div class="control">
          <button
            class="button is-outlined is-primary"
            :class="{ 'is-inverted': !showFilters }"
            @click="showFilters = !showFilters"
            v-tooltip="'show filter and sorting options'"
          >
            <font-awesome-icon icon="filter" />
            <font-awesome-icon icon="sort-amount-up-alt" />
          </button>
        </div>
      </div>
    </div>
    <!-- make filters dynamic -->
    <div v-if="showFilters">
      <div v-if="typeof value.type != 'undefined'" class="field">
        <div class="control is-expanded">
          <div class="select">
            <select v-model="value.type">
              <option selected disabled value>Select question type</option>
              <option value>All</option>
              <option value="open">Open question</option>
              <option value="choice">Multiple choice</option>
              <option value="scale">Scale Question</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="typeof value.state != 'undefined'" class="field">
        <div class="control">
          <div class="select">
            <select v-model="value.state">
              <option selected disabled value>Select poll state</option>
              <option value>All</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="typeof value.sortBy != 'undefined'" class="field">
        <div class="control">
          <div class="select">
            <select v-model="value.sortBy">
              <option selected disabled value>Select sorting Option</option>
              <option value>Default</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="a-to-z">A to Z</option>
              <option value="z-to-a">Z to A</option>
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
    searchTarget: String,
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
  padding: 0.75rem;
  background-color: $dark;
  @include bottom-radius;
  @include shadow1;
}
.button {
  svg:first-child {
    margin-right: 8px;
  }
}
</style>
