<template>
  <div class="pure-cron-hour-component">
    <select-wrapper value="0" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.basic.every }}{{ lang.basic.hour }}</span>
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
        {{ lang.basic.hours }}{{ lang.hour.start[0]}}{{ lang.hour.start[1] }}
        <input
          type="number"
          placeholder="0"
          :step="incrementOptions.step"
          :min="incrementOptions.startMin"
          :max="incrementOptions.startMax"
          v-model="increment.start"
          :disabled="curSelect !== '1'"/>
        {{ lang.hour.start[2] }}
      </template>
    </select-wrapper>
    <select-wrapper value="2" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.basic.specify }}{{ lang.basic.hours }}:</span>
        <input
          type="text"
          v-model="specify"
          :placeholder="`${lang.basic.example}10,14,16`"
          :disabled="curSelect !== '2'"/>
      </template>
    </select-wrapper>
  </div>
</template>

<script>
import SelectWrapper from '@/components/SelectWrapper.vue';
import selectMixin from '@/components/selectMixin';

export default {
  name: 'pure-cron-hour-component',
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
        startMin: 0,
        startMax: 23,
        stepMin: 1,
        stepMax: 23
      },
      increment: {
        start: '0',
        step: '5',
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
        type: 'hour',
        value: newVal,
      });
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.pure-cron-hour-component {
}
</style>
