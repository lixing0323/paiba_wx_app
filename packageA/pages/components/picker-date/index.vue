<template>
  <view class="date-range-container">
    <view class="icon"> <uni-icons type="calendar" size="20"></uni-icons> </view>
    <view class="start" @click="openStartPicker()"> {{ getStart() }}</view>
    <view class="symbol"> - </view>
    <view class="end" @click="openEndPicker()"> {{ getEnd() }}</view>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      start: {
        type: Array,
        default: () => []
      },
      end: {
        type: Array,
        default: () => []
      }
    },
    watch: {},
    data() {
      return {}
    },
    computed: {},
    created() {},
    methods: {
      getStart() {
        if (this.start && this.start.length > 1) {
          return this.start.join(".")
        } else {
          return '开始时间'
        }
      },
      getEnd() {
        if (this.end && this.end.length > 1) {
          return this.end.join(".")
        } else {
          return '结束时间'
        }
      },
      openStartPicker() {
        this.$emit('click-start')
      },
      openEndPicker() {
        this.$emit('click-end')
      }
    }
  };
</script>

<style lang="scss" scoped>
  .date-range-container {
    display: flex;

    .icon {
      margin-right: 20rpx;
    }

    .start {
      flex: 1;
      min-width: 120rpx;
      text-align: left;
    }

    .end {
      flex: 1;
      min-width: 120rpx;
      text-align: right;
    }
  }
</style>