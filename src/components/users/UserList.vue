<template>
  <div>
    <h2>Your Team:</h2>
    <ul>
      <li class="box" v-for="user in users" :key="user.id">
        <div>user: {{ user.name }} email: {{ user.email }}</div>
        <div v-if="user.admin" class="tag is-primary">admin</div>
      </li>
      <li class="box has-background-primary">
        <p>
          This is a public demo. Feel free to add questions, create polls/surveys from this
          questions or save them as templates. You can also active polls and save answers to them.
          Have fun testing it! &#10024;!
        </p>
      </li>
      <li class="box has-background-primary">
        <p>
          If you want to contribute visit the projects
          <a href="https://github.com/OpenTechSchool-Leipzig/poll_app">github page</a> 🐋!
        </p>
      </li>
      <li class="box has-background-warning">
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
