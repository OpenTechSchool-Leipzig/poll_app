import { fetchCollection, AddToArray } from '../firebase';

const answerStore = {
  state: {
    answers: [],
  },

  mutations: {
    updateAnswers(state, answerList) {
      state.polls = answerList;
    },
  },
  actions: {
    async fetchAnswers({ commit }) {
      const fetchedAnswers = await fetchCollection('answers');
      try {
        commit('updateAnswers', fetchedAnswers);
      } catch (err) {
        throw err;
      }
    },

    // eslint-disable-next-line no-unused-vars
    async AddAnswer({ commit }, { pollId, answers }) {
      console.log('id: ' + pollId + 'add Answer: ' + answers);
      await AddToArray('answers', pollId, 'userAnswers', answers);
      try {
        console.log('answers added');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
export default answerStore;
