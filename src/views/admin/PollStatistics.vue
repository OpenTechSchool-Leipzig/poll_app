<template>
  <div>
    <div class="columns">
      <div class="column is-full" v-if="answeredPolls && answeredPolls.length > 0">
        <SelectUnit name="Select Poll" v-model="selectedPoll">
          <template slot="icon">
            <font-awesome-icon icon="sort-amount-up-alt" />
          </template>
          <option v-for="poll in answeredPolls" :key="poll.id" :value="poll.id">{{
            poll.title
          }}</option>
        </SelectUnit>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4-desktop">
        <div class="box" v-if="selectedPollData">
          <h2 class="title is-3">{{ selectedPollData.title }}</h2>
          <h4 class="subtitle is-5">{{ selectedPollData.date }}</h4>
          <p>
            <b>Number of Answers:</b>
            <span>{{ answerCount }}</span>
          </p>
          <p>
            <b>last Answer added:</b>
            <span>{{ selectedPollData.latestAnswer.toDate().toLocaleDateString() }}</span>
          </p>
        </div>
      </div>
      <div class="column is-8-desktop">
        <template v-if="selectedPollData && selectedPollData.questions.length">
          <QuestionStats
            v-for="question in selectedPollData.questions"
            :key="question.id"
            :question="question"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionStats from '@/components/statistics/QuestionStats.vue';

export default {
  name: 'PollStatistics',
  components: {
    QuestionStats,
  },
  data() {
    return {
      selectedPoll: '',
    };
  },
  computed: {
    answeredPolls() {
      return this.$store.getters.answeredPolls;
    },
    selectedPollData() {
      if (!this.answeredPolls || !this.selectedPoll) return null;
      return this.answeredPolls.find(p => p.id === this.selectedPoll);
    },
    answerCount() {
      if (!this.selectedPollData) return 0;
      let count = 0;
      this.selectedPollData.questions.forEach(q => {
        const length = q.answers.length;
        if (length > count) count = length;
      });
      return count;
    },
  },
  mounted() {
    if (this.$route.params.pollId) {
      this.selectedPoll = this.$route.params.pollId;
    }
  },
};
</script>

<style lang="scss" scoped>
.columns {
  margin: 0;
}
.column {
  flex-direction: column;
}
</style>
