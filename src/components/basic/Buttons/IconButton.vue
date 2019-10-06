<template>
  <button
    class="button is-outlined is-small is-primary"
    :class="{
      'is-loading': isLoading,
      'is-inverted': !isPrimary && !(isDanger || hasDangerIcon),
      'is-danger': isDanger || hasDangerIcon,
    }"
    :disabled="isDisabled"
    @click.prevent="checkEmit"
    v-tooltip="name"
  >
    <template v-if="icons.length === 0">{{ name }}</template>
    <template v-else>
      <font-awesome-icon v-for="(icon, index) in icons" :key="index" :icon="icon.icon" />
    </template>
  </button>
</template>

<script>
import iconMap from '@/utility/iconMap.json';

import buttonMixin from './buttonMixin';

export default {
  mixins: [buttonMixin],
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
    hasDangerIcon() {
      if (this.icons.filter(x => x.isDanger).length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    checkEmit() {
      if (!this.hasConfirmation && !this.hasDangerIcon) {
        this.emitEvent();
      } else {
        this.$store.commit('setDialog', {
          title: this.name,
          text: 'Are you sure you want to permanently ' + this.name + '?',
          type: this.name.split(' ')[0],
          isDanger: this.isDanger || this.hasDangerIcon,
          action: this.emitEvent,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button:not(:last-child) {
  margin-right: 2px;
}
</style>
