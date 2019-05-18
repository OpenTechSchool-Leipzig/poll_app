import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

firebase.initializeApp({
  apiKey: 'AIzaSyAh96vcteaBtbxpC_Kdgu8KlWaPjDHAe6k',
  databaseURL: 'https://ots-poll.firebaseio.com',
  storageBucket: 'ots-poll.appspot.com',
  authDomain: 'ots-poll.firebaseapp.com',
  messagingSenderId: '624384552684',
  projectId: 'ots-poll',
  appId: '1:624384552684:web:296fefd472c975c3',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
