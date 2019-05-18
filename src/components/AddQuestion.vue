<template>
  <form>
    <div class="form-input">
      <label>Question Text</label>
      <input type="text" v-model="newQuestion.text">
    </div>
    <div class="form-input">
      <label>Question Type</label>
      <select type="type" v-model="newQuestion.type">
        <option disabled value>Select question type</option>
        <option value="open">Open question</option>
        <option value="choice">Multiple choice</option>
        <option value="scale">Scale Question</option>
      </select>
    </div>
    <div class="form-div" v-if="newQuestion.type === 'choice'">
      <div class="form-checkbox">
        <input type="checkbox" id="explanation" v-model="newQuestion.options.isYesNo">
        <label for="explanation">Yes/No Question</label>
        <input type="checkbox" id="explanation" v-model="newQuestion.options.withText">
        <label for="explanation">add textfield for explanation</label>
        <input type="checkbox" id="customanswer" v-model="newQuestion.options.customAnswer">
        <label for="customanswer">allow user to add answer</label>
      </div>
      <div class="form-input">
        <input v-if="!newQuestion.options.isYesNo" type="answers" v-model="answerInput">
        <button @click.prevent="newQuestion.options.choices.push(answerInput)">add answer</button>
      </div>
    </div>
    <div class="form-div" v-if="newQuestion.type === 'scale'">
      <label>Start Value</label>
      <input type="text" v-model="newQuestion.options.startValue">
      <label>End Value</label>
      <input type="text" v-model="newQuestion.options.endValue">
      <label>Number of Steps</label>
      <input type="number" min="3" max="9" v-model="newQuestion.options.scaleSteps">
    </div>
    <button @click.prevent="emitQuestion">Add Question</button>
  </form>
</template>

<script>
export default {
  name: 'AddQuestion',
  data: function() {
    return {
      newQuestion: {
        text: null,
        type: null,
        options: {
          withText: false,
          customAnswer: false,
          isYesNo: false,
          choices: [],
          startValue: 'Totally Agree',
          endValue: 'Totally Disagree',
          scaleSteps: '5',
        },
      },
      answerInput: null,
    };
  },
  methods: {
    emitQuestion() {
      let value = JSON.parse(JSON.stringify(this.newQuestion));
      this.$emit('addQuestion', value);
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

input,
select {
  padding: 0.5rem;
  border-radius: 0.3rem;
  border: 1px inset #42b983;
}
.form-input {
  width: 90%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.form-div {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>