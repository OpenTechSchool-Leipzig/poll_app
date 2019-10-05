const confirmationDialogStore = {
  state: {
    title: null,
    text: null,
    visible: false,
    type: null,
    isDanger: false,
    action: null,
  },
  mutations: {
    setDialog(state, payload) {
      if (!payload) {
        //reset state if payload is null
        state.title = null;
        state.text = null;
        state.visible = false;
        state.type = null;
        state.isDanger = false;
        state.action = null;
      } else {
        state.title = payload.title;
        state.text = payload.text;
        state.visible = true;
        state.type = payload.type || null;
        state.isDanger = payload.isDanger || false;
        state.action = payload.action || null;
      }
    },
  },
};

export default confirmationDialogStore;
