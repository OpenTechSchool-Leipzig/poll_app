<template>
  <div>
    <PollList
      v-if="!!populatedPolls"
      :title="'All Polls'"
      :polls="populatedPolls"
      :buttons="['Change State', 'Visit Poll']"
      @ChangeState="handleStateSelection"
      @VisitPoll="visitPollHandler"
    />
    <PollList
      v-if="!!populatedTemplates"
      :title="'Templates'"
      :polls="populatedTemplates"
      :buttons="['Delete Template']"
      @DeleteTemplate="deleteTemplate"
    />
    <SelectPollState
      v-if="pollToUpdate.id"
      :pollId="pollToUpdate.id"
      :initialState="pollToUpdate.initialState"
      @clearState="clearStateSelection"
    />
  </div>
</template>

<script>
import PollList from '@/components/polls/PollList.vue';
import SelectPollState from '@/components/polls/SelectPollState.vue';

export default {
  name: 'PollOverview',
  components: {
    PollList,
    SelectPollState,
  },
  data() {
    return {
      pollToUpdate: {
        id: null,
        initialState: null,
      },
    };
  },
  computed: {
    populatedPolls() {
      return this.$store.getters.populatedPolls;
    },
    populatedTemplates() {
      return this.$store.getters.populatedTemplates;
    },
  },
  methods: {
    deleteTemplate(id) {
      this.$store.dispatch('deleteTemplate', id);
    },
    handleStateSelection(id) {
      this.pollToUpdate.id = id;
      this.pollToUpdate.initialState = this.populatedPolls.find(x => x.id === id).state;
    },
    visitPollHandler(id) {
      this.$router.push({ path: `/poll/${id}` });
    },
    clearStateSelection() {
      console.log('clearState');
      this.pollToUpdate.id = null;
      this.pollToUpdate.initialState = null;
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
