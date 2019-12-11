<template>
  <div>
    <ApexChart
      :series="dataObject"
      type="bar"
      :options="annotations"
      isScale
      :max="scaleMax"
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
    annotations() {
      return {
        annotations: {
          position: 'back',
          xaxis: [
            {
              x: this.minValue,
              x2: this.maxValue,
              strokeDashArray: 0,
              borderColor: '#ff9e09',
              fillColor: '#ffd088',
              opacity: 0.3,
              offsetX: 0,
              offsetY: 0,
              label: {
                borderColor: '#ff9e09',
                borderWidth: 1,
                text: `Range: ${this.minValue} - ${this.maxValue}`,
                textAnchor: 'middle',
                position: 'top',
                orientation: 'horizontal',
                offsetX: 50,
                offsetY: 50,
                style: {
                  background: '#fff',
                  color: '#777',
                  fontSize: '12px',
                  cssClass: 'apexcharts-xaxis-annotation-label',
                },
              },
            },
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
    scaleMax() {
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

      for (let i = 0; i < this.scaleMax; i++) {
        counts[i + 1] = counts[i + 1] || 0;
      }
      if (this.unansweredCount) {
        counts[this.scaleMax + 1] = 0;
      }
      return counts;
    },
    labels() {
      return Object.keys(this.dataObject);
    },
    minValue() {
      for (let i = 0; i < this.scaleMax; i++) {
        if (this.dataObject[i + 1] > 0) {
          return i + 1;
        }
      }
      return null;
    },
    maxValue() {
      let maxCount = 0;
      for (let i = 0; i < this.scaleMax; i++) {
        if (this.dataObject[i + 1] > 0) maxCount = i + 1;
      }
      return maxCount;
    },
  },
};
</script>
