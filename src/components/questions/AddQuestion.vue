<template>
  <!-- ToDo: split content in 3 components: Open, MC, Scale -->
  <SectionContainer title="New Question" isBright>
    <form>
      <InputUnit v-model="newQuestion.text" name="Question Text" />
      <div class="form-input">
        <SelectUnit v-model="newQuestion.type" name="Question Type">
          <option disabled value>Select question type</option>
          <option value="open">Open question</option>
          <option value="choice">Multiple choice</option>
          <option value="scale">Scale Question</option>
        </SelectUnit>
      </div>
      <template v-if="newQuestion.type === 'choice'">
        <CheckboxUnit
          name="Yes/No Question"
          v-model="newQuestion.options.isYesNo"
          title="Multiple Choice Options"
        >
          <template slot="group">
            <CheckboxElement
              name="Allow only one answer"
              v-model="newQuestion.options.oneAnswerOnly"
              v-if="!newQuestion.options.isYesNo"
            />
            <CheckboxElement
              name="Add textfield for explanation"
              v-model="newQuestion.options.withText"
            />
            <CheckboxElement
              name="Allow user to add answer"
              v-model="newQuestion.options.customAnswer"
              v-if="!newQuestion.options.isYesNo"
            />
          </template>
        </CheckboxUnit>
        <InputUnit name="Answer Options" v-model="answerInput" v-if="!newQuestion.options.isYesNo">
          <template slot="addon">
            <IconButton
              @click="addChoice"
              name="add answer"
              isAddon
              isPrimary
              :disabled="this.answerInput.length === 0"
            />
          </template>
        </InputUnit>
        <ul class="choice-list">
          <li
            v-for="choice in newQuestion.options.choices"
            :key="newQuestion.options.choices.indexOf(choice)"
          >
            {{ choice }}
            <IconButton
              isDanger
              @click="removeChoice(newQuestion.options.choices.indexOf(choice))"
              name="remove answer"
            />
          </li>
        </ul>
      </template>
      <div class="form-div" v-if="newQuestion.type === 'scale'">
        <InputUnit v-model="newQuestion.options.startValue" :name="'Start Value'" />
        <InputUnit v-model="newQuestion.options.endValue" :name="'End Value'" />
        <InputUnit
          v-model="newQuestion.options.scaleSteps"
          :name="'Number of Steps'"
          type="number"
          :min="scaleMin"
          :max="scaleMax"
        />
        <CheckboxUnit name="Add textfield for explanation" v-model="newQuestion.options.withText" />
      </div>
    </form>
    <template slot="controls">
      <div
        class="button-wrapper"
        v-tooltip="{ content: missingInput, trigger: 'hover click', html: true }"
      >
        <DefaultButton
          :name="'Add Question'"
          isPrimary
          @click="emitQuestion"
          :isDisabled="!!missingInput"
        />
      </div>
      <DefaultButton name="Close" isDanger @click="$emit('close')" />
    </template>
  </SectionContainer>
</template>

<script>
export default {
  name: 'AddQuestion',
  props: {
    minLength: {
      type: Number,
      default: 5,
    },
    scaleMin: {
      type: Number,
      default: 3,
    },
    scaleMax: {
      type: Number,
      default: 9,
    },
  },
  data: function() {
    return {
      newQuestion: {
        text: '',
        type: '',
        options: {
          withText: false,
          customAnswer: false,
          isYesNo: false,
          oneAnswerOnly: false,
          choices: [],
          startValue: 'Totally Agree',
          endValue: 'Totally Disagree',
          scaleSteps: 5,
        },
      },
      answerInput: '',
    };
  },
  computed: {
    missingInput() {
      if (!this.newQuestion) {
        return null;
      }
      const { type, text, options } = this.newQuestion;
      let missing = [];
      if (text.length <= this.minLength) {
        missing.push(`Question text has to be longer than ${this.minLength - 1} symbols!`);
      }
      if (!type) {
        missing.push('Please choose a question type!');
      } else {
        switch (type) {
          case 'open':
            break;
          case 'choice':
            if (
              !options.isYesNo &&
              (options.choices.length < 2 || (options.customAnswer && options.choices.length < 1))
            ) {
              missing.push('Multiple Choice Questions require at least 2 answer options!');
            }
            break;
          case 'scale':
            if (options.scaleSteps < this.scaleMin) {
              missing.push(`Scale Steps can't be less than ${this.scaleMin}!`);
            } else if (options.scaleSteps > this.scaleMax) {
              missing.push(`Scale Steps can't be more than ${this.scaleMax}!`);
            }
        }
      }
      if (missing.length === 0) {
        return null;
      } else {
        return missing.join('<br> ');
      }
    },
  },
  methods: {
    emitQuestion() {
      if (this.missingInput) {
        this.$store.dispatch('addNotification', {
          title: 'Error',
          message: this.missingInput,
          type: 'danger',
        });
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
        // restore initial state after emit => there might be a more elegant way I guess!
        this.newQuestion = {
          text: '',
          type: '',
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
    },
    emitObject() {
      // emit question Object for question preview
      this.$emit('newQuestion', this.newQuestion);
    },
    addChoice() {
      if (this.answerInput.length === 0) {
        this.$store.dispatch('addNotification', {
          title: "Answer Option can't be empty",
          message: 'Please enter some text before you add an answer',
          type: 'danger',
        });
        return;
      }
      this.newQuestion.options.choices.push(this.answerInput);
      this.answerInput = '';
    },
    removeChoice(n) {
      this.newQuestion.options.choices.splice(n, 1);
    },
  },
  updated() {
    this.emitObject();
  },
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  display: inline-block;
  margin-right: 6px;
}
.form-input {
  width: 100%;
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
</style>
