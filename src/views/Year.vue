<template>
  <div class="pure-cron-year-component">
    <select-wrapper value="0" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>Every year</span>
      </template>
    </select-wrapper>
    <select-wrapper value="1" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        Every
        <input
          type="number"
          placeholder="1"
          :step="incrementOptions.step"
          :min="incrementOptions.stepMin"
          :max="incrementOptions.stepMax"
          v-model="increment.step"
          :disabled="curSelect !== '1'"/>
        year(s) starting at year
        <input
          type="number"
          placeholder="1"
          :step="incrementOptions.step"
          :min="incrementOptions.startMin"
          :max="incrementOptions.startMax"
          v-model="increment.start"
          :disabled="curSelect !== '1'"/>
      </template>
    </select-wrapper>
    <select-wrapper value="2" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>Specify year(s):</span>
        <input
          type="text"
          v-model="specify"
          placeholder="Example: 2019,2021"
          :disabled="curSelect !== '2'"/>
      </template>
    </select-wrapper>
  </div>
</template>

<script>
import SelectWrapper from '@/components/SelectWrapper.vue';
import selectMixin from '@/components/selectMixin';

export default {
  name: 'pure-cron-year-component',
  mixins: [selectMixin],
  components: {
    SelectWrapper,
  },
  data() {
    return {
      incrementOptions: {
        step: 1,
        startMin: 2019,
        startMax: 2099,
        stepMin: 1,
        stepMax: 100
      },
      increment: {
        start: '2019',
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
        type: 'year',
        value: newVal,
      });
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.pure-cron-year-component {
}
</style>
