<template>
  <div>
    <h2>Your Team:</h2>
    <ul>
      <li class="box" v-for="user in users" :key="user.id">
        <div>user: {{ user.name }} email: {{ user.email }}</div>
        <div v-if="user.admin" class="tag is-primary">admin</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
  },
  methods: {
    promoteUser() {
      //call cloud function here!
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
}
</style>
