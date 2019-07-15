<template>
  <div>
    <PollList v-if="!!populatedPolls" :title="'All Polls'" :polls="populatedPolls" />
    <PollList v-if="!!populatedTemplates" :title="'Templates'" :polls="populatedTemplates" />
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
    populatedPolls() {
      return this.$store.getters.populatedPolls;
    },
    populatedTemplates() {
      return this.$store.getters.populatedTemplates;
    },
  },
  mounted: function() {
    // Where to place all the requests
    if (this.$store.state.polls.polls.length < 1) {
      this.$store.dispatch('fetchPolls');
    }
    if (this.$store.state.questions.questions.length < 1) {
      this.$store.dispatch('fetchQuestions');
    }
    if (this.$store.state.templates.templates.length < 1) {
      this.$store.dispatch('fetchTemplates');
    }
  },
};
</script>
