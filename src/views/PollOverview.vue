<template>
  <div>
    <PollList v-if="populatedPolls" :title="'All Polls'" :polls="populatedPolls" />
    <PollList v-if="populatedTemplates" :title="'Templates'" :polls="populatedTemplates" />
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
    //populate Polls and Templates in store instead?!
    populatedPolls() {
      let polls = this.$store.state.polls.polls;
      let questions = this.$store.state.questions.questions;
      if (polls.length > 0 && questions.length > 0) {
        polls.forEach(poll => {
          let questionObjects = questions.filter(x =>
            poll.questions.includes(x.id)
          );
          poll.questions = questionObjects;
        });
        return polls;
      } else {
        return null;
      }
    },
    populatedTemplates() {
      let templates = this.$store.state.templates.templates;
      let questions = this.$store.state.questions.questions;
      if (templates.length > 0 && questions.length > 0) {
        templates.forEach(template => {
          let questionObjects = questions.filter(x =>
            template.questions.includes(x.id)
          );
          template.questions = questionObjects;
        });
        return templates;
      } else {
        return null;
      }
    },
  },
  mounted: function() {
    // Where to place all the reqeuests?
    this.$store.dispatch('fetchPolls');
    this.$store.dispatch('fetchQuestions');
    this.$store.dispatch('fetchTemplates');
  },
};
</script>
