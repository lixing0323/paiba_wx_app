<template>
  <ht-card>
    <view class="invite-container" @click="clickItem">
      <view class="creator">订单创建人：张三 <uni-tag circle size="mini" class="role" text="摄影师" type="primary" /></view>
      <view>邀请角色：灯光师</view>
      <view class="salary">总薪资：¥200 元<text class="day">（共2天）</text></view>
      <view class="work-date">工作时间：2023年5月1日 - 2023年6月1日</view>
      <view class="line" v-if="isMyInvited()"></view>
      <view v-if="isMyInvited()" class="status">
        <view class="left">
          订单状态：
          <uni-tag class="tag" circle size="mini" text="已完结" type="success" />
        </view>
        <view class="right">
          待评价 <text class="symbol"> > </text>
        </view>
      </view>
    </view>
  </ht-card>
</template>

<script>
  import {
    ORDER_TYPE_INVITE_ME,
    ORDER_TYPE_MY_INVETED
  } from '@/common/enum-vars.js'

  export default {
    components: {},
    props: {
      item: {
        // type: Object,
        default: undefined
      },
      type: {
        type: Number,
        default: undefined
      }
    },
    data() {
      return {}
    },
    methods: {
      // 邀请我的
      isInviteMe() {
        return this.type === ORDER_TYPE_INVITE_ME
      },
      // 我邀请的
      isMyInvited() {
        return this.type === ORDER_TYPE_MY_INVETED
      },
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

    .work-date {}

    .line {
      border-top: 1px dashed #ccc;
      margin: 8px 0;
      height: 1px;
    }

    .status {
      display: flex;
      justify-content: space-between;


      .symbol {
        margin-left: 20rpx;
      }
    }
  }
</style>