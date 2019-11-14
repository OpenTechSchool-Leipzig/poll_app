<template>
  <div class="poll">
    <div v-if="isLoading">is loading...</div>
    <template v-if="!isLoading">
      <header>
        <h2>{{ activePoll.title }}</h2>
        <h4>on {{ activePoll.date }}</h4>
      </header>
      <ul class="poll__list" v-if="activePoll">
        <PollQuestion
          v-for="(question, index) in activePoll.questions"
          :key="question.id"
          :question="question"
          :qIndex="index"
          v-model="userAnswer"
          :isPreview="false"
        />
      </ul>
      <DefaultButton
        v-show="activePoll.state === 'active'"
        name="Send Answers"
        @click="sendAnswerHandler"
        isPrimary
        :hasConfirmation="!allQuestionsAnswered"
        confirmationText="You did not answer all questions. Do you really want to send your answers already?"
      />
    </template>
  </div>
</template>

<script>
import PollQuestion from '@/components/polls/PollQuestion.vue';

export default {
  name: 'AnswerPoll',
  components: {
    PollQuestion,
  },
  data() {
    return {
      // data structure for answers
      isLoading: true,
      userAnswer: [],
    };
  },
  computed: {
    activePoll() {
      return this.$store.state.activePoll.activePoll;
    },
    allQuestionsAnswered() {
      return !this.userAnswer.some(x => {
        return x.answer === null || x.answer.length === 0;
      });
    },
  },
  methods: {
    populateAnswers() {
      this.userAnswer = this.activePoll.questions.map(question => {
        return {
          questionId: question.id,
          answer: question.type === 'choice' && !question.options.isYesNo ? [] : null,
        };
      });
    },
    sendAnswerHandler() {
      console.log('sending answer...');
      this.$store
        .dispatch('addAnswer', {
          pollId: this.activePoll.id,
          answers: { ...this.userAnswer },
        })
        .then(() => {
          this.$router.push({
            name: 'success',
            pollId: this.activePoll.id,
          });
        })
        .catch(error => {
          this.$store.dispatch('addNotification', {
            title: 'Error',
            message: error,
            type: 'danger',
          });
        });
    },
  },
  async mounted() {
    if (!this.$store.state.activePoll.activePoll) {
      try {
        await this.$store.dispatch('fetchActivePoll', this.$route.params.pollId);
        this.populateAnswers();
        this.isLoading = false;
      } catch (err) {
        this.$router.push({ name: '404' });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.poll {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px 10px 10px;

  header {
    @extend .poll-title;
    h2 {
      font-size: 1.5rem;
      display: inline-block;
    }
    h4 {
      font-size: 1.2rem;
      display: inline-block;
    }
  }

  &__list {
    list-style: none;
    margin: 10px 0;
    padding: 0;
  }
  &__badge {
    padding: 20px;
    &--warn {
      background-color: $warning;
      border: 2px solid darken($warning, 20%);
    }
    &--danger {
      background-color: $danger;
      border: 2px solid darken($danger, 20%);
    }
  }
}
</style>
