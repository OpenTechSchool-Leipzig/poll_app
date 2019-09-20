import { fetchCollection, addData, getUserId, getTimestamp } from '../firebase';

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
      const questionData = {
        ...question,
        createdAt: getTimestamp(Date.now()),
        createdBy: getUserId(),
      };
      const questionId = await addData('questions', questionData);
      try {
        questionData.id = questionId;
        commit('pushQuestion', questionData);
        return questionId;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};

export default questionStore;
