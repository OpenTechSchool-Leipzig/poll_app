<template>
  <div>
    <div class="columns">
      <div class="column is-full" v-if="answeredPolls && answeredPolls.length > 0">
        <select v-model="selectedPoll">
          <option value>Select Poll</option>
          <option v-for="poll in answeredPolls" :key="poll.id" :value="poll.id">{{
            poll.title
          }}</option>
        </select>
      </div>
    </div>
    <div class="columns">
      <div class="column is-three-fifths-desktop"></div>
      <div class="column is-two-fifths-desktop">
        <div class="box">
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
export default {
  name: 'PollStatistics',
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
