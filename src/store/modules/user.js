import { addDataWithId, fetchCollection } from '../firebase';

const userStore = {
  state: {
    uid: null,
    displayName: null,
    email: null,
    admin: null,
    userList: [],
  },
  mutations: {
    setUser(state, newUser) {
      if (newUser) {
        state.uid = newUser.uid;
        state.displayName = newUser.displayName;
        state.email = newUser.email;
        state.admin = newUser.admin;
      } else {
        state.uid = null;
        state.displayName = null;
        state.email = null;
        state.admin = null;
      }
    },
    setUserList(state, userList) {
      state.userList = userList;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async createUser({ commit }, userData) {
      await addDataWithId('users', userData.id, userData.info);
    },
    async fetchUsers({ commit }) {
      const userList = await fetchCollection('users');
      try {
        commit('setUserList', userList);
      } catch (err) {
        throw err;
      }
    },
  },
};

export default userStore;
