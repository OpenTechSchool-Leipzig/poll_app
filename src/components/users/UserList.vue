<template>
  <div>
    <h2>Your Team:</h2>
    <ul>
      <li class="box" v-for="user in users" :key="user.id">
        <div>user: {{ user.name }} email: {{ user.email }}</div>
        <div v-if="user.admin" class="tag is-primary">admin</div>
      </li>
      <li class="box has-background-primary">
        This is a public demo. Feel free to add questions, create polls/surveys from this questions
        or save them as templates. You can also active them and save answers to those polls! Have
        fun! &#10024;
      </li>
      <li class="box has-background-warn">
        Cloudfunctions for promoting Users are disabled in this demo
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
}
</style>
