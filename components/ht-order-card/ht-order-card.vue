<template>
  <ht-card>
    <view class="order-container" @click="clickItem">
      <view class="head">
        <view class="time">2023年5月24日</view>
        <view class="number">订单编号：12121212121212</view>
      </view>

      <view class="creator">订单创建人：张三 <uni-tag circle size="mini" class="role" text="摄影师" type="primary" /></view>
      <view class="invited">被邀请角色：李四</view>
      <view class="work-date">工作时间：2023年5月1日 - 2023年6月1日</view>
    </view>
  </ht-card>
</template>

<script>
  export default {
    components: {},
    props: {
      item: {
        // type: Object,
        default: undefined
      }
    },
    data() {
      return {}
    },
    methods: {
      clickItem() {
        this.$emit('click-item', this.order)
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .order-container {
    font-size: 28rpx;

    .head {
      display: flex;
      justify-content: space-between;
      font-size: 24rpx;
      color: #bbb;

      .time {}

      .number {}
    }

    .creator {
      .role {
        color: $system-color;
        margin-left: 16rpx;
      }
    }

    .invited {}

    .work-date {}
  }
</style>