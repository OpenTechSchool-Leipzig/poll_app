import { fetchCollection, AddData } from '../firebase';

const questionStore = {
  state: {
    questions: [],
  },
  mutations: {
    updateQuestions(state, questionList) {
      state.questions = questionList;
    },
    pushQuestion(state, question) {
      const questionList = [...state.questions, question];
      state.questions = questionList;
    },
  },
  actions: {
    async fetchQuestions({ commit }) {
      const fetchedQuestions = await fetchCollection('questions');
      try {
        commit('updateQuestions', fetchedQuestions);
      } catch (err) {
        throw err;
      }
    },
    async addQuestion({ commit }, question) {
      const questionId = await AddData('questions', question);
      try {
        question.id = questionId;
        commit('pushQuestion', question);
        return questionId;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};

export default questionStore;
