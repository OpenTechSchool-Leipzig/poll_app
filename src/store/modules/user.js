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
        state.admin = newUser.customClaims;
      } else {
        state.uid = null;
        state.displayName = null;
        state.email = null;
        state.admin = null;
      }
    },
  },
};

export default userStore;
