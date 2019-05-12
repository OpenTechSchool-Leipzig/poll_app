<template>
  <div class="questionsOverview">
    <ul>
      <li v-for="question in questions" v-bind:key="question.id">
        <h3>{{question.text}}</h3>
        <form>
          <textarea v-if="question.type==='open'"/>
          <div class="form-choices">
            <div class="answer" v-for="answer in question.answers" v-bind:key="answer">
              <input id="answer" value="answer" type="checkbox">
              <label for="answer">{{answer}}</label>
            </div>
            <div v-if="question.options.customAnswer" class="answer">
              <input id="custom-answer" type="checkbox">
              <input type="answer">
            </div>
            <textarea v-if="question.options.explanation"/>
          </div>
          <ul class="form-scala" v-if="question.type==='scale'">
            <li>{{question.options.startValue}}</li>
            <li v-for="n in parseInt(question.options.scaleSteps)" v-bind:key="n">
              <input type="radio">
            </li>
            <li>{{question.options.endValue}}</li>
          </ul>
        </form>
      </li>
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
      //create random id for testing purpose. the real ID should come from firebase
      value.id = Math.floor(Math.random() * 9000000);
      this.questions.push(value);
    }
  }
};
</script>
