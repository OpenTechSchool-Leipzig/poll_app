<template>
  <div class="wrapper">
    <Card title="'login to continue...'">
      <template #body>
        <div>
          <h3>test</h3>
          <InputUnit v-model="email" :name="'Email'" :type="'email'" />
          <InputUnit v-model="password" :name="'Password'" :type="'password'" />
          <InputUnit v-model="passwordRepeat" :name="'Repeat Password'" :type="'password'" />
        </div>
      </template>
      <template #footer>
        <button>test</button>
      </template>
    </Card>
  </div>
</template>

<script>
//import { auth } from '../store/firebase';
import Card from '../components/basic/Card.vue';
import InputUnit from '../components/basic/InputUnit.vue';

export default {
  components: {
    Card,
    InputUnit,
  },
  data() {
    return {
      email: null,
      password: null,
      passwordRepeat: null,
    };
  },
};
</script>
