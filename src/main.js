import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  databaseURL: 'https://ots-poll.firebaseio.com',
  storageBucket: 'ots-poll.appspot.com',
  authDomain: 'ots-poll.firebaseapp.com',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MS_ID,
  projectId: 'ots-poll',
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
