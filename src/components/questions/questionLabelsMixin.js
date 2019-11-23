import { get } from 'lodash';

export default {
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
};
