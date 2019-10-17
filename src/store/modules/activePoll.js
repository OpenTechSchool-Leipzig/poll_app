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
      try {
        const fetchedPoll = await fetchDocument('activePolls', pollId);
        commit('setActivePoll', fetchedPoll);
      } catch (err) {
        throw err;
      }
    },
  },
};
export default activePollStore;
