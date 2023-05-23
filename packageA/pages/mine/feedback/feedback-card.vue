<template>
  <view>
    <view class="feedback-container" @click="viewDetail(d)">
      <view class="feedback-left">
        <image src="@/static/icon/edit.png" class="icon" mode="widthFix" />
      </view>
      <view class="feedback-right">
        <view class="right-top">
          <text class="content">{{ (d.content).replace(/\n/g, '') || '-' }}</text>
          <view class="tag" :class="{'deal': d.replied, 'un-deal': !d.replied}">{{ d.replied ? '待处理' : '未处理' }}</view>
        </view>
        <view class="right-bottom">
          <text class="title">{{ d.createdAt }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

  // 办卡卡片组件
  export default {
    components: {},
    props: {
      d: {
        type: Object,
        default: undefined
      }
    },
    methods: {
      viewDetail(d) {
        this.$emit('viewDetail', d)
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .feedback-container{
    display: flex;
    padding: 40rpx 30rpx 20rpx;
    background-color: #FFFFFF;

    .feedback-left{
      width: 110rpx;
      display: flex;
      .icon{
        width: 80rpx;
        height: auto;
      }
    }
    .feedback-right{
      flex: 1;
      width: 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .right-top {
        display: flex;
        align-items: center;
        .content{
          flex: 1;
          width: 0;
          font-size: 32rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 20rpx;
        }
        .tag{
          height: 30rpx;
          line-height: 30rpx;
          min-width: 100rpx;
          text-align: center;
          padding: 6rpx 10rpx;
          border-radius: 5rpx;
          font-size: 22rpx;
        }

        .deal{
          color: #999999;
          background-color: #EEEEEE;
        }

        .un-deal{
          color: #F56C6C;
          background-color: #FEF0F0;
        }
      }

      .right-bottom{
        display: flex;
        margin-bottom: 10rpx;
        margin-top: 10rpx;
        align-items: center;
        .title{
          font-size: 28rpx;
          color: #666666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
