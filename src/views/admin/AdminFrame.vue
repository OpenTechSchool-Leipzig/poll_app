<template>
  <div class="wrapper">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/navigation/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
