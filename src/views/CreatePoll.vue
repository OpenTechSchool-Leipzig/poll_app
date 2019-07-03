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
        :questions="questionList"
        :selectedQuestions="poll.questions"
        @selectQuestion="selectQuestionHandler"
      />
      <div v-show="!showAddQuestion" class="q-button__wrapper">
        <button class="q-button" @click="showAddQuestion=true">New Question</button>
      </div>
    </div>
    <div class="col-right">
      <div class="poll-preview">
        <header>
          <h2>Poll Preview</h2>
        </header>
        <form class="poll-preview__title">
          <input
            class="poll-preview__input poll-preview__input--title"
            type="text"
            v-model="poll.title"
            placeholder="Poll Title"
          />
          <input
            class="poll-preview__input poll-preview__input--date"
            type="date"
            v-model="poll.date"
          />
        </form>
        <QuestionPreview v-show="newQuestion" :question="newQuestion" />
        <PollPreview :questions="selectedQuestions" @removeQuestion="removeQuestionHandler" />
        <div v-show="poll.questions.length > 1" class="q-button__wrapper">
          <button class="q-button" @click="createPollHandler">Create Poll</button>
          <button class="q-button">Save Template</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddQuestion from '@/components/AddQuestion.vue';
import QuestionList from '@/components/QuestionList.vue';
import PollPreview from '@/components/PollPreview.vue';
import QuestionPreview from '@/components/QuestionPreview.vue';
import firebase from 'firebase';

export default {
  name: 'createPoll',
  components: {
    AddQuestion,
    QuestionList,
    PollPreview,
    QuestionPreview,
  },
  data: function() {
    return {
      newQuestion: null,
      showAddQuestion: false,
      poll: {
        title: null,
        date: null,
        questions: [],
      },
      questionList: [],
    };
  },
  computed: {
    selectedQuestions: function() {
      let questionObjects = this.questionList.filter(x =>
        this.poll.questions.includes(x.id)
      );
      return questionObjects;
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
    async addQuestionHandler(value) {
      const res = await firebase
        .firestore()
        .collection('test')
        .add(value);
      try {
        value.id = res.id;
        //Add new question to QuestionLits
        this.questionList.push(value);
        //Add new question to current poll
        this.poll.questions.push(value.id);
        this.closeAddQuestionHandler;
      } catch (error) {
        console.log(error);
      }
    },
    async createPollHandler() {
      const pollData = this.poll;
      if (pollData.title && pollData.date && pollData.questions) {
        const res = await firebase
          .firestore()
          .collection('polls')
          .add(pollData);
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
    async fetchQuestions() {
      this.questionList = [];
      const snapshot = await firebase
        .firestore()
        .collection('test')
        .get();
      const fetchedData = snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        this.questionList.push(data);
      });
    },
  },
  mounted: function() {
    this.fetchQuestions();
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
