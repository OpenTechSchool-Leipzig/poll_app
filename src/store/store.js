import Vue from 'vue';
import Vuex from 'vuex';
import { fetchCollection, AddData } from './firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    polls: [],
    // add state for templates and login and separate in modules later on.
  },
  mutations: {
    updateQuestions(state, questionList) {
      state.questions = questionList;
    },
    addQuestion(state, question) {
      const questionList = [...state.questions, question];
      state.questions = questionList;
    },
  },
  actions: {
    async fetchQuestions({ commit }) {
      const fetchedQuestions = await fetchCollection('test');
      try {
        commit('updateQuestions', fetchedQuestions);
      } catch (err) {
        throw err;
      }
    },
    async pushQuestion({ commit }, question) {
      const questionId = await AddData('test', question);
      try {
        question.id = questionId;
        commit('addQuestion', question);
        return questionId;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
});
