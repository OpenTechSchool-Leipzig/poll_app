<template>
  <div class="poll">
    <div v-if="isLoading">is loading...</div>
    <template v-if="!isLoading">
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
          :isPreview="false"
        />
      </ul>
      <button v-if="activePoll.state === 'active'" @click="sendAnswerHandler">Send Answers</button>
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
      this.$store.dispatch('addAnswer', {
        pollId: this.activePoll.id,
        answers: { ...this.userAnswer },
      });
    },
  },
  async mounted() {
    // this data should only be fetched for draft and closed state polls
    try {
      if (!this.populatedPolls.find(x => x.id === this.$route.params.pollId)) {
        let a = this.$store.dispatch('fetchQuestions');
        let b = this.$store.dispatch('fetchUsers');
        let c = this.$store.dispatch('fetchSinglePoll', this.$route.params.pollId);
        // this will await for all promises to resolve whithout preventing all fetch functions to be called
        await Promise.all([a, b, c]);
      }
    } catch (err) {
      console.log(err);
    }

    this.populateAnswers();
    this.isLoading = false;
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
