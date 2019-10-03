import Vue from 'vue';
import VTooltip from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMinus,
  faPlus,
  faTrashAlt,
  faFileDownload,
  faFileUpload,
  faClone,
  faTimes,
  faUser,
  faChevronRight,
  faSearch,
  faEdit,
  faBars,
  faFilter,
  faSortAmountUpAlt,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store/store';
import { auth } from './utility/firebase';
import './registerServiceWorker';
//import '../node_modules/bulma/css/bulma.css';

library.add(
  faMinus,
  faPlus,
  faTrashAlt,
  faFileDownload,
  faFileUpload,
  faClone,
  faTimes,
  faUser,
  faChevronRight,
  faSearch,
  faEdit,
  faBars,
  faFilter,
  faSortAmountUpAlt,
  faExternalLinkAlt
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VTooltip, { defaultPlacement: 'bottom' });

/* using "onAuthStateChanged" Observer from firebase to check stored user token and update user in store
this is neccassary for the router to work properly. The observer returns it's unsubscribe method,
which is called after initialization */
const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
  if (firebaseUser)
    firebaseUser.getIdTokenResult().then(tokenResult => {
      firebaseUser.admin = tokenResult.claims.admin;
      store.commit('setUser', firebaseUser);
    });
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  });
  unsubscribe();
});
