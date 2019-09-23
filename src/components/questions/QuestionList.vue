<template>
  <div class="container">
    <header>
      <h2>Question List</h2>
    </header>
    <question-list-filter v-model="filters" />
    <transition-group tag="ul">
      <QuestionListItem
        v-for="question in sortList(filteredQuestions)"
        :key="question.id"
        :question="question"
        @selectQuestion="forwardAddEmit"
      />
    </transition-group>
  </div>
</template>

<script>
import QuestionListItem from './QuestionListItem.vue';
import QuestionListFilter from './QuestionListFilter.vue';

export default {
  data: function() {
    return {
      filters: {
        search: '',
        type: '',
        sortBy: '',
      },
    };
  },
  components: {
    QuestionListItem,
    QuestionListFilter,
  },
  props: {
    questions: Array,
    selectedQuestions: Array,
  },
  computed: {
    availableQuestions() {
      return this.questions.filter(x => !this.selectedQuestions.includes(x.id));
    },
    filteredQuestions() {
      return this.availableQuestions.filter(
        x =>
          x.text.toLowerCase().match(this.filters.search.toLowerCase()) &&
          (!this.filters.type || x.type === this.filters.type)
      );
    },
  },
  methods: {
    forwardAddEmit(id) {
      this.$emit('selectQuestion', id);
    },
    sortList(questions) {
      if (this.filters.sortBy) {
        switch (this.filters.sortBy) {
          case 'newest':
            questions.sort((a, b) => {
              if (!a.createdAt && !b.createdAt) {
                return 0;
              } else if (!b.createdAt) {
                return -1;
              } else if (!a.createdAt) {
                return 1;
              } else {
                return b.createdAt.toMillis() - a.createdAt.toMillis();
              }
            });
            break;
          case 'oldest':
            questions.sort((a, b) => {
              if (!a.createdAt && !b.createdAt) {
                return 0;
              } else if (!a.createdAt) {
                return -1;
              } else if (!b.createdAt) {
                return 1;
              } else {
                return a.createdAt.toMillis() - b.createdAt.toMillis();
              }
            });
            break;
          default:
            break;
        }
      }
      return questions;
    },
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
  overflow: hidden;
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
