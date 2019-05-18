<template>
  <div class="wrapper">
    <AddQuestion @addQuestion="addQuestionHandler"/>
    <QuestionList :questions="questions"/>
  </div>
</template>

<script>
import AddQuestion from '@/components/AddQuestion.vue';
import QuestionList from '@/components/QuestionList.vue';
import firebase from 'firebase';

export default {
  name: 'createPoll',
  components: {
    AddQuestion,
    QuestionList
  },
  data: function() {
    return {
      questions: [],
    };
  },
  methods: {
    async addQuestionHandler(value) {
      const res = await firebase
        .firestore()
        .collection('test')
        .doc()
        .set(value);
      try {
        //It seems that we cannot get the ID from the set action. So we will need to fetch the questionslist again
        console.log('success');
        this.fetchQuestions;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchQuestions() {
      this.questions = [];
      const snapshot = await firebase
        .firestore()
        .collection('test')
        .get();
      const data = snapshot.forEach(doc => {
        this.questions.push(doc.data());
      });
    },
  },
  mounted: function() {
    this.fetchQuestions();
  },
};
</script>