<template>
  <li class="question">
    <div class="question__short" :class="{ expanded: expanded }">
      <p @click="toggleExpansion">{{ question.text }}</p>
      <IconButton
        v-if="!hideButtons"
        @click="emitSelection(question.id)"
        name="Add Question to Poll"
      />
    </div>
    <div v-show="expanded" class="question__details">
      <ul>
        <li>type: {{ typeLabel }}</li>
        <li v-if="choicesLabel">
          choices:
          <ul class="nested-list">
            <li v-for="(choice, i) in choicesLabel" :key="i">{{ choice }}</li>
          </ul>
        </li>
        <li v-if="optionsLabels">
          options:
          <ul class="nested-list">
            <li v-for="(option, i) in optionsLabels" :key="i">{{ option }}</li>
          </ul>
        </li>
        <li v-if="createdByLabel">created by {{ createdByLabel }} on {{ createdAtLabel }}</li>
      </ul>
    </div>
  </li>
</template>

<script>
import questionLabels from './questionLabelsMixin';

export default {
  name: 'QuestionListItem',
  // giving each item it's own state for handling accordion functionality makes the component way more flexible
  // It might however not be a good practise...
  data: function() {
    return {
      expanded: false,
    };
  },
  mixins: [questionLabels],
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
      // I originally used the $parent instance property to trigger emit at parent component level.
      // A more flexible approach might be using "v-on='$listeners'" in component template. But:
      // !! transition-group prevents using $parent and $listeners !!
      this.$emit('selectQuestion', id);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 5px 0 10px;
  padding: 0;
}

ul.nested-list {
  display: inline-grid;
  list-style-type: square;
  list-style-position: inside;
  margin: 0;
  padding: 0 5px;
}
.question {
  background-color: $primary-light;
  margin: auto;
  @include shadow1;
  @include main-radius;
  transition: all 0.3s;

  &:not(:last-child) {
    margin-bottom: 6px;
  }

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
    @include top-radius;
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

  &.v-enter,
  &.v-leave-to {
    transform: translateX(120%);
  }
  &.v-enter-to,
  &.v-leave {
    transform: translateX(0);
  }
  &.v-enter-active,
  &.v-leave-active,
  &.v-move {
    transition: all 0.5s ease-out;
  }
}
.expanded {
  background-color: $primary;
  @include shadow1;
}
</style>
