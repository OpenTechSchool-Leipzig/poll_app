<template>
  <li class="question">
    <div class="question__short" :class="{ expanded: expanded }">
      <p @click="toggleExpansion">{{ question.text }}</p>
      <button v-if="!hideButtons" @click.prevent="emitSelection(question.id)">Add</button>
    </div>
    <div v-show="expanded" class="question__details">
      <p>type: {{ question.type }}</p>
      <p>options: {{ JSON.stringify(question.options) }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'QuestionListItem',
  // giving each item it's own state for handling accordion functionality makes the component way more flexible
  // It might however not be a good practise and we should check if it leads to performance issues!
  data: function() {
    return {
      expanded: false,
    };
  },
  props: {
    question: Object,
    hideButtons: Boolean,
  },
  methods: {
    toggleExpansion() {
      let curState = this.expanded;
      this.expanded = !curState;
    },

    emitSelection(id) {
      // use $parent instance property to trigger emit at parent component level.
      // A more flexible approach might be using "v-on='$listeners'" in component template
      this.$parent.$emit('selectQuestion', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: $primary-dark;
}
header {
  @include section-header;
}
ul {
  list-style: none;
  margin: 5px 0 10px;
  padding: 0;
}
.question {
  background-color: $primary-light;
  width: calc(100% - 12px);
  margin: auto;
  margin-bottom: 6px;
  @include shadow1;

  &:hover {
    @include shadow2;
    opacity: 0.9;
  }

  &__details {
    font-size: 12px;
    width: 100%;
    padding: 6px;
    p {
      margin-bottom: 0;
    }
  }
  &__short {
    width: calc(100% - 24px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 6px 12px;
    p {
      font-size: 1.17rem;
      padding: 5px;
      max-width: 80%;
      margin: 0;
      text-align: left;
      cursor: pointer;
    }
  }
}
.expanded {
  background-color: $primary;
  @include shadow1;
}
</style>
