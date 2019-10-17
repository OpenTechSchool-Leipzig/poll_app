import Vue from 'vue';
import Vuex from 'vuex';

import questionStore from './modules/questions';
import pollStore from './modules/polls';
import templateStore from './modules/templates';
import answerStore from './modules/answers';
import userStore from './modules/user';
import confirmationDialogStore from './modules/confirmationDialog';
import activePollStore from './modules/activePoll';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    questions: questionStore,
    polls: pollStore,
    templates: templateStore,
    answers: answerStore,
    user: userStore,
    confirmationDialog: confirmationDialogStore,
    activePoll: activePollStore,
  },
});
