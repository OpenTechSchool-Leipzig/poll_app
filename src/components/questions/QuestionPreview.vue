<template>
  <div class="q-preview">
    <form v-if="question">
      <input class="q-preview__title" v-model="question.text" />
      <textarea v-if="question.type === 'open'" />
      <div class="q-preview__choices" v-if="question.type !== 'open'">
        <div v-if="question.options.isYesNo">
          <div class="q-preview__yesno">
            <input id="yes" type="radio" value="true" />
            <label for="yes">Yes</label>
            <input id="no" type="radio" value="false" />
            <label for="no">No</label>
          </div>
        </div>
        <div class="q-preview__choice" v-for="choice in question.options.choices" :key="choice">
          <input id="choice" type="checkbox" />
          <label for="choice">{{ choice }}</label>
          <button @click.prevent="removeChoice(question.options.choices.indexOf(choice))">
            remove
          </button>
        </div>
        <div v-if="question.options.customAnswer" class="poll-preview__choice">
          <input id="custom-answer" type="checkbox" />
          <input type="answer" />
        </div>
        <textarea v-if="question.options.withText" />
      </div>
      <ul class="q-preview__scale" v-if="question.type === 'scale'">
        <input type="text" v-model="question.options.startValue" />
        <input
          type="radio"
          :value="n"
          v-for="n in parseInt(question.options.scaleSteps)"
          v-bind:key="n"
        />
        <input type="text" v-model="question.options.endValue" />
      </ul>
    </form>
  </div>
</template>

<script>
export default {
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

  h3 {
    margin-top: 0;
  }
  textarea {
    width: 90%;
    height: 100px;
    border-radius: 5px;
    resize: none;
  }
  &__title {
    font-size: 1.17em;
    border: none;
    background: transparent;
    width: 90%;
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
