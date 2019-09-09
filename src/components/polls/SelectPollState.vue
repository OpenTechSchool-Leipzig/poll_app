<template>
  <div>
    <p>Selected Poll ID = {{ pollId }}</p>
    <p>New State = {{ selection }}</p>
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
      <button>Update State</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    pollId: String,
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
