import { cloneDeep } from 'lodash';
import {
  fetchCollection,
  fetchDocument,
  addData,
  updateData,
  serverTimestamp,
  getUserId,
  getTimestamp,
} from '../../utility/firebase';

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
      const questions = getters.populatedQuestions;
      const { userList } = rootState.user;
      const { answers } = rootState.answers;

      let popPolls = cloneDeep(polls);

      if (popPolls.length > 0 && questions && questions.length > 0 && userList.length > 0) {
        popPolls.forEach(poll => {
          let questionObjects = questions.filter(x => poll.questions.includes(x.id));
          // this population setup might be highly inefficient for bigger amounts of data. => this could be better done by the backend I guess
          if (answers.length > 0) {
            const answerData = answers.find(answer => answer.id === poll.id);
            if (answerData) {
              questionObjects = questionObjects.map(question => {
                let questionAnswers = [];
                let questionComments = [];
                answerData.userAnswers.forEach(ans => {
                  const answerValues = Object.values(ans);
                  const answerPerQuestion = answerValues.find(
                    val => val.questionId === question.id
                  );
                  // add custom answers to array
                  // TODO: handle customAnswer with only one answer allowed (right now there is no inputUnit for custom radio)
                  let mergedAnswer = answerPerQuestion.answer;
                  if (answerPerQuestion.customAnswer) {
                    mergedAnswer.push('*' + answerPerQuestion.customAnswer);
                  }
                  questionAnswers.push(mergedAnswer);
                  // add comments if available
                  if (answerPerQuestion.text) {
                    questionComments.push(answerPerQuestion.text);
                  }
                });
                return { ...question, answers: questionAnswers, comments: questionComments };
              });
              poll.latestAnswer = answerData.updatedAt;
            }
          }
          poll.questions = questionObjects;
          poll.createdBy = userList.find(x => x.id === poll.createdBy);
          poll.activatedBy = userList.find(x => x.id === poll.activatedBy);
          poll.closedBy = userList.find(x => x.id === poll.closedBy);
        });
        return popPolls;
      }
      return null;
    },
    answeredPolls: (state, getters) => {
      if (getters.populatedPolls && getters.populatedPolls.length > 0) {
        return getters.populatedPolls.filter(poll =>
          poll.questions.some(q => q.answers && q.answers.length > 0)
        );
      }
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
      try {
        const fetchedPolls = await fetchCollection('polls');

        commit('updatePolls', fetchedPolls);
      } catch (err) {
        throw err;
      }
    },
    async fetchSinglePoll({ commit }, pollId) {
      try {
        const fetchedPoll = await fetchDocument('polls', pollId);

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
      try {
        const pollId = await addData('polls', pollData);

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
      try {
        await updateData('polls', pollId, { ...activationInfo });
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
