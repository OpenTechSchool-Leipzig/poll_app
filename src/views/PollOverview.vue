<template>
  <ul>
    <li v-for="poll in storedPolls" :key="poll.id">
      <h3>{{poll.title}}</h3>
      <p>{{poll.questions.length}} Questions</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PollOverview',
  components: {},
  computed: {
    storedPolls() {
      return this.$store.state.polls.polls;
    },
  },
  mounted: function() {
    this.$store.dispatch('fetchPolls');
  },
};
</script>
