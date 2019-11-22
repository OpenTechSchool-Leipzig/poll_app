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
    },
    options: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      required: true,
      default: 'donut',
    },
    horizontal: Boolean,
    isStacked: Boolean,
  },
  computed: {
    transformedSeries() {
      if (this.isStacked) {
        return this.series;
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
        };
      }
      return newOptions;
    },
  },
};
</script>
