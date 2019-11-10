<template>
  <SectionContainer title="Poll Preview">
    <form class="poll-preview__title">
      <input
        class="poll-preview__input poll-preview__input--title"
        :class="{ 'poll-preview__input--highlight': isTemplateLoaded }"
        type="text"
        v-model="value.title"
        placeholder="Poll Title"
      />
      <div class="date-wrapper">
        <input
          class="poll-preview__input poll-preview__input--date"
          :class="{ 'poll-preview__input--highlight': isTemplateLoaded }"
          type="date"
          v-model="value.date"
        />
        <div v-if="showDateWarning" class="notification is-warning">
          <button class="delete" @click.prevent="showDateWarning = false"></button>
          Your selected date lies in the past
        </div>
      </div>
    </form>

    <slot name="default"></slot>

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

    <template slot="controls">
      <slot name="controls"></slot>
    </template>
  </SectionContainer>
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
      showDateWarning: false,
    };
  },
  watch: {
    questions() {
      this.populateAnswers();
    },
    value: {
      deep: true,
      handler: function(val) {
        // validate date
        if (val && val.date && this.isValidDate(val.date)) {
          this.showDateWarning = false;
        } else if (val && val.date) {
          this.showDateWarning = true;
        }
        this.$emit('input', this.value);
      },
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
    isValidDate(val) {
      let selected = new Date(val)
        .toISOString()
        .substring(0, 10)
        .split('-');
      let today = new Date()
        .toISOString()
        .substring(0, 10)
        .split('-');
      if (selected[0] < today[0]) {
        return false; // previous year
      } else if (selected[0] === today[0] && selected[1] < today[1]) {
        return false; // same year previous month
      } else if (selected[0] === today[0] && selected[1] === today[1] && selected[2] < today[2]) {
        return false; // same year and month earlier day
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: hidden;
}
.poll-preview {
  &__title {
    @extend .poll-title;
  }
  &__input {
    border: none;
    background-color: transparent;
    font-size: 1.17em;
    color: #2c3e50;
    &--title {
      flex: 1 0 65%;
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
.date-wrapper {
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.notification {
  position: absolute;
  top: 100%;
}
</style>
