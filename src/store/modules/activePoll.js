import { fetchDocument } from '../../utility/firebase';

const activePollStore = {
  state: {
    activePoll: null,
  },
  mutations: {
    setActivePoll(state, poll) {
      state.activePoll = poll;
    },
  },
  actions: {
    async fetchActivePoll({ commit }, pollId) {
      const fetchedPoll = await fetchDocument('activePolls', pollId);
      try {
        commit('setActivePoll', fetchedPoll);
      } catch (err) {
        throw err;
      }
    },
  },
};
export default activePollStore;
