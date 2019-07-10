<template>
  <div>
    <PollList :title="'All Polls'" :polls="populatedPolls" />
  </div>
</template>

<script>
import PollList from '@/components/PollList.vue';

export default {
  name: 'PollOverview',
  components: {
    PollList,
  },
  computed: {
    storedPolls() {
      return this.$store.state.polls.polls;
    },
    storedQuestions() {
      return this.$store.state.questions.questions;
    },
    populatedPolls() {
      let polls = this.$store.state.polls.polls;
      let questions = this.$store.state.questions.questions;
      if (polls.length > 0 && questions.length > 0) {
        console.log('computed Polls: ' + JSON.stringify(polls));
        console.log('computed Questions: ' + JSON.stringify(questions));
        polls.forEach((poll) => {
          let questionObjects = questions.filter((x) =>
            poll.questions.includes(x.id)
          );
          console.log('selected Questions: ' + JSON.stringify(questionObjects));
          poll.questions = questionObjects;
        });
        return polls;
      } else {
        return null;
      }
    },
  },
  mounted: function() {
    if (this.storedPolls.length === 0) {
      this.$store.dispatch('fetchPolls');
    }
    if (this.storedQuestions.length === 0) {
      this.$store.dispatch('fetchQuestions');
    }
  },
};
</script>
