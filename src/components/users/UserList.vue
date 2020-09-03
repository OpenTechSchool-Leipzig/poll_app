<template>
  <SectionContainer title="Your Team">
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
  </SectionContainer>
</template>

<script>
import { functions } from '../../utility/firebase';

export default {
  props: {
    users: Array,
  },
  methods: {
    promoteUser(userId, isAdmin) {
      console.log(`ID: ${userId}, isAdmin: ${isAdmin}`);
      if (!isAdmin) {
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({ userId }).then(res => {
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
  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }
}
</style>
