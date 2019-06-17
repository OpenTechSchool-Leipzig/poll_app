<template>
  <div class="q-preview">
    <h3>{{question.text}}</h3>
    <form>
      <textarea v-if="question.type==='open'"/>
      <div class="q-preview__choices" v-if="question.type!=='open'">
        <div v-if="question.options.isYesNo">
          <div class="q-preview__yesno">
            <input id="yes" type="radio" value="true">
            <label for="yes">Yes</label>
            <input id="no" type="radio" value="false">
            <label for="no">No</label>
          </div>
        </div>
        <div class="q-preview__choice" v-for="choice in question.options.choices" :key="choice">
          <input id="choice" type="checkbox">
          <label for="answer">{{choice}}</label>
        </div>
        <div v-if="question.options.customAnswer" class="poll-preview__choice">
          <input id="custom-answer" type="checkbox">
          <input type="answer">
        </div>
        <textarea v-if="question.options.explanation"/>
      </div>
      <ul class="q-preview__scale" v-if="question.type==='scale'">
        <li>{{question.options.startValue}}</li>
        <input
          type="radio"
          :value="n"
          v-model="test"
          v-for="n in parseInt(question.options.scaleSteps)"
          v-bind:key="n"
        >
        <li>{{question.options.endValue}}</li>
      </ul>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
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

