<template>
  <li class="question">
    <div class="question__short" :class="{ expanded: expanded }">
      <p @click="toggleExpansion">{{ question.text }}</p>
      <IconButton
        v-if="!hideButtons"
        @click="emitSelection(question.id)"
        name="Add Question to Poll"
      />
    </div>
    <div v-show="expanded" class="question__details">
      <ul>
        <li>type: {{ typeLabel }}</li>
        <li v-if="choicesLabel">
          choices:
          <ul class="nested-list">
            <li v-for="(choice, i) in choicesLabel" :key="i">{{ choice }}</li>
          </ul>
        </li>
        <li v-if="optionsLabels">
          options:
          <ul class="nested-list">
            <li v-for="(option, i) in optionsLabels" :key="i">{{ option }}</li>
          </ul>
        </li>
        <li v-if="createdByLabel">created by {{ createdByLabel }} on {{ createdAtLabel }}</li>
      </ul>
    </div>
  </li>
</template>

<script>
import { get } from 'lodash';
import IconButton from '../basic/Buttons/IconButton.vue';

export default {
  name: 'QuestionListItem',
  components: {
    IconButton,
  },
  // giving each item it's own state for handling accordion functionality makes the component way more flexible
  // It might however not be a good practise...
  data: function() {
    return {
      expanded: false,
    };
  },

  computed: {
    typeLabel() {
      let typeLabel;
      switch (this.question.type) {
        case 'open':
          typeLabel = 'Open question';
          break;
        case 'choice':
          typeLabel = 'Multiple choice';
          break;
        case 'scale':
          typeLabel = 'Scale question';
          break;
        default:
          typeLabel = '';
      }
      return typeLabel;
    },
    choicesLabel() {
      const choices = get(this.question, 'options.choices');
      if (choices && choices.length > 0) {
        return choices;
      }
      return null;
    },
    optionsLabels() {
      const options = get(this.question, 'options');
      if (options) {
        const optionLabels = [];
        if (options.isYesNo === true) {
          optionLabels.push('Yes/No question');
        }
        if (options.oneAnswerOnly === true) {
          optionLabels.push('Allow only one answer');
        }
        if (options.withText === true) {
          optionLabels.push('Has textfield for explanation');
        }
        if (options.customAnswer === true) {
          optionLabels.push('Allow user to add answer');
        }
        if (options.startValue) {
          optionLabels.push(`Start value: ${options.startValue}`);
        }
        if (options.endValue) {
          optionLabels.push(`End value: ${options.endValue}`);
        }
        if (options.scaleSteps) {
          optionLabels.push(`Scale steps: ${options.scaleSteps}`);
        }
        return optionLabels.length > 0 ? optionLabels : null;
      }
      return null;
    },
    createdByLabel() {
      return get(this.question, 'createdBy.name');
    },
    createdAtLabel() {
      const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      };
      return this.question.createdAt.toDate().toLocaleDateString('de-DE', dateOptions);
    },
  },
  props: {
    question: Object,
    hideButtons: Boolean,
  },
  methods: {
    toggleExpansion() {
      let curState = this.expanded;
      this.expanded = !curState;
    },

    emitSelection(id) {
      // I originally used the $parent instance property to trigger emit at parent component level.
      // A more flexible approach might be using "v-on='$listeners'" in component template. But:
      // !! transition-group prevents using $parent and $listeners !!
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

ul.nested-list {
  display: inline-grid;
  list-style-type: square;
  list-style-position: inside;
  margin: 0;
  padding: 0 5px;
}
.question {
  background-color: $primary-light;
  width: calc(100% - 12px);
  margin: auto;
  margin-bottom: 6px;
  @include shadow1;
  transition: all 0.3s;

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

  &.v-enter,
  &.v-leave-to {
    transform: translateX(120%);
  }
  &.v-enter-to,
  &.v-leave {
    transform: translateX(0);
  }
  &.v-enter-active,
  &.v-leave-active,
  &.v-move {
    transition: all 0.5s ease-out;
  }
}
.expanded {
  background-color: $primary;
  @include shadow1;
}
</style>
