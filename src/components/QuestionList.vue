<template>
  <div class="container">
    <header>
      <h2>Question List</h2>
    </header>
    <ul>
      <li
        v-for="question in questions"
        v-show="!selectedQuestions.includes(question.id)"
        class="question"
        :key="question.id"
      >
        <div class="question__short" :class="{expanded: expanded.includes(question.id)}">
          <p @click="toggleItem(question.id)">{{question.text}}</p>
          <button @click.prevent="emitSelection(question.id)">Add</button>
        </div>
        <div v-show="expanded.includes(question.id)" class="question__details">
          <p>type: {{question.type}}</p>
          <p>options: {{JSON.stringify(question.options)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      expanded: [],
    };
  },
  props: {
    questions: Array,
    selectedQuestions: Array,
  },
  methods: {
    toggleItem(key) {
      if (this.expanded.includes(key)) {
        let filteredArray = this.expanded.filter(x => x != key);
        console.log('delete key, new list: ' + filteredArray);
        this.expanded = filteredArray;
      } else {
        console.log('add key: ' + key);
        this.expanded.push(key);
      }
    },
    emitSelection(id) {
      this.$emit('selectQuestion', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: $primary-dark;
}
header {
  @include section-header;
}
ul {
  list-style: none;
  margin: 5px 0 10px;
  padding: 0;
}
.question {
  background-color: $primary-light;
  width: calc(100% - 12px);
  margin: auto;
  margin-bottom: 6px;
  @include shadow1;

  &:hover {
    @include shadow2;
    opacity: 0.9;
  }

  &__details {
    font-size: 12px;
    width: 100%;
    padding: 6px;
    p {
      margin-bottom: 0;
    }
  }
  &__short {
    width: calc(100% - 24px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 6px 12px;
    p {
      font-size: 1.17rem;
      padding: 5px;
      max-width: 80%;
      margin: 0;
      text-align: left;
      cursor: pointer;
    }
  }
}
.expanded {
  background-color: $primary;
  @include shadow1;
}
</style>

