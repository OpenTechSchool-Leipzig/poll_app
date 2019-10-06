<template>
  <DefaultModal @closeModal="$emit('clearState')">
    <h3>{{ pollTitle }}</h3>
    <form @submit.prevent="updateState">
      <div class="radio-group">
        <input v-model="selection" id="draft" type="radio" :value="'draft'" />
        <label for="draft">Draft</label>
      </div>
      <div class="radio-group">
        <input v-model="selection" id="active" type="radio" :value="'active'" />
        <label for="active">Active</label>
      </div>
      <div class="radio-group">
        <input v-model="selection" id="closed" type="radio" :value="'closed'" />
        <label for="closed">Closed</label>
      </div>
      <DefaultButton @click="updateState" name="Update State" />
    </form>
  </DefaultModal>
</template>

<script>
import DefaultButton from '../basic/Buttons/DefaultButton.vue';
import DefaultModal from '../basic/DefaultModal.vue';

export default {
  components: {
    DefaultButton,
    DefaultModal,
  },
  props: {
    pollId: String,
    pollTitle: String,
    initialState: String,
  },
  data() {
    return {
      selection: this.initialState,
    };
  },
  methods: {
    updateState() {
      this.$store.dispatch({
        type: 'updatePollState',
        pollId: this.pollId,
        newState: this.selection,
      });
      this.$emit('clearState');
    },
  },
};
</script>
