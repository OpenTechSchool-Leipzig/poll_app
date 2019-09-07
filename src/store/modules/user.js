const userStore = {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser;
    },
  },
};

export default userStore;
