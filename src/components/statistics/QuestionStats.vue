<template>
  <div class="box">
    <h3>{{ question.text }}</h3>
    <div class="tags">
      <span class="tag is-primary">{{ typeLabel }}</span>
      <span class="tag" v-for="(label, key) in optionsLabels" :key="key">{{ label }}</span>
    </div>
    <MultipleChoiceStats v-if="question.type === 'choice'" :question="question" />
    <ScaleStats v-if="question.type === 'scale'" :question="question" />
    <div v-if="question.comments.length > 0">
      <h4>Comments</h4>
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
};
</script>

<style lang="scss" scoped>
.comment-list {
  list-style-type: disc;
  padding-left: 2rem;
  li {
    font-size: 0.8rem;
    text-align: left;
  }
}
</style>
