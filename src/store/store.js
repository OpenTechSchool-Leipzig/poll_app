import Vue from 'vue';
import Vuex from 'vuex';
import { fetchCollection, AddData } from './firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    polls: [],
    // add state for templates and login and separate in modules later on.
    // add global notifications / error messages?
  },
  mutations: {
    updateQuestions(state, questionList) {
      state.questions = questionList;
    },
    pushQuestion(state, question) {
      const questionList = [...state.questions, question];
      state.questions = questionList;
    },
    updatePolls(state, pollList) {
      state.polls = pollList;
    },
    pushPoll(state, poll) {
      const pollList = [...state.polls, poll];
      state.polls = pollList;
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
});
