<template>
  <div class="q-preview">
    <form v-if="question">
      <input class="q-preview__title" v-model="question.text" />
      <TextArea v-if="question.type === 'open'" />
      <div class="q-preview__choices" v-if="question.type !== 'open'">
        <div v-if="question.options.isYesNo">
          <div class="q-preview__yesno">
            <RadioInput name="yes" />
            <RadioInput name="no" />
          </div>
        </div>
        <div class="q-preview__choice" v-for="choice in question.options.choices" :key="choice">
          <RadioInput v-if="question.options.oneAnswerOnly" :name="choice" />
          <CheckBox v-else :name="choice" />
          <IconButton
            @click="removeChoice(question.options.choices.indexOf(choice))"
            name="Remove Answer Option"
          />
        </div>
        <div v-if="question.options.customAnswer" class="poll-preview__choice">
          <CustomCheck />
        </div>
        <TextArea v-if="question.options.withText" />
      </div>
      <ScaleInput
        v-if="question.type === 'scale'"
        :options="question.options"
        v-model="value[qIndex].answer"
      />
    </form>
  </div>
</template>

<script>
import IconButton from '../basic/Buttons/IconButton.vue';
import RadioInput from './questionInputs/RadioInput.vue';
import CheckBox from './questionInputs/CheckBox.vue';
import CustomCheck from './questionInputs/CustomCheck.vue';
import ScaleInput from './questionInputs/ScaleInput.vue';
import TextArea from './questionInputs/TextArea.vue';

export default {
  components: {
    IconButton,
    RadioInput,
    CheckBox,
    CustomCheck,
    ScaleInput,
    TextArea,
  },
  props: {
    question: Object,
  },
  methods: {
    removeChoice(n) {
      this.question.options.choices.splice(n, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.q-preview {
  background-color: white;
  border: 1px solid $primary;
  border-radius: 5px;
  margin: 10px;
  padding: 20px;

  &__title {
    font-size: 1.5rem;
    border: none;
    background: transparent;
    width: 100%;
  }
  &__choices {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  &__choice {
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
}
</style>
