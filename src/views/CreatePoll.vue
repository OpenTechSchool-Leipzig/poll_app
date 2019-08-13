<template>
  <div class="wrapper">
    <div class="col-left">
      <AddQuestion
        v-show="showAddQuestion"
        @addQuestion="addQuestionHandler"
        @close="closeAddQuestionHandler"
        @newQuestion="updateQuestionPreviewHandler"
      />
      <QuestionList
        v-show="!showAddQuestion"
        :questions="storedQuestions"
        :selectedQuestions="poll.questions"
        @selectQuestion="selectQuestionHandler"
      />
      <div v-show="!showAddQuestion" class="q-button__wrapper">
        <button class="q-button" @click="showAddQuestion=true">New Question</button>
      </div>
    </div>
    <div class="col-right">
      <PollList
        v-show="showTemplates"
        :title="'Templates'"
        :polls="storedTemplates"
        @selectPoll="loadTemplateHandler"
      />
      <div v-show="!showTemplates" class="poll-preview">
        <header>
          <h2>Poll Preview</h2>
        </header>
        <form class="poll-preview__title">
          <input
            class="poll-preview__input poll-preview__input--title"
            :class="{'poll-preview__input--highlight': isTemplateLoaded}"
            type="text"
            v-model="poll.title"
            placeholder="Poll Title"
          />
          <input
            class="poll-preview__input poll-preview__input--date"
            :class="{'poll-preview__input--highlight': isTemplateLoaded}"
            type="date"
            v-model="poll.date"
          />
        </form>
        <QuestionPreview v-show="newQuestion" :question="newQuestion" />
        <PollPreview :questions="selectedQuestions" @removeQuestion="removeQuestionHandler" />
      </div>
      <div class="q-button__wrapper">
        <button
          v-show="poll.questions.length > 1"
          class="q-button"
          @click="createPollHandler"
        >Create Poll</button>
        <button
          v-show="poll.questions.length > 1"
          class="q-button"
          @click="createTemplateHandler"
        >Save New Template</button>
        <button
          v-show="!isTemplateLoaded"
          class="q-button"
          @click="toggleTemplateList"
        >Load Template</button>
        <button
          v-show="isTemplateLoaded"
          class="q-button"
          @click="updateTemplateHandler"
        >Update Template</button>
      </div>
    </div>
  </div>
</template>

<script>
import AddQuestion from '@/components/AddQuestion.vue';
import QuestionList from '@/components/QuestionList.vue';
import PollPreview from '@/components/PollPreview.vue';
import PollList from '@/components/PollList.vue';
import QuestionPreview from '@/components/QuestionPreview.vue';
import firebase from 'firebase';

export default {
  name: 'createPoll',
  components: {
    AddQuestion,
    QuestionList,
    PollPreview,
    PollList,
    QuestionPreview,
  },
  data: function() {
    return {
      newQuestion: null, //object for QuestionPreview
      showAddQuestion: false,
      showTemplates: false,
      isTemplateLoaded: false,
      poll: {
        title: null,
        date: null,
        questions: [],
      },
    };
  },
  computed: {
    selectedQuestions: function() {
      let questionObjects = this.storedQuestions.filter(x => this.poll.questions.includes(x.id));
      return questionObjects;
    },
    storedQuestions() {
      return this.$store.state.questions.questions;
    },
    storedTemplates() {
      return this.$store.getters.populatedTemplates;
    },
    templatesIdOnly() {
      return this.$store.state.templates.templates;
    },
  },
  methods: {
    updateQuestionPreviewHandler(payload) {
      this.newQuestion = payload;
    },
    selectQuestionHandler(id) {
      this.poll.questions.push(id);
    },
    removeQuestionHandler(id) {
      let prevSelection = this.poll.questions;
      this.poll.questions = prevSelection.filter(x => x !== id);
    },
    closeAddQuestionHandler() {
      this.showAddQuestion = false;
      this.newQuestion = null;
    },
    toggleTemplateList() {
      this.showTemplates = !this.showTemplates;
    },
    async addQuestionHandler(question) {
      const addedQuestionId = await this.$store.dispatch('addQuestion', question);
      try {
        //Add new question to current poll
        this.poll.questions.push(addedQuestionId);
        this.closeAddQuestionHandler();
      } catch (error) {
        console.log(error);
      }
    },
    async createPollHandler() {
      //replace console logs with notifications
      const pollData = this.poll;
      if (pollData.title && pollData.date && pollData.questions) {
        const res = this.$store.dispatch('addPoll', pollData);
        try {
          console.log('success: saved Poll "' + pollData.title + '"');
          this.poll = {
            title: null,
            date: null,
            questions: [],
          };
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error('enter valid Data!');
      }
    },
    async createTemplateHandler() {
      //replace console logs with notifications
      const pollData = this.poll;
      if (pollData.title && pollData.questions) {
        const res = this.$store.dispatch('addTemplate', pollData);
        try {
          console.log('success: saved Template "' + pollData.title + '"');
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error('enter valid Data!');
      }
    },
    loadTemplateHandler(id) {
      const selectedTemplate = this.templatesIdOnly.find(x => x.id === id);
      this.poll = selectedTemplate;
      this.isTemplateLoaded = true;
      this.showTemplates = false;
    },
    updateTemplateHandler() {
      //check if changes are made
      const res = this.$store.dispatch('editTemplate', this.poll);
      try {
        console.log('success: update Template "' + this.poll.title + '"');
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted: function() {
    if (this.$store.state.questions.questions.length < 1) {
      this.$store.dispatch('fetchQuestions');
    }
    if (this.$store.state.templates.templates.length < 1) {
      this.$store.dispatch('fetchTemplates');
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.col-left {
  width: 33%;
  min-width: 250px;
  max-width: 400px;
  min-height: calc(100vh - 40px);
}
.col-right {
  width: 64%;
}
header {
  @include section-header;
}
.poll-preview {
  width: 100%;
  height: 100%;
  background-color: $primary-dark;
  &__title {
    display: flex;
    justify-content: space-between;
    background-color: $primary-light;
    margin: 10px;
    padding: 20px;
  }
  &__input {
    border: none;
    background-color: transparent;
    font-size: 1.17em;
    color: #2c3e50;
    &--title {
      width: 70%;
    }
    &--date {
      text-align: right;
    }
    &--highlight {
      background-color: rgba(yellow, 0.7);
    }
  }
}
.q-button {
  @include btn-primary;
  margin: auto;

  &__wrapper {
    width: 100%;
    position: relative;
    top: -60px;
  }
}
</style>
