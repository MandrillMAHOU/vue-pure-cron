<template>
  <div class="pure-cron-component" v-if="reRender" :style="`width: ${computedWidth}`">
    <div class="pure-cron-tabs-wrapper">
      <div
        class="tab"
        :class="{active: curTab === item.prop}"
        v-for="(item, index) of tabList"
        :key="index"
        @click="curTab = item.prop">
        <span>{{item.label}}</span>
      </div>
    </div>
    <div class="pure-cron-subcomponent-wrapper">
      <keep-alive>
        <component
          class="pure-cron-subcomponent"
          :is="curComponent"
          @cronChange="onCronChange" />
      </keep-alive>
    </div>
    <div class="pure-cron-preview-wrapper">
      <span class="label">Preview: </span>
      <span class="preview">
        {{cronText}}
      </span>
    </div>
    <div class="pure-cron-operations-wrapper">
      <div class="confirm btn" @click="confirm">Confirm</div>
      <div class="clear btn" @click="clearAll">Clear</div>
    </div>
  </div>
</template>

<script>
import Second from './Second.vue';
import Minute from './Minute.vue';
import Hour from './Hour.vue';
import Day from './Day.vue';
import Month from './Month.vue';
import Week from './Week.vue';
import Year from './Year.vue';

export default {
  name: 'pure-cron',
  components: {
    Second,
    Minute,
    Hour,
    Day,
    Month,
    Week,
    Year
  },
  props: {
    width: {
      type: [String, Number],
      default: '100%',
    }
  },
  data() {
    return {
      curTab: 'second',
      tabList: [
        { prop: 'second', label: 'Second' },
        { prop: 'minute', label: 'Minute' },
        { prop: 'hour', label: 'Hour' },
        { prop: 'day', label: 'Day of M' },
        { prop: 'month', label: 'Month' },
        { prop: 'week', label: 'Day of W' },
        { prop: 'year', label: 'Year' },
      ],
      cronResult: {
        second: '',
        minute: '',
        hour: '',
        day: '',
        month: '',
        week: '',
        year: '',
      },
      reRender: true,
    };
  },
  computed: {
    computedWidth() {
      const { width } = this;
      console.log(width);
      if (typeof width === 'number' || (width && Number(width))) {
        return `${width}px`;
      }
      return width;
    },
    cronText() {
      const { cronResult } = this;
      return `${cronResult.second || '*'} ${cronResult.minute || '*'} ${cronResult.hour || '*'} ${cronResult.day || '*'} ${cronResult.month || '*'} ${cronResult.week || '?'} ${cronResult.year || '*'}`;
    },
    curComponent() {
      switch (this.curTab) {
        case 'second':
          return 'Second';
        case 'minute':
          return 'Minute';
        case 'hour':
          return 'Hour';
        case 'day':
          return 'Day';
        case 'month':
          return 'Month';
        case 'week':
          return 'Week';
        case 'year':
          return 'Year';
        default:
          return 'Second';
      }
    }
  },
  methods: {
    // cron field change
    onCronChange(val) {
      this.cronResult[val.type] = val.value;
      if (val.type === 'day') {
        this.cronResult.week = '?';
      } else if (val.type === 'week') {
        this.cronResult.day = '?';
      }
    },
    confirm() {
      this.$emit('generate', this.cronText);
    },
    clearAll() {
      // re-render component
      this.reRender = false;
      this.cronResult = {
        second: '',
        minute: '',
        hour: '',
        day: '',
        month: '',
        week: '',
        year: '',
      };
      this.$nextTick(() => {
        this.reRender = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pure-cron-component {
  min-width: 420px;
  background: $white;
  padding-bottom: 10px;
  .pure-cron-tabs-wrapper {
    display: flex;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: $light-grey;
      z-index: 1;
    }
    .tab {
      cursor: pointer;
      position: relative;
      flex: 1;
      text-align: center;
      line-height: 2.5;
      &.active::after {
        z-index: 1;
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background: $color;
        left: 0;
        bottom: 0;
      }
    }
  }
  .pure-cron-subcomponent-wrapper {
    padding: 20px 20px 0 20px;
    border-bottom: 1px solid $light-grey;
  }
  .pure-cron-preview-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    .label {
      color: $dark;
      margin-right: 8px;
    }
    .preview {
      text-align: center;
      font-weight: bold;
    }
  }
  .pure-cron-operations-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    .btn {
      cursor: pointer;
      width: 100px;
      padding: 2px;
      border: 1px solid $border;
      border-radius: 2px;
      text-align: center;
      &.confirm {
        background: $color;
        color: $white;
        border: none;
      }
    }
    .btn + .btn {
      margin-left: 40px;
    }
  }
}
</style>
