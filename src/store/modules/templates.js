import { cloneDeep } from 'lodash';
import {
  fetchCollection,
  addData,
  deleteData,
  updateData,
  getUserId,
  getTimestamp,
} from '../../utility/firebase';

const templateStore = {
  state: {
    templates: [],
  },
  getters: {
    populatedTemplates: (state, getters, rootState) => {
      const { templates } = state;
      const { questions } = rootState.questions;
      const { userList } = rootState.user;
      let popTemplates = cloneDeep(templates);

      if (popTemplates.length > 0 && questions.length > 0 && userList.length > 0) {
        popTemplates.forEach(template => {
          const questionObjects = questions.filter(x => template.questions.includes(x.id));
          template.questions = questionObjects;
          template.createdBy = userList.find(x => x.id === template.createdBy);
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
      try {
        const fetchedTemplates = await fetchCollection('templates');
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
      try {
        const pollId = await addData('templates', templateData);
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
      try {
        await updateData('templates', template.id, templateData);

        commit('updateSingleTemplate', templateData);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTemplate({ commit }, pollId) {
      try {
        await deleteData('templates', pollId);
        commit('dropTemplate', pollId);
      } catch {
        console.log('could not delete Data');
      }
    },
  },
};
export default templateStore;
