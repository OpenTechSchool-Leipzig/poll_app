<template>
  <li class="question__container">
    <h3 :class="{ preview: isPreview }">
      {{ question.text }}
      <IconButton v-if="isPreview" @click="removeQuestion" name="Remove Question" isDanger />
    </h3>

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
      </div>
      <ScaleInput
        v-if="question.type === 'scale'"
        :options="question.options"
        v-model="value[qIndex].answer"
      />
      <TextArea v-if="question.options && question.options.withText" v-model="value[qIndex].text" />
    </form>
  </li>
</template>

<script>
import RadioInput from '../questions/questionInputs/RadioInput.vue';
import CheckBox from '../questions/questionInputs/CheckBox.vue';
import CustomCheck from '../questions/questionInputs/CustomCheck.vue';
import ScaleInput from '../questions/questionInputs/ScaleInput.vue';
import TextArea from '../questions/questionInputs/TextArea.vue';

export default {
  components: {
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
    background-color: $primary-light;
    border-radius: 4px;
    margin: 10px 0;
    width: 100%;
    max-width: 1000px;

    padding: 20px;
    h3 {
      margin-top: 0;
      font-size: 1.5rem;
      margin-bottom: 2rem;
      &.preview {
        display: flex;
        justify-content: space-between;
      }
    }
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
