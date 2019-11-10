<template>
  <SectionContainer title="Question List" isFullHeight>
    <template slot="filter">
      <ListFilterBar v-model="filters" searchTarget="Question Text" />
    </template>
    <transition-group tag="ul">
      <QuestionListItem
        v-for="question in sortList(filteredQuestions)"
        :key="question.id"
        :question="question"
        @selectQuestion="forwardAddEmit"
      />
    </transition-group>

    <template slot="controls">
      <DefaultButton :name="'New Question'" :isPrimary="true" @click="$emit('addQuestion')" />
    </template>
  </SectionContainer>
</template>

<script>
import QuestionListItem from './QuestionListItem.vue';
import { sortAphabetical, sortTimestamp } from '../../utility/sortLists';

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
  },
  props: {
    questions: Array,
    selectedQuestions: Array,
  },
  computed: {
    availableQuestions() {
      if (this.questions && this.questions.length > 0)
        return this.questions.filter(x => !this.selectedQuestions.includes(x.id));

      return [];
    },
    filteredQuestions() {
      if (this.availableQuestions && this.availableQuestions.length > 0) {
        return this.availableQuestions.filter(
          x =>
            x.text.toLowerCase().match(this.filters.search.toLowerCase()) &&
            (!this.filters.type || x.type === this.filters.type)
        );
      }
      return [];
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
            sortTimestamp(questions, 'createdAt', false);
            break;
          case 'oldest':
            sortTimestamp(questions, 'createdAt', true);
            break;
          case 'a-to-z':
            sortAphabetical(questions, 'text', false);
            break;
          case 'z-to-a':
            sortAphabetical(questions, 'text', true);
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
  height: 100%;
  overflow: hidden;
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
