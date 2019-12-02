<template>
  <div class="wrapper">
    <FormCard title="Login to continue..." @submit="login" :submitBtn="{ name: 'login', loading }">
      <template #body>
        <InputUnit v-model="email" :name="'Email'" :type="'email'" />
        <InputUnit v-model="password" :name="'Password'" :type="'password'" />
        <p>
          No account yet?
          <router-link to="/signup">Request access here</router-link>
        </p>
      </template>
      <template #footer>
        <DefaultButton name="log in with Test Account" @click="loginWithTestUser" />
      </template>
    </FormCard>
  </div>
</template>

<script>
import { auth } from '@/utility/firebase';

export default {
  data() {
    return {
      email: null,
      password: null,
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        console.log('successfully logged in');
        this.loading = false;
      } catch (error) {
        this.$store.dispatch('addNotification', {
          title: 'Error',
          message: error,
          type: 'danger',
        });
        this.loading = false;
      }
    },
    async loginWithTestUser() {
      this.loading = true;
      try {
        await auth.signInWithEmailAndPassword('test@poll.app', process.env.VUE_APP_FB_TEST_PW);
        console.log('successfully logged in as test user');
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
};
</script>
