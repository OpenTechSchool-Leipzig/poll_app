<template>
  <SectionContainer title="New Question" isBright>
    <form>
      <InputUnit v-model="newQuestion.text" :name="'Question Text'" />
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
          <div class="form-check" v-if="!newQuestion.options.isYesNo">
            <input type="checkbox" id="oneansweronly" v-model="newQuestion.options.oneAnswerOnly" />
            <label for="oneansweronly">Allow only one answer</label>
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
        <div v-if="!newQuestion.options.isYesNo" class="form-input">
          <InputUnit name="Answer Options">
            <template slot="addon">
              <IconButton @click="addChoice" name="add answer" isAddon isPrimary />
            </template>
          </InputUnit>
        </div>
        <ul class="choice-list">
          <li
            v-for="choice in newQuestion.options.choices"
            :key="newQuestion.options.choices.indexOf(choice)"
          >
            {{ choice }}
            <IconButton
              @click="removeChoice(newQuestion.options.choices.indexOf(choice))"
              name="remove answer"
            />
          </li>
        </ul>
      </div>
      <div class="form-div" v-if="newQuestion.type === 'scale'">
        <InputUnit v-model="newQuestion.options.startValue" :name="'Start Value'" />
        <InputUnit v-model="newQuestion.options.endValue" :name="'End Value'" />
        <InputUnit
          v-model="newQuestion.options.scaleSteps"
          :name="'Number of Steps'"
          type="number"
          min="3"
          max="9"
        />
        <input type="checkbox" id="explanation" v-model="newQuestion.options.withText" />
        <label for="explanation">add textfield for explanation</label>
      </div>
    </form>
    <template slot="controls">
      <DefaultButton :name="'Add Question'" isPrimary @click="emitQuestion" />
      <DefaultButton name="Close" isDanger @click="$emit('close')" />
    </template>
  </SectionContainer>
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
          oneAnswerOnly: false,
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
      let errorMsg;
      if (!this.newQuestion.text || this.newQuestion.text.length < 4) {
        errorMsg = 'Invalid input: Question text has to be longer than 3 symbols';
      } else if (!this.newQuestion.type) {
        errorMsg = 'Please choose a question type';
      } else {
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
            delete value.options.customAnswer;
            delete value.options.isYesNo;
            delete value.options.choices;
            delete value.options.oneAnswerOnly;
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
        // reset the reference for question preview
        this.$emit('newQuestion', null);
      }
      if (errorMsg) {
        this.$store.dispatch('addNotification', {
          title: 'Error',
          message: errorMsg,
          type: 'danger',
        });
      }
    },
    emitObject() {
      // emit question Object for question preview
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
.form-input {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  input,
  select {
    padding: 0.5rem;
    border-radius: 0.3rem;
    border: 1px inset #42b983;
  }
}
.form-div {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;
}
</style>
