<template>
  <div class="pure-cron-month-component">
    <select-wrapper value="0" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.basic.every }}{{ lang.basic.month }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="1" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        {{ lang.basic.every2 }}
        <input
          type="number"
          placeholder="1"
          :step="incrementOptions.step"
          :min="incrementOptions.stepMin"
          :max="incrementOptions.stepMax"
          v-model="increment.step"
          :disabled="curSelect !== '1'"/>
        {{ lang.basic.months }}{{ lang.month.start[0]}}{{ lang.month.start[1] }}
        <input
          type="number"
          placeholder="1"
          :step="incrementOptions.step"
          :min="incrementOptions.startMin"
          :max="incrementOptions.startMax"
          v-model="increment.start"
          :disabled="curSelect !== '1'"/>
        {{ lang.month.start[2] }}
      </template>
    </select-wrapper>
    <select-wrapper value="2" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.basic.specify }}{{ lang.basic.months }}:</span>
        <input
          type="text"
          v-model="specify"
          :placeholder="`${lang.basic.example}3,6,9,12`"
          :disabled="curSelect !== '2'"/>
      </template>
    </select-wrapper>
  </div>
</template>

<script>
import SelectWrapper from '@/components/SelectWrapper.vue';
import selectMixin from '@/components/selectMixin';

export default {
  name: 'pure-cron-month-component',
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
        startMax: 12,
        stepMin: 1,
        stepMax: 12
      },
      increment: {
        start: '1',
        step: '2',
      },
      specify: '',
    };
  },
  computed: {
    localCrons() {
      return {
        0: '*',
        1: (() => {
          const { increment, incrementOptions } = this;
          let tempStart = Math.round(increment.start);
          let tempStep = Math.round(increment.step);
          tempStart = this.limitNum(tempStart, incrementOptions.startMin, incrementOptions.startMax);
          tempStep = this.limitNum(tempStep, incrementOptions.stepMin, incrementOptions.stepMax);
          return `${tempStart}/${tempStep}`;
        })(),
        2: (() => this.sortSpecifiedValues(this.specify, this.incrementOptions.startMin, this.incrementOptions.startMax))()
      };
    },
    resCron() {
      return this.localCrons[this.curSelect];
    }
  },
  watch: {
    resCron(newVal) {
      this.$emit('cronChange', {
        type: 'month',
        value: newVal,
      });
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.pure-cron-month-component {
}
</style>
