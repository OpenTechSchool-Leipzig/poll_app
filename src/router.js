import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin-group" */ './views/admin/AdminFrame.vue'),
      children: [
        {
          path: '',
          name: 'polloverview',
          component: () =>
            import(/* webpackChunkName: "admin-group" */ './views/admin/PollOverview.vue'),
          meta: {
            admin: true,
          },
        },
        {
          path: 'newpoll',
          name: 'newPoll',
          component: () =>
            import(/* webpackChunkName: "admin-group" */ './views/admin/CreatePoll.vue'),
          meta: {
            admin: true,
          },
        },
        {
          path: '/preview/:pollId',
          name: 'previewPoll',
          component: () => import('./views/admin/PollPreview.vue'),
          meta: {
            admin: true,
          },
        },
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "admin-group" */ './views/admin/Login.vue'),
          meta: {
            guest: true,
          },
        },
        {
          path: '/signup',
          name: 'signup',
          component: () =>
            import(/* webpackChunkName: "admin-group" */ './views/admin/Register.vue'),
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
      ],
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
