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
      <p>type: {{ question.type }}</p>
      <p>options: {{ JSON.stringify(question.options) }}</p>
      <p v-if="question.createdAt">created At: {{ question.createdAt.toDate() }}</p>
    </div>
  </li>
</template>

<script>
import IconButton from '../basic/IconButton.vue';

export default {
  name: 'QuestionListItem',
  components: {
    IconButton,
  },
  // giving each item it's own state for handling accordion functionality makes the component way more flexible
  // It might however not be a good practise...
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
      // !!transition-group prevents using $parent and $listeners!!
      this.$emit('selectQuestion', id);
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
  transition: all 0.3s;

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
