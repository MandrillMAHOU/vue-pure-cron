<template>
  <div class="pure-cron-select-wrapper" @click="localSelect = value">
    <input type="radio" :value="value" v-model="localSelect" />
    <span
      class="custom-radio"
      :class="{checked: localSelect === value}"></span>
    <span class="select-content">
      <slot
        name="content">
      </slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'pure-cron-select-wrapper',
  props: {
    value: {
      type: String,
      default: '',
    },
    curSelect: {
      type: String,
      default: '',
    }
  },
  computed: {
    localSelect: {
      get() {
        return this.curSelect;
      },
      set(val) {
        this.$emit('selectChange', val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pure-cron-select-wrapper {
  text-align: left;
  cursor: pointer;
  line-height: 25px;
  margin-bottom: 20px;
  position: relative;
  .select-content {
    display: inline-block;
  }
  .select-content:first-letter {
    text-transform: uppercase;
  }
  input[type=radio] {
    opacity: 0;
  }
  .custom-radio {
    position: absolute;
    width: 13px;
    height: 13px;
    border: 1px solid $border;
    border-radius: 50%;
    background: $white;
    left: -1px;
    top: calc(50% - 6.5px);
    &::before {
      content: '';
      position: absolute;
      width: 9px;
      height: 9px;
      background: $white;
      border-radius: 50%;
      top: calc(50% - 4.5px);
      left: calc(50% - 4.5px);
    }
    &.checked::before {
      background: $color;
    }
  }
}
</style>
