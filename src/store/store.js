import Vue from 'vue';
import Vuex from 'vuex';

import questionStore from './modules/questions';
import pollStore from './modules/polls';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    questions: questionStore,
    polls: pollStore,
  },
  // add state for templates and login and separate in modules later on.
  // add global notifications / error messages?
});
