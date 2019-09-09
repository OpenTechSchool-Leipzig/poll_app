import { fetchCollection, fetchDocument, AddData, UpdateData } from '../firebase';

const pollStore = {
  state: {
    polls: [],
    // an gloablly available state for the active poll might be neccassary
    // (e.g: navigating from Overview to CreatePoll View after selection)
    // activePoll: {}
  },
  getters: {
    populatedPolls: (state, getters, rootState) => {
      const { polls } = state;
      const { questions } = rootState.questions;

      let popPolls = JSON.parse(JSON.stringify(polls));

      if (popPolls.length > 0 && questions.length > 0) {
        popPolls.forEach(poll => {
          const questionObjects = questions.filter(x => poll.questions.includes(x.id));
          poll.questions = questionObjects;
        });
        return popPolls;
      }
      return null;
    },
  },
  mutations: {
    updatePolls(state, pollList) {
      state.polls = pollList;
    },
    pushPoll(state, poll) {
      const pollList = [...state.polls, poll];
      state.polls = pollList;
    },
    updateSinglePollState(state, { pollId, newState }) {
      let updatedPolls = state.polls.map(x =>
        x.id === pollId ? (x = { ...x, state: newState }) : x
      );
      state.polls = updatedPolls;
    },
  },
  actions: {
    async fetchPolls({ commit }) {
      const fetchedPolls = await fetchCollection('polls');
      try {
        commit('updatePolls', fetchedPolls);
      } catch (err) {
        throw err;
      }
    },
    async fetchSinglePoll({ commit }, pollId) {
      const fetchedPoll = await fetchDocument('polls', pollId);
      try {
        commit('pushPoll', fetchedPoll);
      } catch (err) {
        throw err;
      }
    },
    async addPoll({ commit }, poll) {
      const pollId = await AddData('polls', poll);
      try {
        poll.id = pollId;
        commit('pushPoll', poll);
      } catch (error) {
        console.log(error);
      }
    },
    async updatePollState({ commit }, { pollId, newState }) {
      await UpdateData('polls', pollId, { state: newState });
      try {
        commit('updateSinglePollState', { pollId, newState });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
export default pollStore;
