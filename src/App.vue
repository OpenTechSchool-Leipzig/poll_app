<template>
  <div id="app">
    <notifications />
    <router-view />
    <confirmation-modal />
  </div>
</template>

<script>
import { auth } from '@/utility/firebase';

export default {
  mounted() {
    // this method creates an observer that should be triggered on signIn and signOut
    auth.onAuthStateChanged(user => {
      console.log('Auth observer triggered');
      if (!user) {
        this.$store.commit('setUser', null);
        if (this.$route.meta.admin || this.$route.meta.auth) this.$router.push({ path: '/login' });
      } else {
        user.getIdTokenResult().then(tokenResult => {
          user.admin = tokenResult.claims.admin;
          this.$store.commit('setUser', user);
          // Problem: if a token is stored, the observer gets triggered befor the $route data is there => redirection doesn't work.
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
  min-height: 100vh;
  @include background-gradient;
}
</style>
