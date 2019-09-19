<template>
  <div>
    <h2>Your Team:</h2>
    <ul>
      <li
        class="box"
        v-for="user in users"
        :key="user.id"
        @click="promoteUser(user.id, !!user.admin)"
      >
        <div>user: {{ user.name }} email: {{ user.email }}</div>
        <div v-if="user.admin" class="tag is-primary">admin</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { functions } from '../../store/firebase';

export default {
  props: {
    users: Array,
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
}
</style>
