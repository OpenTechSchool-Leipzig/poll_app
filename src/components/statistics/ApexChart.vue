<template>
  <div>
    <vue-apex-charts :type="type" :options="calcOption" :series="transformedSeries" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    VueApexCharts,
  },
  props: {
    series: {
      type: [Object, Array],
      required: true,
    },
    labels: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => {
        return {
          labels: [],
          chart: {
            stacked: false,
          },
          dataLabels: {
            enabled: true,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
        };
      },
    },
    type: {
      type: String,
      required: true,
      default: 'donut',
    },
    horizontal: Boolean,
    isStacked: Boolean,
    isScale: Boolean,
    unansweredCount: Number,
    max: Number,
  },
  computed: {
    transformedSeries() {
      if (this.isStacked) {
        return this.series;
      } else if (this.isScale) {
        return [
          {
            name: 'Scale Answers',
            data: Object.entries(this.series).map(([x, y]) => [parseInt(x), y]),
          },
          this.unansweredCount && {
            name: 'unanswered',
            data: [[0.2, this.unansweredCount]],
          },
        ];
      } else if (this.type === 'bar') {
        return [
          {
            name: 'Answers',
            data: Object.values(this.series),
          },
        ];
      }
      return Object.values(this.series);
    },

    calcOption() {
      let newOptions = {};
      if (this.labels) {
        newOptions = {
          ...this.options,
          labels: this.labels,
        };
      }
      if (this.horizontal) {
        newOptions = {
          ...this.options,
          ...newOptions,
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
        };
      }
      if (this.isStacked) {
        newOptions = {
          ...this.options,
          ...newOptions,
          chart: {
            stacked: true,
          },
          dataLabels: {
            enabled: false,
          },
        };
      }
      if (this.isScale) {
        newOptions = {
          ...this.options,
          ...newOptions,
          chart: {
            stacked: true,
          },
          xaxis: {
            type: 'numeric',
            min: this.unansweredCount ? 0 : 1,
            max: this.max + 1,
            tickAmount: this.max + (this.unansweredCount ? 1 : 0),
            tickPlacement: 'on',
          },
        };
      }
      return newOptions;
    },
  },
};
</script>
