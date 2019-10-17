<template>
  <div class="poll">
    <div v-if="isLoading">is loading...</div>
    <template v-if="!isLoading">
      <header>
        <h2>{{ activePoll.title }}</h2>
        <h4>on {{ activePoll.date }}</h4>
      </header>
      <div class="message-header">
        <p>Thank you for participating! 👍</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SuccessPoll',
  components: {},
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    activePoll() {
      return this.$store.state.activePoll.activePoll;
    },
  },
  async mounted() {
    if (!this.$store.state.activePoll.activePoll) {
      try {
        await this.$store.dispatch('fetchActivePoll', this.$route.params.pollId);
        this.isLoading = false;
      } catch (err) {
        this.$router.push({ name: '404' });
      }
    }
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.poll {
  width: 100%;
  height: 100%;
  background-color: $primary-dark;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;

  header {
    @extend .poll-title;
    h2 {
      font-size: 1.5rem;
      display: inline-block;
    }
    h4 {
      font-size: 1.2rem;
      display: inline-block;
    }
  }
}
</style>
