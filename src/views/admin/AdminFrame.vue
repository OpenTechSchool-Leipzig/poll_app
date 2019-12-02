<template>
  <div class="wrapper">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/navigation/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  mounted() {
    // Where to place all the requests
    if (this.$store.state.answers.answers.length < 1) {
      this.$store.dispatch('fetchAnswers');
    }
    if (this.$store.state.polls.polls.length < 1) {
      this.$store.dispatch('fetchPolls');
    }
    if (this.$store.state.questions.questions.length < 1) {
      this.$store.dispatch('fetchQuestions');
    }
    if (this.$store.state.templates.templates.length < 1) {
      this.$store.dispatch('fetchTemplates');
    }
    if (this.$store.state.user.userList.length < 1) {
      this.$store.dispatch('fetchUsers');
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
