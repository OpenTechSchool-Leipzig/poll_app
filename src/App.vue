<template>
  <div id="app">
    <nav-bar />
    <router-view />
    <confirmationModal />
  </div>
</template>

<script>
import { auth } from '@/utility/firebase';
import confirmationModal from './components/basic/ConfirmationModal.vue';
import NavBar from './components/basic/NavBar.vue';

export default {
  components: {
    confirmationModal,
    NavBar,
  },
  created() {
    console.log(auth.currentUser.admin);
  },
  mounted() {
    // this method creates an observer that should be triggered on signIn and signOut
    auth.onAuthStateChanged(user => {
      console.log('observer triggered');
      if (!user) {
        this.$store.commit('setUser', null);
        if (this.$route.meta.admin || this.$route.meta.auth) this.$router.push({ path: '/login' });
      } else {
        user.getIdTokenResult().then(tokenResult => {
          user.admin = tokenResult.claims.admin;
          this.$store.commit('setUser', user);
          if (this.$route.meta.guest) {
            this.$router.push({ path: '/' });
          }
        });
      }
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
