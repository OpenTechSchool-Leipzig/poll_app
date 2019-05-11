<template>
  <div class="questionsOverview">
    <ul>
      <li v-for="question in questions" v-bind:key="question.id">{{question.text}}</li>
    </ul>
    <AddQuestion @addQuestion="addQuestionHandler"/>
  </div>
</template>

<script>
import AddQuestion from "@/components/AddQuestion.vue";
export default {
  name: "questionsOverview",
  components: {
    AddQuestion
  },
  data: function() {
    return {
      questions: []
    };
  },
  methods: {
    addQuestionHandler(value) {
      //The way I set this up created an weird error: all objects in the questions array are somehow connected to the child-input!
      let addedQuestion = value;
      addedQuestion.id = Math.floor(Math.random() * 9000000);
      console.log(addedQuestion);
      this.questions.push(addedQuestion);
    }
  }
};
</script>
