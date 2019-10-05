<template>
  <default-modal v-if="visible" @closeModal="cancel">
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
    <div class="level">
      <div class="level-item">
        <default-button name="cancel" @click="cancel" />
      </div>
      <div class="level-item">
        <default-button :name="type" isDanger @click="confirm" />
      </div>
    </div>
  </default-modal>
</template>

<script>
import DefaultModal from './DefaultModal.vue';
import DefaultButton from './DefaultButton.vue';

export default {
  components: {
    DefaultModal,
    DefaultButton,
  },
  props: {
    // use props or vueX?
    title: String,
    text: String,
    visible: Boolean,
    type: String,
    isDanger: Boolean,
  },
};
</script>
