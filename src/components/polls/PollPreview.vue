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

    <ul class="poll-preview__list">
      <PollQuestion
        v-for="(question, index) in questions"
        :key="question.id"
        :question="question"
        :qIndex="index"
        v-model="test"
        :isPreview="true"
      />
    </ul>
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
      this.test = this.questions.map(question => {
        return {
          questionId: question.id,
          answer: question.type === 'choice' && !question.options.isYesNo ? [] : null,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.poll-preview {
  width: 100%;
  height: 100%;
  background-color: $primary-dark;
  &__title {
    display: flex;
    justify-content: space-between;
    background-color: $primary-light;
    margin: 10px;
    padding: 20px;
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
  &__list {
    list-style: none;
    margin: 10px 0;
    padding: 0;
  }
}
header {
  @include section-header;
}
</style>
