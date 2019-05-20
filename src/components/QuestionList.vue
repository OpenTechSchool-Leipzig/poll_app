<template>
  <div class="container">
    <header>
      <h2>Question List</h2>
    </header>
    <ul>
      <li v-for="question in questions" v-bind:key="question.id">
        <h3>{{question.text}}</h3>
        <button>Add</button>
        <div class="details">
          <p>type: {{question.type}}</p>
          <p>{{JSON.stringify(question.options)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    questions: Array,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
  height: 100%;
}
header {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 0;
  background-color: #42b983;
  h2 {
    margin: 0 auto;
  }
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.details {
  font-size: 12px;
}
</style>

