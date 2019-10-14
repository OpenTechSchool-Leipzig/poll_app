<template>
  <!--
    ToDo:
    - create custom input components.
    - Structure form with bulma ?
    - replace divs that are only for v-if with templates
    - make sure everything works fine on mobile devices
  -->
  <li class="question__container">
    <h3>{{ question.text }}</h3>
    <IconButton v-if="isPreview" @click="removeQuestion" name="Remove Question" />
    <form>
      <TextArea v-if="question.type === 'open'" v-model="value[qIndex].answer" />
      <div class="question__choices" v-if="question.type !== 'open'">
        <div v-if="question.options.isYesNo" class="question__yesno">
          <RadioInput name="yes" :answerValue="true" v-model="value[qIndex].answer" />
          <RadioInput name="no" :answerValue="false" v-model="value[qIndex].answer" isDanger />
        </div>
        <div
          class="question__choice"
          v-for="(choice, index) in question.options.choices"
          :key="index"
        >
          <RadioInput
            v-if="question.options.oneAnswerOnly"
            :name="choice"
            :answerValue="choice"
            v-model="value.answer"
          />
          <CheckBox v-else :name="choice" :answerValue="choice" v-model="value[qIndex].answer" />
        </div>
        <div v-if="question.options.customAnswer" class="question__choice">
          <CustomCheck v-model="value[qIndex].customAnswer" />
        </div>
        <TextArea v-if="question.options.withText" v-model="value[qIndex].text" />
      </div>
      <ScaleInput
        v-if="question.type === 'scale'"
        :options="question.options"
        v-model="value[qIndex].answer"
      />
    </form>
  </li>
</template>

<script>
import IconButton from '../basic/Buttons/IconButton.vue';
import RadioInput from '../questions/questionInputs/RadioInput.vue';
import CheckBox from '../questions/questionInputs/CheckBox.vue';
import CustomCheck from '../questions/questionInputs/CustomCheck.vue';
import ScaleInput from '../questions/questionInputs/ScaleInput.vue';
import TextArea from '../questions/questionInputs/TextArea.vue';

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
    isPreview: Boolean,
    qIndex: Number,
    value: Array, // value Prop is generate by v-model
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
  methods: {
    removeQuestion() {
      this.$emit('removeQuestion', this.question.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.question {
  &__container {
    background-color: $primary;
    border-radius: 4px;
    margin: 10px;
    padding: 20px;
  }
  h3 {
    margin-top: 0;
  }
  textarea {
    width: 90%;
    height: 100px;
    border-radius: 5px;
    resize: none;
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
  &__container {
    transition: all 0.3s;
    &.v-enter,
    &.v-leave-to {
      transform: translateX(-120%);
    }
    &.v-enter-to,
    &.v-leave {
      transform: translateX(0);
    }
    &.v-enter-active,
    &.v-leave-active,
    &.v-move {
      transition: all 0.5s ease-out;
    }
  }
}
</style>
