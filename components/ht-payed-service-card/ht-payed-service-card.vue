<template>
  <view class="service-container" @click="gotoDetails">
    <view class="left">
      <img :src="item.lineItems[0].carouselImages[0]" class="icon" mode="aspectFill">
    </view>
    <view class="right">
      <view class="top right-item">
        <view class="name">{{ item.lineItems[0].name }}</view>
        <view class="status" :class="item.status.name === 'FINISHED' ? 'finished' : (item.status.name === 'UNFINISHED' ? 'unfinished' : 'terminated')">
          {{ item.status && item.status.value ? item.status.value : ''}}
        </view>
      </view>
      <view class="middle right-item">
        <view style="display: flex;">
          <view class="service-type">{{ item.lineItems[0].oneCate.value }}</view>
          <view class="service-type" style="margin-left: 10rpx;">{{ item.isStandard ? '标准件' : '非标准件' }}</view>
        </view>
      </view>
      <view class="bottom right-item">
        <view class="records">{{ `核销记录（${item.writeOffRecords.length}）`}} <view class="icon"> ></view></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "ht-payed-service-card",
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    };
  },
  methods: {
    gotoDetails(item) {
      this.$emit('click-item', item)
    },
    getClass(status) {
      return status.name === 'FINISHED' ? 'finished' : (status.value === 'UNFINISHED' ? 'unfinished' : 'terminated')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/common/business.scss';

.service-container{
  display: flex;
  padding: 20rpx 30rpx 20rpx 30rpx;
  background-color: #FFFFFF;

  .left {
    display: flex;
    align-items: center;

    .icon {
      width: 160rpx;
      height: 160rpx;
      border-radius: 10rpx;
    }
  }

  .right{
    margin-left: 20rpx;
    flex: 1;

    .right-item{
      padding: 10rpx 0;
    }

    .top{
      display: flex;
      align-items: center;
      .name{
        flex: 1;
        font-size: 30rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
      }

      .status{
        margin-left: 20rpx;
      }
      .finished{
        color: #7DC892;
      }
      .unfinished{
        color: #F56C6C;
      }
      .terminated{
        color: #999999;
      }
    }

    .middle{

    }

    .bottom{
      display: flex;
      align-items: center;
      font-size: 25rpx;
      //.time{
      //  flex: 1;
      //  color: #999999;
      //}

      .records{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        //margin-left: 20rpx;
        flex: 1;
        .icon{
          color: #999999;
        }
      }
    }
  }
}
</style>
