<template>
  <div>
    <ApexChart
      :series="dataObject"
      type="bar"
      :options="meanAnnotation"
      isScale
      :max="max"
      :unansweredCount="unansweredCount"
    />
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
  computed: {
    meanAnnotation() {
      return {
        annotations: {
          position: 'front',
          xaxis: [
            {
              x: this.mean,
              strokeDashArray: 0,
              borderColor: '#ffff00',
              fillColor: '#c2c2c2',
              opacity: 0.9,
              offsetX: 0,
              offsetY: 0,
              label: {
                borderColor: '#ffff00',
                borderWidth: 1,
                text: 'Mean: ' + this.mean.toFixed(2),
                textAnchor: 'middle',
                position: 'top',
                orientation: 'vertical',
                offsetX: 0,
                offsetY: 0,
                style: {
                  background: '#fff',
                  color: '#777',
                  fontSize: '12px',
                  cssClass: 'apexcharts-xaxis-annotation-label',
                },
              },
            },
          ],
        },
      };
    },
    max() {
      return parseInt(this.question.options.scaleSteps);
    },
    unansweredCount() {
      return this.question.answers.filter(x => !x).length;
    },
    validAnswerCount() {
      return this.question.answers.length - this.unansweredCount;
    },
    mean() {
      return this.question.answers.reduce((acc, x) => acc + x) / this.validAnswerCount;
    },
    dataObject() {
      let counts = {};
      this.question.answers.forEach(answer => {
        if (answer) {
          counts[answer] = (counts[answer] || 0) + 1;
        }
      });

      for (let i = 0; i < this.max; i++) {
        counts[i + 1] = counts[i + 1] || 0;
      }
      return counts;
    },
    labels() {
      return Object.keys(this.dataObject);
    },
  },
};
</script>
