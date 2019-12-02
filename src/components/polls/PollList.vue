<template>
  <SectionContainer :title="title">
    <template slot="filter">
      <ListFilterBar :value="filters" searchTarget="Poll Title" />
    </template>

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
            <IconButton
              v-if="answeredPollIds && answeredPollIds.includes(poll.id)"
              name="View Statistics"
              @click="emitButton('View Statistics', poll.id)"
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
    <template slot="controls" v-if="hasBackButton">
      <DefaultButton name="Go Back" isDanger @click="$emit('navBack')" />
    </template>
  </SectionContainer>
</template>

<script>
import QuestionListItem from '../questions/QuestionListItem.vue';

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
  },
  props: {
    title: String,
    polls: Array,
    buttons: Array,
    hasBackButton: Boolean,
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
    answeredPollIds() {
      return this.$store.getters.answeredPollIds;
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
  margin: 0;
  padding: 0;
}
.poll {
  background-color: $primary;
  padding-bottom: 6px;
  @include shadow1;
  @include main-radius;

  &:not(:last-child) {
    margin-bottom: 6px;
  }

  &:hover {
    @include shadow2;
    opacity: 0.9;
  }

  &__questions {
    background-color: rgba($primary-dark, 0.6);
    padding: 6px;
    height: 100%;
    margin: auto;
    p {
      margin-bottom: 0;
    }
  }
  &__short {
    @include top-radius;
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
    }
  }
  &__info {
    flex: 1 1 70%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    font-size: 1rem;
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
