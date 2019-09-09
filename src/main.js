import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import { auth } from './store/firebase';
import './registerServiceWorker';
import '../node_modules/bulma/css/bulma.css';

Vue.config.productionTip = false;

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
