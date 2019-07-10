<template>
  <span class="pure-cron-dropdown">
    <span
      class="dropdown-display"
      ref="dropdown"
      @click="expand = !expand">
      <span>
        {{value}}
      </span>
      <div class="icon-wrapper"></div>
      <ul class="dropdown-list" v-show="expand">
        <li
          class="list-item"
          :class="{active: item === value}"
          v-for="(item, index) of dayList"
          :key="index"
          @click="dayChange(item)">
          {{item}}
        </li>
      </ul>
    </span>
  </span>
</template>

<script>
export default {
  name: 'pure-cron-dropdown',
  props: {
    value: {
      type: String,
      default: '',
      required: true,
    }
  },
  data() {
    return {
      dayList: [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT'
      ],
      expand: false,
    };
  },
  methods: {
    dayChange(val) {
      this.$emit('dayChange', val);
    },
    initDocumentClick(event) {
      let { target } = event;
      while (target) {
        if (target === this.$refs.dropdown) {
          return;
        }
        target = target.parentElement;
      }
      this.expand = false;
    }
  },
  created() {
    document.body.addEventListener('click', this.initDocumentClick);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.initDocumentClick);
  }
};
</script>

<style lang="scss" scoped>
.pure-cron-dropdown {
  .dropdown-display {
    user-select: none;
    position: relative;
    line-height: 18px;
    border: 1px solid $border;
    border-radius: 2px;
    min-width: 60px;
    padding: 2px 0 2px 5px;
    outline: none;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    .icon-wrapper {
      width: 14px;
      height: 14px;
      background-image: url('~@/assets/calendar.png');
      background-size: contain;
      background-repeat: no-repeat;
      margin-right: 3px;
    }
    .dropdown-list {
      z-index: 10;
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
      right: 0;
      width: 100%;
      background: $white;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      border-radius: 2px;
      .list-item {
        user-select: none;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        &.active {
          color: $color;
          font-weight: bold;
        }
        &:hover {
          background: $light-blue;
        }
      }
    }
  }
  &[disabled] .dropdown-display {
    background: $bg-grey;
    * {
      color: $grey;
    }
  }
}
</style>
