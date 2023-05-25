<template>
  <ht-card>
    <view class="invite-container" @click="clickItem">
      <view class="creator">订单创建人：张三 <uni-tag circle size="mini" class="role" text="摄影师" type="primary" /></view>
      <view class="invited">邀请角色：灯光师</view>
      <view class="salary">总薪资：¥200 元<text class="day">（共2天）</text></view>
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

  .invite-container {
    font-size: 28rpx;

    .salary {
      .day {
        font-size: 24rpx;
        color: #999;
      }
    }

    .creator {
      .role {
        margin-left: 16rpx;
      }
    }

    .invited {}

    .work-date {}
  }
</style>