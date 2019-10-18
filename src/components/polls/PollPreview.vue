<template>
  <div class="poll-preview">
    <header>
      <h2>Poll Preview</h2>
    </header>

    <form class="poll-preview__title">
      <input
        class="poll-preview__input poll-preview__input--title"
        :class="{ 'poll-preview__input--highlight': isTemplateLoaded }"
        type="text"
        v-model="value.title"
        placeholder="Poll Title"
      />
      <input
        class="poll-preview__input poll-preview__input--date"
        :class="{ 'poll-preview__input--highlight': isTemplateLoaded }"
        type="date"
        v-model="value.date"
      />
    </form>

    <slot></slot>

    <transition-group tag="ul">
      <PollQuestion
        v-for="(question, index) in questions"
        :key="question.id"
        :question="question"
        :qIndex="index"
        v-model="test"
        :isPreview="true"
        @removeQuestion="forwardRemoveEmit"
      />
    </transition-group>
  </div>
</template>

<script>
import PollQuestion from './PollQuestion.vue';

export default {
  props: {
    questions: Array,
    value: Object,
    isTemplateLoaded: Boolean,
  },
  components: {
    PollQuestion,
  },
  data: function() {
    return {
      // state as model for child
      test: [],
    };
  },
  watch: {
    questions() {
      this.populateAnswers();
    },
    value() {
      this.$emit('input', this.value);
    },
  },
  methods: {
    populateAnswers() {
      // fill the "test" model with id's and empty answers so they could be referenced in the question-preview
      this.test = this.questions.map(question => {
        return {
          questionId: question.id,
          answer: question.type === 'choice' && !question.options.isYesNo ? [] : null,
        };
      });
    },
    forwardRemoveEmit(id) {
      // Somehow transition-groups seems to prevent to use emit at parent as well as using $listeners.
      // So the emit needs to be forwarde manually - it could be removed when the active poll is handled
      // in vuex-Store, which would also allow to load templates or poll from the pollOverview Page
      this.$emit('removeQuestion', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.poll-preview {
  width: 100%;
  height: 100%;
  background-color: $primary-dark;
  overflow: hidden;
  &__title {
    @extend .poll-title;
  }
  &__input {
    border: none;
    background-color: transparent;
    font-size: 1.17em;
    color: #2c3e50;
    &--title {
      width: 70%;
    }
    &--date {
      text-align: right;
    }
    &--highlight {
      background-color: rgba(yellow, 0.7);
    }
  }
  ul {
    list-style: none;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
header {
  @include section-header;
}
</style>
