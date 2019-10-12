<template>
  <div id="nav">
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
          <router-link to="/" v-if="isAdmin" class="navbar-item is-tab">Poll Overview</router-link>
          <router-link to="/newpoll" v-if="isAdmin" class="navbar-item is-tab"
            >Create Poll</router-link
          >
          <router-link to="/about" class="navbar-item is-tab">About</router-link>
          <router-link to="/login" class="navbar-item is-tab">Login</router-link>
          <a @click.prevent="logOut" class="navbar-item is-tab">LogOut</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { auth } from '@/utility/firebase';

export default {
  data: function() {
    return {
      isOpen: false,
      isAdmin: Boolean,
    };
  },
  beforeCreate() {
    this.isAdmin = auth.currentUser.admin;
  },
  methods: {
    async logOut() {
      await auth.signOut();
      try {
        console.log('logged user out');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #dcfaff;
    }
  }
}
label {
  text-align: left;
}
.logo {
  font-size: 2em;
  margin: 0 3px 0 0.5em;
  background: #085987;
  color: #fff;
  padding: 8px 13px;
}
.navbar {
  background: #085987;
}
.navbar-item {
  color: white;
}
.navbar-item.is-tab:hover {
  color: #9be2e2;
}

.navbar-menu {
  background: #085987;
}
.navbar-burger {
  span {
    height: 2px;
  }
}
</style>
