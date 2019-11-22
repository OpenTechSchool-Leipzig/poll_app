<template>
  <div class="box">
    <h3>{{ question.text }}</h3>
    <ApexChart
      :series="isStacked ? stackedData : dataObject"
      :labels="labels"
      :type="chartType"
      :isStacked="isStacked"
    />
    <CheckboxUnit v-model="isStacked" name="show stacked view" v-if="chartType === 'bar'" />
  </div>
</template>

<script>
import ApexChart from '../ApexChart.vue';

export default {
  props: {
    question: Object,
  },
  components: {
    ApexChart,
  },
  data() {
    return {
      isStacked: false,
    };
  },
  computed: {
    dataObject() {
      const answerCount = this.question.answers.length;
      // handle yesNoQuestions
      if (this.question.options.isYesNo) {
        const validAnswers = this.question.answers.filter(x => typeof x === 'boolean').length;
        const trueAnswers = this.question.answers.filter(x => x).length;
        return {
          yes: trueAnswers,
          no: validAnswers - trueAnswers,
          unanswered: answerCount - validAnswers,
        };
      }
      // prepare answers for MC with multiple answers
      let answers = [];
      if (this.question.options.oneAnswerOnly) {
        answers = this.question.answers;
      } else {
        this.question.answers.forEach(ans => {
          if (ans.length === 0) ans = ['unanswered'];

          answers = [...answers, ...ans];
        });
      }

      let counts = {};
      answers.forEach(answer => {
        if (!answer || answer.length === 0) answer = 'unanswered';
        counts[answer] = (counts[answer] || 0) + 1;
      });
      return counts;
    },
    labels() {
      return Object.keys(this.dataObject);
    },
    stackedData() {
      if (!this.isStacked) {
        return null;
      }

      return this.question.answers.map((ans, index) => {
        if (ans.length === 0) ans = ['unanswered'];
        const nums = this.labels.map(x => (ans.includes(x) ? 1 : 0));
        return { name: 'Answer ' + (index + 1), data: nums };
      });
    },

    chartType() {
      return this.question.options.isYesNo || this.question.options.oneAnswerOnly ? 'donut' : 'bar';
    },
  },
};
</script>
