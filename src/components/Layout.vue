<template>
  <div class="pure-cron-layout">
    <div class="pure-cron-container">
      <div class="pure-cron-tabs-wrapper">
        <div
          class="tab"
          v-for="(item, index) of tabList"
          :key="index">
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pure-cron-layout',
  components: {
  },
  data() {
    return {
      tabList: [
        { prop: 'second', label: 'Second' },
        { prop: 'minute', label: 'Minute' },
        { prop: 'hour', label: 'Hour' },
        { prop: 'day', label: 'Day' },
        { prop: 'week', label: 'Week' },
        { prop: 'month', label: 'Month' },
        { prop: 'year', label: 'Year' },
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
.pure-cron-layout {
}
</style>
