import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';

// views
import CreatePoll from './views/CreatePoll.vue';
import PollOverview from './views/PollOverview.vue';
import AnswerPoll from './views/AnswerPoll.vue';
import Auth from './views/Auth.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import NotFound from './views/static/404.vue';
import NoPermission from './views/static/402.vue';

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
      component: () => import(/* webpackChunkName: "about" */ './views/static/About'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        guest: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: Register,
    },
    {
      path: '/402',
      name: '402',
      component: NoPermission,
      meta: {
        auth: true,
      },
    },
    // dynamic path to poll
    {
      path: '/poll/:pollId',
      name: 'answerPoll',
      component: AnswerPoll,
    },
    // wildcard route for 404
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});

// navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.admin)) {
    // check for custom admin claim
    if (store.state.user.admin) next();
    else {
      // redirect to no permission page
      next({ path: '/402' });
    }
  } else if (to.matched.some(route => route.meta.auth)) {
    // if user is not logged in, allways redirect to auth page
    if (store.state.user.uid) next();
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
