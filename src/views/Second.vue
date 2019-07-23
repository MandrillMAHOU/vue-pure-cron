<template>
  <div class="pure-cron-second-component">
    <select-wrapper value="0" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.second.zero }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="1" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        <span>{{ lang.basic.every }}{{ lang.basic.second }}</span>
      </template>
    </select-wrapper>
    <select-wrapper value="2" :curSelect="curSelect" @selectChange="onSelectChange">
      <template slot="content">
        {{ lang.basic.every2 }}
        <input
          type="number"
          placeholder="1"
          :step="incrementOptions.step"
          :min="incrementOptions.stepMin"
          :max="incrementOptions.stepMax"
          v-model="increment.step"
          :disabled="curSelect !== '2'"/>
        {{ lang.basic.seconds }}{{ lang.second.start[0 ]}}{{ lang.second.start[1] }}
        <input
          type="number"
          placeholder="0"
          :step="incrementOptions.step"
          :min="incrementOptions.startMin"
          :max="incrementOptions.startMax"
          v-model="increment.start"
          :disabled="curSelect !== '2'"/>
        {{ lang.second.start[2] }}
      </template>
    </select-wrapper>
  </div>
</template>

<script>
import SelectWrapper from '@/components/SelectWrapper.vue';
import selectMixin from '@/components/selectMixin';

export default {
  name: 'pure-cron-second-component',
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
        startMax: 59,
        stepMin: 1,
        stepMax: 59
      },
      increment: {
        start: '0',
        step: '5',
      },
    };
  },
  computed: {
    localCrons() {
      return {
        0: '0',
        1: '*',
        2: (() => {
          const { increment, incrementOptions } = this;
          let tempStart = Math.round(increment.start);
          let tempStep = Math.round(increment.step);
          tempStart = this.limitNum(tempStart, incrementOptions.startMin, incrementOptions.startMax);
          tempStep = this.limitNum(tempStep, incrementOptions.stepMin, incrementOptions.stepMax);
          return `${tempStart}/${tempStep}`;
        })(),
      };
    },
    resCron() {
      return this.localCrons[this.curSelect];
    }
  },
  watch: {
    resCron(newVal) {
      this.$emit('cronChange', {
        type: 'second',
        value: newVal,
      });
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.pure-cron-second-component {
}
</style>
