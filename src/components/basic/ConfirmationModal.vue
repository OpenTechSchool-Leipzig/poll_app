<template>
  <default-modal v-if="visible" @closeModal="cancel">
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
    <div class="level">
      <div class="level-item">
        <default-button name="cancel" @click="cancel" />
      </div>
      <div class="level-item">
        <default-button :name="type" :isDanger="isDanger" @click="confirm" />
      </div>
    </div>
  </default-modal>
</template>

<script>
import { mapState } from 'vuex';
import DefaultModal from './DefaultModal.vue';
import DefaultButton from './Buttons/DefaultButton.vue';

export default {
  components: {
    DefaultModal,
    DefaultButton,
  },
  computed: {
    ...mapState({
      title: state => state.confirmationDialog.title,
      text: state => state.confirmationDialog.text,
      visible: state => state.confirmationDialog.visible,
      type: state => state.confirmationDialog.type,
      isDanger: state => state.confirmationDialog.isDanger,
      action: state => state.confirmationDialog.action,
    }),
  },
  methods: {
    cancel() {
      this.$store.commit('setDialog', null);
    },
    confirm() {
      this.action();
      this.$store.commit('setDialog', null);
    },
  },
};
</script>
