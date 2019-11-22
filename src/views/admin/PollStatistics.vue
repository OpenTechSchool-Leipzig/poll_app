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
      <div class="column is-three-fifths-desktop">
        <div v-if="selectedPollData && selectedPollData.questions.length">
          <template v-for="question in selectedPollData.questions">
            <MultipleChoiceStats
              :key="question.id"
              v-if="question.type === 'choice'"
              :question="question"
            />
          </template>
        </div>
      </div>
      <div class="column is-two-fifths-desktop">
        <div class="box" v-if="selectedPollData">
          <h2>{{ selectedPollData.title }}</h2>
          <h4>{{ selectedPollData.date }}</h4>
          <p>
            <b>Anzahl antworten:</b>
            <span>{{ answerCount }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultipleChoiceStats from '@/components/statistics/questions/MultipleChoiceStats.vue';

export default {
  name: 'PollStatistics',
  components: {
    MultipleChoiceStats,
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
  methods: {},
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
