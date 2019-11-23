<template>
  <div class="box">
    <h2 class="title is-3">{{ question.text }}</h2>
    <div class="tags">
      <span class="tag is-primary">{{ typeLabel }}</span>
      <span class="tag" v-for="(label, key) in optionsLabels" :key="key">{{ label }}</span>
    </div>
    <MultipleChoiceStats v-if="question.type === 'choice'" :question="question" />
    <ScaleStats v-if="question.type === 'scale'" :question="question" />
    <div v-if="question.type === 'open'">
      <h3 class="title is-4">Answers</h3>
      <ul class="answer-list">
        <li v-for="(answer, key) in openAnswers" :key="key">{{ answer }}</li>
      </ul>
    </div>
    <div v-if="question.comments.length > 0">
      <h4 class="title is-5">Comments</h4>
      <ul class="comment-list">
        <li v-for="(comment, key) in question.comments" :key="key">{{ comment }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import questionLabels from '../questions/questionLabelsMixin';
import MultipleChoiceStats from './questions/MultipleChoiceStats.vue';
import ScaleStats from './questions/ScaleStats.vue';

export default {
  mixins: [questionLabels],
  props: {
    question: Object,
  },
  components: {
    MultipleChoiceStats,
    ScaleStats,
  },
  computed: {
    openAnswers() {
      if (this.question.type !== 'open') {
        return null;
      }
      return this.question.answers.filter(x => x);
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.2rem;
  font-weight: bold;
}
.comment-list {
  list-style-type: disc;
  padding-left: 2rem;
  li {
    font-size: 0.8rem;
    text-align: left;
  }
}
.answer-list {
  padding: 0 2rem;
  list-style-type: circle;
  li {
    text-align: left;
  }
}
</style>
