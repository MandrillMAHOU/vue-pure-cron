<template>
  <div class="pure-cron-week-component">
    <select-wrapper value="0" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.week.every }}{{ lang.basic.weekday }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="1" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.basic.every }}</span>
        <dropdown
          :disabled="curSelect !== '1'"
          :value="everyDay"
          :activeLang="activeLang"
          @dayChange="onEveryDayChange"/>
      </template>
    </select-wrapper>
    <select-wrapper value="2" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.week.last[0] }}</span>
        <dropdown
          :disabled="curSelect !== '2'"
          :value="lastDay"
          :activeLang="activeLang"
          @dayChange="onLastDayChange"/>
        <span>{{ lang.week.last[1] }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="3" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.week.number[0] }}</span>
        <input
          type="number"
          placeholder="1"
          :step="1"
          :min="1"
          :max="5"
          v-model="nth"
          :disabled="curSelect !== '3'"/>
        <span>{{ lang.week.number[1] }}</span>
        <dropdown
          :disabled="curSelect !== '3'"
          :value="nthDay"
          :activeLang="activeLang"
          @dayChange="onNthDayChange"/>
        <span>{{ lang.week.number[2] }}</span>
      </template>
    </select-wrapper>
  </div>
</template>

<script>
import SelectWrapper from '@/components/SelectWrapper.vue';
import Dropdown from '@/components/DropdownSelect.vue';
import selectMixin from '@/components/selectMixin';

export default {
  name: 'pure-cron-week-component',
  mixins: [selectMixin],
  components: {
    SelectWrapper,
    Dropdown,
  },
  props: {
    lang: {
      type: Object,
    },
    activeLang: {
      type: String,
      default: 'en'
    }
  },
  data() {
    return {
      everyDay: 'MON',
      lastDay: 'MON',
      nth: '1',
      nthDay: 'MON',
      dayMap: {
        SUN: 1,
        MON: 2,
        TUE: 3,
        WED: 4,
        THU: 5,
        FRI: 6,
        SAT: 7
      }
    };
  },
  computed: {
    localCrons() {
      return {
        0: '2-6',
        1: `${this.dayMap[this.everyDay]}`,
        2: `${this.dayMap[this.lastDay]}L`,
        3: `${this.dayMap[this.nthDay]}#${this.limitNum(this.nth, 1, 5)}`
      };
    },
    resCron() {
      return this.localCrons[this.curSelect];
    }
  },
  watch: {
    resCron(newVal) {
      this.$emit('cronChange', {
        type: 'week',
        value: newVal,
      });
    }
  },
  methods: {
    onEveryDayChange(val) {
      this.everyDay = val;
    },
    onLastDayChange(val) {
      this.lastDay = val;
    },
    onNthDayChange(val) {
      this.nthDay = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.pure-cron-week-component {
}
</style>
