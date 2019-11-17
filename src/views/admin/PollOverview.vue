<template>
  <div class="columns">
    <div class="column is-three-fifths-desktop">
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
        :pollTitle="pollToUpdate.title"
        :initialState="pollToUpdate.initialState"
        @clearState="clearStateSelection"
      />
    </div>
    <div class="column is-two-fifths-desktop">
      <UserList :users="userList"></UserList>
    </div>
  </div>
</template>

<script>
import PollList from '@/components/polls/PollList.vue';
import SelectPollState from '@/components/polls/SelectPollState.vue';
import UserList from '@/components/users/UserList.vue';

export default {
  name: 'PollOverview',
  components: {
    PollList,
    SelectPollState,
    UserList,
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
    userList() {
      return this.$store.state.user.userList;
    },
  },
  methods: {
    deleteTemplate(id) {
      this.$store.dispatch('deleteTemplate', id);
    },
    handleStateSelection(id) {
      const selectedPoll = this.populatedPolls.find(x => x.id === id);
      this.pollToUpdate.id = id;
      this.pollToUpdate.title = selectedPoll.title;
      this.pollToUpdate.initialState = selectedPoll.state;
    },
    visitPollHandler(id) {
      if (this.populatedPolls.find(x => x.id === id).state === 'active') {
        this.$router.push({ path: `/poll/${id}` });
      } else {
        this.$router.push({ path: `/preview/${id}` });
      }
    },
    clearStateSelection() {
      this.pollToUpdate.id = null;
      this.pollToUpdate.initialState = null;
    },
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
