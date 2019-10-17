import Vue from 'vue';

const notificationsStore = {
  state: {
    notifications: [],
  },
  mutations: {
    addNotification: (state, { title, message, type }) => {
      state.notifications = [
        {
          id: state.notifications.length++,
          title: title,
          message: message,
          type: type,
        },
      ];
    },
    removeNotification: (state, id) => {
      state.notifications = state.notifications.filter(notification => {
        return notification.id !== id;
      });
    },
    fadeNotification: (state, id) => {
      state.notifications.map(notification => {
        if (notification.id === id) {
          Vue.set(notification, 'fade', 'fadeOut');
        }
      });
    },
  },
  actions: {
    addNotification: ({ commit }, notification) => {
      commit('addNotification', notification);
    },
    removeNotification: ({ commit }, notification) => {
      commit('fadeNotification', notification.id);
      setTimeout(() => {
        commit('removeNotification', notification.id);
      }, 500);
    },
  },
  getters: {
    notifications: state => {
      return state.notifications;
    },
  },
};

export default notificationsStore;
