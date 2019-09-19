import { addDataWithId } from '../firebase';

const userStore = {
  state: {
    uid: null,
    displayName: null,
    email: null,
    admin: null,
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
    newUser(state, uId) {
      state.newUser = uId;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async createUser({ commit }, userData) {
      console.log('create user in DB: dispatched');
      await addDataWithId('users', userData.id, userData.info);
    },
  },
};

export default userStore;
