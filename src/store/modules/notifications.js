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
  },
  actions: {
    addNotification: ({ commit }, notification) => {
      commit('addNotification', notification);
    },
    removeNotification: ({ commit }, notification) => {
      commit('removeNotification', notification.id);
    },
  },
  getters: {
    notifications: state => {
      return state.notifications;
    },
  },
};

export default notificationsStore;
