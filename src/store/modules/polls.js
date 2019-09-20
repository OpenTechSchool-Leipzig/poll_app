import {
  fetchCollection,
  fetchDocument,
  addData,
  updateData,
  serverTimestamp,
  getUserId,
  getTimestamp,
} from '../firebase';

const pollStore = {
  state: {
    polls: [],
    // an gloablly available state for the active poll might be neccassary
    // (e.g: navigating from Overview to CreatePoll View after selection)
    // activePoll: {}
  },
  getters: {
    populatedPolls: (state, getters, rootState) => {
      const { polls } = state;
      const { questions } = rootState.questions;

      let popPolls = JSON.parse(JSON.stringify(polls));

      if (popPolls.length > 0 && questions.length > 0) {
        popPolls.forEach(poll => {
          const questionObjects = questions.filter(x => poll.questions.includes(x.id));
          poll.questions = questionObjects;
        });
        return popPolls;
      }
      return null;
    },
  },
  mutations: {
    updatePolls(state, pollList) {
      state.polls = pollList;
    },
    pushPoll(state, poll) {
      const pollList = [...state.polls, poll];
      state.polls = pollList;
    },
    updateSinglePollState(state, { pollId, activationInfo }) {
      let updatedPolls = state.polls.map(x =>
        x.id === pollId ? (x = { ...x, ...activationInfo }) : x
      );
      state.polls = updatedPolls;
    },
  },
  actions: {
    async fetchPolls({ commit }) {
      const fetchedPolls = await fetchCollection('polls');
      try {
        commit('updatePolls', fetchedPolls);
      } catch (err) {
        throw err;
      }
    },
    async fetchSinglePoll({ commit }, pollId) {
      const fetchedPoll = await fetchDocument('polls', pollId);
      try {
        commit('pushPoll', fetchedPoll);
      } catch (err) {
        throw err;
      }
    },
    async addPoll({ commit }, poll) {
      const pollData = {
        ...poll,
        createdAt: getTimestamp(Date.now()),
        createdBy: getUserId(),
      };
      const pollId = await addData('polls', pollData);
      try {
        pollData.id = pollId;
        commit('pushPoll', pollData);
      } catch (error) {
        console.log(error);
      }
    },
    async updatePollState({ commit }, { pollId, newState }) {
      let activationInfo;
      switch (newState) {
        case 'active':
          activationInfo = {
            state: newState,
            activatedAt: serverTimestamp,
            activatedBy: getUserId(),
          };
          break;
        case 'closed':
          activationInfo = {
            state: newState,
            closedAt: serverTimestamp,
            closedBy: getUserId(),
          };
          break;
        default:
          activationInfo = {
            state: newState,
          };
          break;
      }

      await updateData('polls', pollId, { ...activationInfo });
      try {
        const timestamp = getTimestamp(Date.now());
        if (activationInfo.closedAt) {
          activationInfo = { ...activationInfo, closedAt: timestamp };
        } else if (activationInfo.activatedAt) {
          activationInfo = { ...activationInfo, activatedAt: timestamp };
        }
        console.log(activationInfo);
        commit('updateSinglePollState', { pollId, activationInfo });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
export default pollStore;
