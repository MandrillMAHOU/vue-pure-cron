<template>
  <div id="vue-pure-app">
    <pure-cron></pure-cron>
  </div>
</template>

<script>
import PureCron from '@/views/index.vue';

export default {
  name: 'App',
  components: {
    PureCron,
  }
};
</script>

<style lang="scss">
#vue-pure-app {
}
</style>
