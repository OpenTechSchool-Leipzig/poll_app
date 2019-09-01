import Vue from 'vue';
import Vuex from 'vuex';

import questionStore from './modules/questions';
import pollStore from './modules/polls';
import templateStore from './modules/templates';
import answerStore from './modules/answers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    questions: questionStore,
    polls: pollStore,
    templates: templateStore,
    answers: answerStore,
  },
  // add state for templates and login and separate in modules later on.
  // add global notifications / error messages?
});