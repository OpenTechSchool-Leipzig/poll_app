import { fetchCollection, addData, getUserId, getTimestamp } from '../firebase';

const questionStore = {
  state: {
    questions: [],
  },

  getters: {
    populatedQuestions: (state, getters, rootState) => {
      const { questions } = state;
      const { userList } = rootState.user;

      let popQuestions = [...questions];

      if (popQuestions.length > 0 && userList.length > 0) {
        popQuestions.forEach(question => {
          question.createdBy = userList.find(x => x.id === question.createdBy);
        });
        return popQuestions;
      }
      return null;
    },
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
