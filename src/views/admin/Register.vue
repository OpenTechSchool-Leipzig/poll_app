<template>
  <div class="wrapper">
    <FormCard
      title="Request Access"
      @submit="register"
      :submitBtn="{ name: 'Sign up', loading, disabled: !isInputValid }"
    >
      <template #body>
        <InputUnit v-model="email" :name="'Email'" :type="'email'" />
        <InputUnit v-model="name" :name="'Username'" :type="'text'" />
        <InputUnit
          v-model="password"
          :name="'Password'"
          :type="'password'"
          :validation="passwordStatus"
        />
        <InputUnit
          v-model="passwordRepeat"
          :name="'Repeat Password'"
          :validation="passwordStatus"
          :type="'password'"
        />
        <div class="hint">
          <p>You can sign up but need to wait for an admin to confirm your registration</p>
        </div>
      </template>
    </FormCard>
  </div>
</template>

<script>
import { auth } from '@/utility/firebase';
import FormCard from '@/components/basic/FormCard.vue';
import InputUnit from '@/components/basic/InputUnit.vue';

export default {
  components: {
    FormCard,
    InputUnit,
  },
  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordRepeat: '',
      loading: false,
    };
  },
  computed: {
    passwordStatus() {
      if (this.password.length < 1) {
        return '';
      } else if (this.password.length < 5) {
        return 'toShort';
      } else if (this.password !== this.passwordRepeat) {
        return 'notSame';
      } else {
        return 'valid';
      }
    },
    isInputValid() {
      if (
        this.passwordStatus === 'valid' &&
        this.email.trim().length > 6 &&
        this.name.trim().length > 3
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    register() {
      this.loading = true;
      // subscribe to Observer to create user in firestore collection
      // this is neccassary because I require an valid uid for creation requests
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          this.$store.dispatch('createUser', {
            id: user.uid,
            info: {
              email: this.email,
              name: this.name,
            },
          });
          unsubscribe();
        } else {
          console.error("couldn't update Userdata");
        }
      });

      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          console.log(err.message);
          this.loading = false;
        });
    },
  },
};
</script>
