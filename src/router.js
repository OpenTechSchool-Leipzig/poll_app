import Vue from 'vue';
import Router from 'vue-router';
import CreatePoll from './views/CreatePoll.vue';
import PollOverview from './views/PollOverview.vue';
import AnswerPoll from './views/AnswerPoll.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/newpoll',
      name: 'newPoll',
      component: CreatePoll,
    },
    {
      path: '/',
      name: 'polloverview',
      component: PollOverview,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    // dynamic path to poll
    {
      path: '/poll/:pollId',
      name: 'answerPoll',
      component: AnswerPoll,
    },
  ],
});
