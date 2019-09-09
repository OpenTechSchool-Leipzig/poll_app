<template>
  <form>
    <header>
      <h2>New Question</h2>
      <button @click.prevent="$emit('close')">close</button>
    </header>
    <div class="form-input">
      <label>Question Text</label>
      <input type="text" v-model="newQuestion.text" />
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
      <div class="form-checkboxes">
        <div class="form-check">
          <input type="checkbox" id="yesno" v-model="newQuestion.options.isYesNo" />
          <label for="yesno">Yes/No Question</label>
        </div>
        <div class="form-check">
          <input type="checkbox" id="explanation" v-model="newQuestion.options.withText" />
          <label for="explanation">add textfield for explanation</label>
        </div>
        <div class="form-check" v-if="!newQuestion.options.isYesNo">
          <input type="checkbox" id="customanswer" v-model="newQuestion.options.customAnswer" />
          <label for="customanswer">allow user to add answer</label>
        </div>
      </div>
      <div class="form-input">
        <input v-if="!newQuestion.options.isYesNo" type="choices" v-model="answerInput" />
        <button @click.prevent="addChoice">add answer</button>
      </div>
      <ul class="choice-list">
        <li
          v-for="choice in newQuestion.options.choices"
          :key="newQuestion.options.choices.indexOf(choice)"
        >
          {{ choice }}
          <button @click.prevent="removeChoice(newQuestion.options.choices.indexOf(choice))">
            remove
          </button>
        </li>
      </ul>
    </div>
    <div class="form-div" v-if="newQuestion.type === 'scale'">
      <label>Start Value</label>
      <input type="text" v-model="newQuestion.options.startValue" />
      <label>End Value</label>
      <input type="text" v-model="newQuestion.options.endValue" />
      <label>Number of Steps</label>
      <input type="number" min="3" max="9" v-model="newQuestion.options.scaleSteps" />
    </div>
    <button class="submit-btn" @click.prevent="emitQuestion">Add Question</button>
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
  updated() {
    this.emitObject();
  },
  methods: {
    emitQuestion() {
      let value = JSON.parse(JSON.stringify(this.newQuestion));
      //v-model overwrites all values. So we have to define default options in the object
      //and therefore need to clean unneccasary options on emit
      switch (value.type) {
        case 'open':
          delete value.options;
          break;
        case 'choice':
          delete value.options.startValue;
          delete value.options.endValue;
          delete value.options.scaleSteps;
          break;
        case 'scale':
          delete value.options.withText;
          delete value.options.customAnswer;
          delete value.options.isYesNo;
          delete value.options.choices;
          break;
      }
      this.$emit('addQuestion', value);
      this.newQuestion = {
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
      };
      this.$emit('newQuestion', null);
    },
    emitObject() {
      this.$emit('newQuestion', this.newQuestion);
    },
    addChoice() {
      this.newQuestion.options.choices.push(this.answerInput);
      this.answerInput = '';
    },
    removeChoice(n) {
      this.newQuestion.options.choices.splice(n, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  height: calc(100%);
  z-index: 1000;
  background-color: $primary-light;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
header {
  @include section-header;
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
  margin-bottom: 10px;
}
.submit-btn {
  @include btn-primary;
}
</style>
