<template>
  <div class="container">
    <header>Question List</header>
    <ul>
      <li v-for="question in questions" v-bind:key="question.id">
        <h3>{{question.text}}</h3>
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

