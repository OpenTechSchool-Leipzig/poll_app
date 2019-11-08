<template>
  <div class="container">
    <header>
      <h2>{{ title }}</h2>
    </header>
    <ListFilterBar :value="filters" searchTarget="Poll Title" />
    <ul>
      <li v-for="poll in filteredPolls" class="poll" :key="poll.id">
        <div class="poll__short" :class="{ expanded: expanded.includes(poll.id) }">
          <div class="poll__info" @click="toggleItem(poll.id)">
            <div>{{ poll.title }}</div>
            <div>{{ poll.questions.length }} Questions</div>
            <div v-if="poll.state">state: {{ poll.state }}</div>
          </div>

          <div class="poll__buttons" v-if="buttons && buttons.length > 0">
            <IconButton
              v-for="(button, index) in buttons"
              :key="index"
              :name="button"
              @click="emitButton(button, poll.id)"
            />
          </div>
        </div>
        <ul
          v-if="poll.questions && poll.questions[0].id"
          v-show="expanded.includes(poll.id)"
          class="poll__questions"
        >
          <QuestionListItem
            v-for="question in poll.questions"
            :key="question.id"
            :question="question"
            :hideButtons="true"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
// This Component should work for Lists of Polls and Templates
// A better solution for the button part might be using <slot></slot>

import QuestionListItem from '../questions/QuestionListItem.vue';
import ListFilterBar from '../basic/ListFilterBar.vue';
import IconButton from '../basic/Buttons/IconButton.vue';

export default {
  data: function() {
    return {
      expanded: [],
      filters: {
        search: '',
        state: '',
      },
    };
  },
  components: {
    QuestionListItem,
    ListFilterBar,
    IconButton,
  },
  props: {
    title: String,
    polls: Array,
    buttons: Array,
  },
  computed: {
    filteredPolls() {
      if (this.polls && this.polls.length > 0)
        return this.polls.filter(
          x =>
            x.title.toLowerCase().match(this.filters.search.toLowerCase()) &&
            (!this.filters.state || x.state === this.filters.state)
        );
      return [];
    },
  },
  methods: {
    toggleItem(key) {
      if (this.expanded.includes(key)) {
        let filteredArray = this.expanded.filter(x => x != key);
        this.expanded = filteredArray;
      } else {
        this.expanded.push(key);
      }
    },
    // emit event according to button-name and pollId => actions are defined in parent Components
    emitButton(button, id) {
      this.$emit(button.split(' ').join(''), id);
    },
  },
  mounted() {
    if (this.title === 'Templates') {
      delete this.filters.state;
    }
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 5px 0 10px;
  padding: 0;
}
.poll {
  background-color: $primary;
  width: calc(100% - 12px);
  margin: auto;
  margin-bottom: 6px;
  padding-bottom: 6px;
  @include shadow1;

  &:hover {
    @include shadow2;
    opacity: 0.9;
  }

  &__questions {
    background-color: rgba($primary-dark, 0.6);
    width: calc(100% - 24px);
    padding-top: 6px;
    height: 100%;
    margin: auto;
    p {
      margin-bottom: 0;
    }
  }
  &__short {
    width: calc(100% - 24px);
    background-color: $primary-light;
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
  &__info {
    flex: 1 1 70%;
    display: flex;
    justify-content: space-between;
  }
  &__buttons {
    flex: 1 1 30%;
  }
}
.expanded {
  background-color: $primary;
  @include shadow1;
}
</style>
