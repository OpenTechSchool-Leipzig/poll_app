import {
  fetchCollection,
  addData,
  deleteData,
  updateData,
  getUserId,
  getTimestamp,
} from '../firebase';

const templateStore = {
  state: {
    templates: [],
  },
  getters: {
    populatedTemplates: (state, getters, rootState) => {
      const { templates } = state;
      const { questions } = rootState.questions;
      let popTemplates = JSON.parse(JSON.stringify(templates));

      if (popTemplates.length > 0 && questions.length > 0) {
        popTemplates.forEach(template => {
          const questionObjects = questions.filter(x => template.questions.includes(x.id));
          template.questions = questionObjects;
        });
        return popTemplates;
      }
      return null;
    },
  },
  mutations: {
    updateTemplates(state, pollList) {
      state.templates = pollList;
    },
    updateSingleTemplate(state, template) {
      let updatedTemplates = state.templates.map(x => (x.id === template.id ? (x = template) : x));
      state.templates = updatedTemplates;
    },
    pushTemplate(state, template) {
      const pollList = [...state.templates, template];
      state.templates = pollList;
    },
    dropTemplate(state, pollId) {
      const filteredList = state.templates.filter(x => x.id !== pollId);
      state.templates = filteredList;
    },
  },
  actions: {
    async fetchTemplates({ commit }) {
      const fetchedTemplates = await fetchCollection('templates');
      try {
        commit('updateTemplates', fetchedTemplates);
      } catch (err) {
        throw err;
      }
    },
    async addTemplate({ commit }, template) {
      const templateData = {
        ...template,
        createdAt: getTimestamp(Date.now()),
        createdBy: getUserId(),
      };
      const pollId = await addData('templates', templateData);
      try {
        templateData.id = pollId;
        commit('pushTemplate', templateData);
      } catch (error) {
        console.log(error);
      }
    },
    async editTemplate({ commit }, template) {
      const templateData = {
        ...template,
        updatedAt: getTimestamp(Date.now()),
        updatedBy: getUserId(),
      };
      await updateData('templates', template.id, templateData);
      try {
        commit('updateSingleTemplate', templateData);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTemplate({ commit }, pollId) {
      await deleteData('templates', pollId);
      try {
        commit('dropTemplate', pollId);
      } catch {
        console.log('could not delete Data');
      }
    },
  },
};
export default templateStore;
