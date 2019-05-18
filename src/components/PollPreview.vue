<template>
  <div class="poll-preview">
    <ul>
      <li v-for="question in selectedQuestions" v-bind:key="question.id">
        <h3>{{question.text}}</h3>
        <form>
          <textarea v-if="question.type==='open'"/>
          <div class="form-choices" v-if="question.type!=='open'">
            <div v-if="question.options.isYesNo">
              <div class="choice">
                <input id="yes" type="checkbox" value="true">
                <label for="yes">Yes</label>
                <input id="no" type="checkbox" value="false">
                <label for="no">No</label>
              </div>
            </div>
            <div class="choice" v-for="choice in question.options.choices" v-bind:key="choice">
              <input id="choice" type="checkbox">
              <label for="answer">{{choice}}</label>
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
  </div>
</template>

<script>
export default {
  props: {
    selectedQuestions: Array,
  },
};
</script>
