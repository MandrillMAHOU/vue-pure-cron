<template>
  <div id="app">
    <cron-layout></cron-layout>
  </div>
</template>

<script>
import CronLayout from '@/components/Layout.vue';

export default {
  name: 'App',
  components: {
    CronLayout,
  }
}
</script>


<style lang="scss">
#app {
  // min-width: 1350px;
}
</style>
