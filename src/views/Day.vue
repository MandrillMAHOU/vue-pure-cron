<template>
  <div class="pure-cron-day-component">
    <select-wrapper value="0" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.basic.every }}{{ lang.basic.day }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="1" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.day.last }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="2" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.day.lastWeekday }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="3" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        {{ lang.basic.every2 }}
        <input
          type="number"
          placeholder="7"
          :step="incrementOptions.step"
          :min="incrementOptions.stepMin"
          :max="incrementOptions.stepMax"
          v-model="increment.step"
          :disabled="curSelect !== '3'"/>
        {{ lang.basic.days }}{{ lang.day.start[0]}}{{ lang.day.start[1] }}
        <input
          type="number"
          placeholder="1"
          :step="incrementOptions.step"
          :min="incrementOptions.startMin"
          :max="incrementOptions.startMax"
          v-model="increment.start"
          :disabled="curSelect !== '3'"/>
        {{ lang.day.start[2] }}
      </template>
    </select-wrapper>
    <select-wrapper value="4" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.day.toLast[0] }}</span>
        <input
          type="number"
          placeholder="1"
          :step="incrementOptions.step"
          :min="incrementOptions.startMin"
          :max="incrementOptions.startMax"
          v-model="toLast"
          :disabled="curSelect !== '4'"/>
        <span>{{ lang.day.toLast[1] }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="5" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.day.near[0] }}</span>
        <input
          type="number"
          placeholder="15"
          :step="incrementOptions.step"
          :min="incrementOptions.startMin"
          :max="incrementOptions.startMax"
          v-model="nearestDay"
          :disabled="curSelect !== '5'"/>
        <span>{{ lang.day.near[1] }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="6" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.basic.specify }}{{ lang.basic.dayOfMonth }}:</span>
        <input
          type="text"
          v-model="specify"
          :placeholder="`${lang.basic.example}10,20,30`"
          :disabled="curSelect !== '6'"/>
      </template>
    </select-wrapper>
  </div>
</template>

<script>
import SelectWrapper from '@/components/SelectWrapper.vue';
import selectMixin from '@/components/selectMixin';

export default {
  name: 'pure-cron-day-component',
  mixins: [selectMixin],
  components: {
    SelectWrapper,
  },
  props: {
    lang: {
      type: Object,
    }
  },
  data() {
    return {
      incrementOptions: {
        step: 1,
        startMin: 1,
        startMax: 31,
        stepMin: 1,
        stepMax: 31
      },
      increment: {
        start: '1',
        step: '7',
      },
      toLast: '1',
      nearestDay: '15',
      specify: '',
    };
  },
  computed: {
    localCrons() {
      return {
        0: '*',
        1: 'L',
        2: 'LW',
        3: (() => {
          const { increment, incrementOptions } = this;
          let tempStart = Math.round(increment.start);
          let tempStep = Math.round(increment.step);
          tempStart = this.limitNum(tempStart, incrementOptions.startMin, incrementOptions.startMax);
          tempStep = this.limitNum(tempStep, incrementOptions.stepMin, incrementOptions.stepMax);
          return `${tempStart}/${tempStep}`;
        })(),
        4: `L-${this.limitNum(this.toLast, this.incrementOptions.startMin, this.incrementOptions.startMax)}`,
        5: `${this.limitNum(this.nearestDay, this.incrementOptions.startMin, this.incrementOptions.startMax)}W`,
        6: (() => this.sortSpecifiedValues(this.specify, this.incrementOptions.startMin, this.incrementOptions.startMax))()
      };
    },
    resCron() {
      return this.localCrons[this.curSelect];
    }
  },
  watch: {
    resCron(newVal) {
      this.$emit('cronChange', {
        type: 'day',
        value: newVal,
      });
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.pure-cron-day-component {
}
</style>
