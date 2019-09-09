<template>
  <div class="poll">
    <div v-if="isLoading">is loading...</div>
    <div v-if="!isLoading">
      <div class="poll__badge poll__badge--warn" v-if="activePoll.state === 'draft'">!DRAFT!</div>
      <div class="poll__badge poll__badge--danger" v-if="activePoll.state === 'closed'">
        !CLOSED!
      </div>
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
          :isPreview="true"
        />
      </ul>
      <button v-if="activePoll.state === 'active'" @click="sendAnswerHandler">Send Answers</button>
    </div>
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
    populatedPolls() {
      return this.$store.getters.populatedPolls || [];
    },
    activePoll() {
      return this.populatedPolls.find(poll => poll.id === this.$route.params.pollId);
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
      this.userAnswer.forEach(x => {
        if (!x.answer) return null;
      });
      console.log('sending answer...');
      this.$store.dispatch('AddAnswer', {
        pollId: this.activePoll.id,
        answers: { ...this.userAnswer },
      });
    },
  },
  async mounted() {
    if (!this.populatedPolls.find(x => x.id === this.$route.params.pollId)) {
      await this.$store.dispatch('fetchQuestions');
      await this.$store.dispatch('fetchSinglePoll', this.$route.params.pollId);
    }
    this.populateAnswers();
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.poll {
  width: 100%;
  max-width: 1200px;
  height: 100%;
  background-color: $primary-dark;
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
