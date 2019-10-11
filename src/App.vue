<template>
  <div id="app">
    <!-- <div id="nav">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <span class="logo">OpenTechSchool</span>
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            @click="isOpen = !isOpen"
            v-bind:class="{ 'is-active': isOpen }"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active': isOpen }">
          <div class="navbar-end">
            <router-link to="/" class="navbar-item is-tab">Poll Overview</router-link>
            <router-link to="/newpoll" class="navbar-item is-tab">Create Poll</router-link>
            <router-link to="/about" class="navbar-item is-tab">About</router-link>
            <router-link to="/login" class="navbar-item is-tab">Login</router-link>
            <a @click.prevent="logOut" class="navbar-item is-tab">LogOut</a>
          </div>
        </div>
      </nav>
    </div>-->
    <nav-bar></nav-bar>
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
