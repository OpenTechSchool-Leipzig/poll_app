<template></template>

<script>
export default {
  name: 'PollOverview',
  components: {},
  computed: {
    storedPolls() {
      return this.$store.state.polls;
    },
  },
  mounted: function() {
    this.$store.dispatch('fetchPolls');
  },
};
</script>
