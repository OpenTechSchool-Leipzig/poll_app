<template>
  <div class="wrapper">
    <FormCard title="Request Access">
      <template #body>
        <InputUnit v-model="email" :name="'Email'" :type="'email'" />
        <InputUnit v-model="name" :name="'Username'" :type="'text'" />
        <InputUnit v-model="password" :name="'Password'" :type="'password'" />
        <InputUnit v-model="passwordRepeat" :name="'Repeat Password'" :type="'password'" />
        <div class="hint">
          <p>You can sign up but need to wait for an admin to confirm your registration</p>
        </div>
      </template>
      <template #footer>
        <button>Sign Up</button>
      </template>
    </FormCard>
  </div>
</template>

<script>
//import { auth } from '../store/firebase';
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
      name: null,
      password: null,
      passwordRepeat: null,
    };
  },
  computed: {
    passwordStatus() {
      if (this.password.length < 1) {
        return '';
      } else if (this.password.length < 5) {
        return 'toShort';
      } else if (this.password === this.passwordRepeat) {
        return 'notSame';
      } else {
        return 'valid';
      }
    },
  },
};
</script>
