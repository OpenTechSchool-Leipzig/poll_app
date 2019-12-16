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
      console.log('triggered function');
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
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0.25rem;
}
</style>
