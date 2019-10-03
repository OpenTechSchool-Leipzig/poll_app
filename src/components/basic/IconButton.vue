<template>
  <button
    class="button is-outlined"
    :class="{ 'is-loading': isLoading, 'is-primary': isPrimary, 'is-danger': isDanger }"
    :disabled="isDisabled"
    @click.prevent="emitEvent"
  >
    <template v-if="icons.length === 0">{{ name }}</template>
    <template v-else>
      <font-awesome-icon v-for="(icon, index) in icons" :key="index" :icon="icon.icon" />
    </template>
  </button>
</template>

<script>
import iconMap from '@/utility/iconMap.json';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    isLoading: {
      required: false,
      default: false,
      type: Boolean,
    },
    isPrimary: {
      required: false,
      default: false,
      type: Boolean,
    },
    isDanger: {
      required: false,
      default: false,
      type: Boolean,
    },
    isDisabled: {
      required: false,
      default: false,
      type: Boolean,
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    },
  },
  computed: {
    icons() {
      let icons = [];
      this.name.split(' ').forEach(label => {
        const icon = iconMap.find(x => x.labels.includes(label.toLowerCase()));
        if (icon) {
          icons.push(icon);
        }
      });
      return icons;
    },
  },
  methods: {
    emitEvent() {
      console.log(this.type === 'submit' ? 'submit' : 'click');
      this.$emit(this.type === 'submit' ? 'submit' : 'click');
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  min-width: 120px;
  text-transform: uppercase;
}
</style>
