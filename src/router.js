import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';
import CreatePoll from './views/CreatePoll.vue';
import PollOverview from './views/PollOverview.vue';
import AnswerPoll from './views/AnswerPoll.vue';
import Auth from './views/Auth.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/newpoll',
      name: 'newPoll',
      component: CreatePoll,
      meta: {
        admin: true,
      },
    },
    {
      path: '/',
      name: 'polloverview',
      component: PollOverview,
      meta: {
        admin: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        guest: true,
      },
    },
    // dynamic path to poll
    {
      path: '/poll/:pollId',
      name: 'answerPoll',
      component: AnswerPoll,
    },
  ],
});

// navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.admin)) {
    // check for custom claim admin
    console.log(store.state.user.admin);
    if (store.state.user.admin) next();
    else {
      next({ path: '/auth' });
    }
  } else if (to.matched.some(route => route.meta.guest)) {
    // check if user is logged in
    if (!store.state.user.uid) next();
    else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router;
