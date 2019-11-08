<template>
  <div class="container">
    <header>
      <h2>Your Team</h2>
    </header>
    <ul>
      <li class="box" v-for="user in users" :key="user.id">
        <div>user: {{ user.name }} email: {{ user.email }}</div>
        <div v-if="user.admin" class="tag is-primary">admin</div>
        <DefaultButton
          name="promote"
          v-if="!user.admin"
          hasConfirmation
          isDanger
          @click="promoteUser(user.id, !!user.admin)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { functions } from '../../utility/firebase';
import DefaultButton from '../basic/Buttons/DefaultButton.vue';

export default {
  props: {
    users: Array,
  },
  components: {
    DefaultButton,
  },
  methods: {
    promoteUser(userId, isAdmin) {
      console.log(`ID: ${userId}, isAdmin: ${isAdmin}`);
      if (!isAdmin) {
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({ userId: userId }).then(res => {
          console.log(res);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}
ul {
  padding: 0.75rem;
}
</style>
