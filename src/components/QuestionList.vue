<template>
  <div class="container">
    <header>
      <h2>Question List</h2>
    </header>
    <ul>
      <QuestionListItem
        v-for="question in questions"
        v-show="!selectedQuestions.includes(question.id)"
        :key="question.id"
        :question="question"
      />
    </ul>
  </div>
</template>

<script>
import QuestionListItem from './QuestionListItem';

export default {
  /*data: function() {
    return {
      expanded: [],
    };
  },*/
  components: {
    QuestionListItem,
  },
  props: {
    questions: Array,
    selectedQuestions: Array,
  },
  methods: {
    /* Old method for handling accordeon (now handled in child-state)
    toggleItem(key) {
      if (this.expanded.includes(key)) {
        let filteredArray = this.expanded.filter((x) => x != key);
        this.expanded = filteredArray;
      } else {
        this.expanded.push(key);
      }
    },*/
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

