<template>
  <div class="wrapper">
    <FormCard title="Login to continue...">
      <template #body>
        <InputUnit v-model="email" :name="'Email'" :type="'email'" />
        <InputUnit v-model="password" :name="'Password'" :type="'password'" />
        <p>
          No account yet?
          <router-link to="/signup">Request access here</router-link>
        </p>
      </template>
      <template #footer>
        <button
          class="button is-primary is-outlined"
          :class="{ 'is-loading': loading }"
          type="button"
          @click.prevent="login"
        >
          login
        </button>
      </template>
    </FormCard>
  </div>
</template>

<script>
import { auth } from '../store/firebase';
import FormCard from '../components/basic/FormCard.vue';
import InputUnit from '../components/basic/InputUnit.vue';

export default {
  components: {
    FormCard,
    InputUnit,
  },
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
      await auth.signInWithEmailAndPassword(this.email, this.password);
      try {
        console.log('successfully logged in');
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
};
</script>
