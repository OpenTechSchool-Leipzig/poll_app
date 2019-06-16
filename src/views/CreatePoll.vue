<template>
  <div class="wrapper">
    <div class="col-left">
      <AddQuestion
        v-show="showAddQuestion"
        @addQuestion="addQuestionHandler"
        @close="showAddQuestion=false"
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
      <PollPreview :questions="selectedQuestions" @removeQuestion="removeQuestionHandler"/>
    </div>
  </div>
</template>

<script>
import AddQuestion from '@/components/AddQuestion.vue';
import QuestionList from '@/components/QuestionList.vue';
import PollPreview from '@/components/PollPreview.vue';
import firebase from 'firebase';

export default {
  name: 'createPoll',
  components: {
    AddQuestion,
    QuestionList,
    PollPreview,
  },
  data: function() {
    return {
      showAddQuestion: false,
      poll: {
        title: null,
        date: null,
        questions: [],
      },
      questionList: [
        {
          id: 1,
          text: 'A Simple Open Question: Why do you hate polls?',
          type: 'open',
        },
        {
          id: 2,
          text: 'What do you think of Muliple Choice Questions?',
          type: 'choice',
          options: {
            customAnswer: true,
            isYesNo: false,
            choices: [
              'They are boring',
              'They are good to evaluate',
              'I like them',
              'Do they bring beer?',
            ],
          },
        },
        {
          id: 3,
          text:
            'I am a little longer Question...maybe a little to long! So What do you think?',
          type: 'scale',
          options: {
            startValue: 'Totally Agree',
            endValue: 'Totally Disagree',
            scaleSteps: '5',
          },
        },
        {
          id: 4,
          text: 'Yes or No?',
          type: 'choice',
          options: {
            customAnswer: false,
            isYesNo: true,
            choices: [],
          },
        },
      ],
    };
  },
  computed: {
    selectedQuestions: function() {
      let questionObjects = this.questionList.filter(x =>
        this.poll.questions.includes(x.id)
      );
      console.log(questionObjects);
      return questionObjects;
    },
  },
  methods: {
    selectQuestionHandler(id) {
      this.poll.questions.push(id);
    },
    removeQuestionHandler(id) {
      let prevSelection = this.poll.questions;
      this.poll.questions = prevSelection.filter(x => x !== id);
    },
    async addQuestionHandler(value) {
      const res = await firebase
        .firestore()
        .collection('test')
        .doc()
        .set(value);
      try {
        //It seems that we cannot get the ID from the set action. So we will need to fetch the questionslist again
        console.log('success');
        this.fetchQuestions();
      } catch (error) {
        console.log(error);
      }
    },
    async fetchQuestions() {
      /* this.questionList = []; */
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
  justify-content: space-between;
}
.col-left {
  width: 33%;
  min-width: 250px;
  max-width: 400px;
  min-height: calc(100vh - 40px);
}
.col-right {
  width: 60%;
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
