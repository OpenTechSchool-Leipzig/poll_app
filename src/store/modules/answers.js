import { fetchCollection, addToArray } from '../../utility/firebase';

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
      try {
        const fetchedAnswers = await fetchCollection('answers');
        commit('updateAnswers', fetchedAnswers);
      } catch (err) {
        throw err;
      }
    },

    // eslint-disable-next-line no-unused-vars
    async addAnswer({ commit }, { pollId, answers }) {
      try {
        console.log('id: ' + pollId + 'add Answer: ' + answers);
        await addToArray('answers', pollId, 'userAnswers', answers);

        console.log('answers added');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
export default answerStore;
