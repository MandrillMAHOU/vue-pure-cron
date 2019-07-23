<template>
  <div class="pure-cron-component" v-if="reRender" :style="`width: ${computedWidth}`">
    <div class="pure-cron-tabs-wrapper">
      <div
        class="tab"
        :class="{active: curTab === item.prop}"
        v-for="(item, index) of tabList"
        :key="index"
        @click="curTab = item.prop">
        <span>{{ item[activeLang] }}</span>
      </div>
    </div>
    <div class="pure-cron-operations-wrapper" v-if="showLangSwitch">
      <div
        class="language-switch"
        @click="switchLang">
        <div
          class="language-on"
          :class="activeLang">
          {{ langOptions[activeLang][activeLang] }}
        </div>
        <div
          class="language-off"
          :class="activeLang">
          {{ langOptions[inactiveLang][activeLang] }}
        </div>
      </div>
    </div>
    <div class="pure-cron-subcomponent-wrapper">
      <keep-alive>
        <component
          class="pure-cron-subcomponent"
          :is="curComponent"
          :activeLang="activeLang"
          :lang="curLang"
          @cronChange="onCronChange" />
      </keep-alive>
    </div>
    <div class="pure-cron-preview-wrapper">
      <span class="label">{{ activeLang === 'en' ? 'Preview: ' : '预览：' }}</span>
      <span class="preview">
        {{cronText}}
      </span>
      <i class="clear-icon" title="Clear exp" @click="clearAll" v-if="!showOperationPanel"></i>
    </div>
    <div class="pure-cron-btns-wrapper" v-if="showOperationPanel">
      <div class="confirm btn" @click="confirm">{{ activeLang === 'en' ? 'Confirm' : '确定' }}</div>
      <div class="clear btn" @click="clearAll">{{ activeLang === 'en' ? 'Clear' : '清除' }}</div>
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
import langs from '@/lang';

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
    },
    showOperationPanel: {
      type: Boolean,
      default: true,
    },
    defaultLang: {
      type: String,
      default: 'zh',
    },
    showLangSwitch: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      curTab: 'second',
      activeLang: this.defaultLang,
      langOptions: {
        en: { en: 'en', zh: '英' },
        zh: { en: 'zh', zh: '中' },
      },
      tabList: [
        { prop: 'second', en: 'Second', zh: '秒' },
        { prop: 'minute', en: 'Minute', zh: '分钟' },
        { prop: 'hour', en: 'Hour', zh: '小时' },
        { prop: 'day', en: 'Day of M', zh: '日期' },
        { prop: 'month', en: 'Month', zh: '月份' },
        { prop: 'week', en: 'Day of W', zh: '星期' },
        { prop: 'year', en: 'Year', zh: '年' },
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
    inactiveLang() {
      if (this.activeLang === 'en') {
        return 'zh';
      }
      return 'en';
    },
    // cur selected language strings
    curLang() {
      return langs[this.activeLang];
    },
    computedWidth() {
      const { width } = this;
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
    // switch lang
    switchLang() {
      if (this.activeLang === 'en') {
        this.activeLang = 'zh';
      } else {
        this.activeLang = 'en';
      }
    },
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
  .pure-cron-operations-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    .language-switch {
      cursor: pointer;
      height: 20px;
      width: 50px;
      border: 2px solid $light-grey;
      border-radius: 20px;
      position: relative;
      .language-on, .language-off {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        bottom: 0;
        width: 50%;
        border-radius: 20px;
      }
      .language-on {
        // transition: all .5s;
        color: $white;
        background: $color;
        &.en {
          left: 0;
        }
        &.zh {
          left: 50%;
        }
      }
      .language-off {
        color: $grey;
        &.en {
          left: 50%;
        }
        &.zh {
          left: 0;
        }
      }
    }
  }
  .pure-cron-subcomponent-wrapper {
    padding: 10px 20px 0 20px;
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
      margin-right: 15px;
    }
    .clear-icon {
      cursor: pointer;
      width: 14px;
      height: 14px;
      background: url('~@/assets/clear.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .pure-cron-btns-wrapper {
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
