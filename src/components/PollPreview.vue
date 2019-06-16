<template>
  <div class="poll-preview">
    <header>
      <h2>Poll Preview</h2>
    </header>
    <ul class="poll-preview__list">
      <li class="poll-preview__item" v-for="question in questions" v-bind:key="question.id">
        <h3>{{question.text}}</h3>
        <button @click="$emit('removeQuestion', question.id )">REMOVE</button>
        <form>
          <textarea v-if="question.type==='open'"/>
          <div class="poll-preview__choices" v-if="question.type!=='open'">
            <div v-if="question.options.isYesNo">
              <div class="poll-preview__yesno">
                <input id="yes" type="radio" value="true">
                <label for="yes">Yes</label>
                <input id="no" type="radio" value="false">
                <label for="no">No</label>
              </div>
            </div>
            <div
              class="poll-preview__choice"
              v-for="choice in question.options.choices"
              v-bind:key="choice"
            >
              <input id="choice" type="checkbox">
              <label for="answer">{{choice}}</label>
            </div>
            <div v-if="question.options.customAnswer" class="poll-preview__choice">
              <input id="custom-answer" type="checkbox">
              <input type="answer">
            </div>
            <textarea v-if="question.options.explanation"/>
          </div>
          <ul class="poll-preview__scale" v-if="question.type==='scale'">
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
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    date: String,
    questions: Array,
    question: Array,
  },
  data: function() {
    return {
      test: null,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  @include section-header;
}

.poll-preview {
  width: 100%;
  height: 100%;
  background-color: $primary-dark;

  &__list {
    list-style: none;
    margin: 10px 0;
    padding: 0;
  }
  &__item {
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
