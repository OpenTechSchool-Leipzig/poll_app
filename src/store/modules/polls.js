import { fetchCollection, AddData } from '../firebase';

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

      if (polls.length > 0 && questions.length > 0) {
        polls.forEach(poll => {
          const questionObjects = questions.filter(x => poll.questions.includes(x.id));
          poll.questions = questionObjects;
        });
        return polls;
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
    async addPoll({ commit }, poll) {
      const pollId = await AddData('polls', poll);
      try {
        poll.id = pollId;
        commit('pushPoll', poll);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default pollStore;
