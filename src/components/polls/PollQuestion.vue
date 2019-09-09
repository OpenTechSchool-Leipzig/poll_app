<template>
  <li class="question__container">
    <h3>{{ question.text }}</h3>
    <button v-if="isPreview" @click="removeQuestion">REMOVE</button>
    <form>
      <textarea v-if="question.type === 'open'" />
      <div class="question__choices" v-if="question.type !== 'open'">
        <div v-if="question.options.isYesNo">
          <div class="question__yesno">
            <input id="yes" type="radio" :value="true" v-model="value[qIndex].answer" />
            <label for="yes">Yes</label>
            <input id="no" type="radio" :value="false" v-model="value[qIndex].answer" />
            <label for="no">No</label>
          </div>
        </div>
        <div
          class="question__choice"
          v-for="(choice, index) in question.options.choices"
          :key="index"
        >
          <input :id="choice" type="checkbox" :value="choice" v-model="value[qIndex].answer" />
          <label :for="choice">{{ choice }}</label>
        </div>
        <div v-if="question.options.customAnswer" class="question__choice">
          <input id="custom-answer" type="checkbox" :checked="value[qIndex].customAnswer" />
          <input type="text" v-model="value[qIndex].customAnswer" />
        </div>
        <textarea v-if="question.options.withText" v-model="value[qIndex].text" />
      </div>
      <ul class="question__scale" v-if="question.type === 'scale'">
        <li>{{ question.options.startValue }}</li>
        <input
          type="radio"
          :value="n"
          v-model="value[qIndex].answer"
          v-for="n in parseInt(question.options.scaleSteps)"
          :key="n"
        />
        <li>{{ question.options.endValue }}</li>
      </ul>
    </form>
  </li>
</template>

<script>
export default {
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
      this.$parent.$emit('removeQuestion', this.question.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.question {
  &__container {
    background-color: $primary-light;
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
  &__scale {
    display: flex;
    justify-content: center;
    list-style-type: none;
  }
}
</style>
