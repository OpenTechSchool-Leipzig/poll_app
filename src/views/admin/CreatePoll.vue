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
        <DefaultButton :name="'New Question'" :isPrimary="true" @click="showAddQuestion = true" />
      </div>
    </div>
    <div class="col-right">
      <PollList
        v-show="showTemplates"
        :title="'Templates'"
        :polls="storedTemplates"
        :buttons="['select Template']"
        @selectTemplate="loadTemplateHandler"
      />

      <PollPreview
        v-show="!showTemplates"
        v-model="poll"
        :questions="selectedQuestions"
        :isPreview="true"
        :isTemplateLoaded="isTemplateLoaded"
        @removeQuestion="removeQuestionHandler"
      >
        <QuestionPreview v-show="newQuestion" :question="newQuestion" />
      </PollPreview>

      <div class="q-button__wrapper">
        <DefaultButton
          v-tooltip="'Save your new Poll'"
          v-show="poll.questions.length > 1"
          name="Create Poll"
          @click="createPollHandler"
          isPrimary
        />
        <DefaultButton
          v-tooltip="'Save your new Poll as a Template'"
          v-show="poll.questions.length > 1"
          name="Save New Template"
          @click="createTemplateHandler"
          isPrimary
        />
        <DefaultButton
          v-tooltip="'load existing Template'"
          v-show="!isTemplateLoaded"
          name="Load Template"
          @click="toggleTemplateList"
          isPrimary
        />

        <DefaultButton
          v-tooltip="'This will override the existing Template'"
          v-show="isTemplateLoaded"
          name="Update Template"
          @click="updateTemplateHandler"
          isDanger
          hasConfirmation
          confirmationText="This will override the existing Template"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddQuestion from '@/components/questions/AddQuestion.vue';
import QuestionList from '@/components/questions/QuestionList.vue';
import PollPreview from '@/components/polls/PollPreview.vue';
import PollList from '@/components/polls/PollList.vue';
import QuestionPreview from '@/components/questions/QuestionPreview.vue';
import DefaultButton from '@/components/basic/Buttons/DefaultButton.vue';

export default {
  name: 'createPoll',
  components: {
    AddQuestion,
    QuestionList,
    PollPreview,
    PollList,
    QuestionPreview,
    DefaultButton,
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
    selectedQuestions() {
      if (this.storedQuestions && this.storedQuestions.length > 0) {
        let questionObjects = this.storedQuestions.filter(x => this.poll.questions.includes(x.id));
        return questionObjects;
      }
      return [];
    },
    storedQuestions() {
      return this.$store.getters.populatedQuestions;
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
      const pollData = this.poll;
      let errorMsg;
      if (!pollData.title) {
        errorMsg = 'Please enter a poll title';
      } else if (!pollData.date) {
        errorMsg = 'Please choose a workshop date';
      } else if (!pollData.questions) {
        errorMsg = 'Please add at least one question';
      } else {
        pollData.state = 'draft';
        this.$store.dispatch('addPoll', pollData);
        try {
          this.$store.dispatch('addNotification', {
            title: 'Success',
            message: 'Successfully saved Poll "' + pollData.title + '"',
            type: 'success',
          });

          this.poll = {
            title: null,
            date: null,
            questions: [],
          };
        } catch (error) {
          this.$store.dispatch('addNotification', {
            title: 'Error',
            message: error,
            type: 'danger',
          });
        }
      }
      if (errorMsg) {
        this.$store.dispatch('addNotification', {
          title: 'Error',
          message: errorMsg,
          type: 'danger',
        });
      }
    },
    async createTemplateHandler() {
      //replace console logs with notifications
      const pollData = this.poll;
      if (pollData.title && pollData.questions) {
        this.$store.dispatch('addTemplate', pollData);
        try {
          console.log('success: saved Template "' + pollData.title + '"');
        } catch (error) {
          this.$store.dispatch('addNotification', {
            title: 'Error',
            message: error,
            type: 'danger',
          });
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
    async updateTemplateHandler() {
      //check if changes are made
      await this.$store.dispatch('editTemplate', this.poll);
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
    if (this.$store.state.user.userList.length < 1) {
      this.$store.dispatch('fetchUsers');
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
.q-button {
  &__wrapper {
    width: 100%;
    position: relative;
    top: -60px;
  }
}
</style>
