import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/newpoll',
      name: 'newPoll',
      component: () => import('./views/CreatePoll.vue'),
      meta: {
        admin: true,
      },
    },
    {
      path: '/',
      name: 'polloverview',
      component: () => import('./views/PollOverview.vue'),
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
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        guest: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Register.vue'),
      meta: {
        guest: true,
      },
    },
    {
      path: '/402',
      name: '402',
      component: () => import('./views/static/402.vue'),
      meta: {
        auth: true,
      },
    },
    // dynamic path to poll
    {
      path: '/poll/:pollId',
      name: 'answerPoll',
      component: () => import('./views/AnswerPoll.vue'),
    },
    {
      path: '/success/:pollId',
      name: 'success',
      component: () => import('./views/Success.vue'),
    },
    {
      path: '/preview/:pollId',
      name: 'previewPoll',
      component: () => import('./views/PollPreview.vue'),
      meta: {
        admin: true,
      },
    },
    // wildcard route for 404
    {
      path: '*',
      name: '404',
      component: () => import('./views/static/404.vue'),
    },
  ],
});

// navigation guard
router.beforeEach((to, from, next) => {
  checkRoutes(to, from, next, store.state.user);
});

function checkRoutes(to, from, next, userData) {
  if (to.matched.some(route => route.meta.admin)) {
    // check for custom admin claim
    if (userData.admin) next();
    else {
      // redirect to no permission page
      next({ path: '/402' });
    }
  } else if (to.matched.some(route => route.meta.auth)) {
    // if user is not logged in, allways redirect to auth page
    if (userData.uid) next();
    else {
      next({ path: '/login' });
    }
  } else if (to.matched.some(route => route.meta.guest)) {
    // check if user is logged in
    if (!userData.uid) next();
    else {
      // redirect user to last route or default page
      next(from.name ? false : '/');
    }
  } else {
    next();
  }
}

export default router;
