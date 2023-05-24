<template>
  <ht-card>
    <view class="invite-container" @click="clickItem">
      <view class="creator">创建人：张三 <uni-tag circle size="mini" class="role" text="摄影师" type="primary" /></view>
      <view class="invited">邀请角色：灯光师</view>
      <view class="salary">日薪资：200 元/天</view>
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

    .salary {}

    .creator {
      .role {
        margin-left: 16rpx;
      }
    }

    .invited {}

    .work-date {}
  }
</style>