<template>
  <view class="service-card-container" @click="gotoDetails">
    <view class="left">
      <img :src="item.carouselImages[0]" class="icon" mode="aspectFill">
    </view>
    <view class="right" :class="{'width-70': !orderStatus}">
      <view class="top right-item">
        <view class="name" style="flex: 1">{{ item.name }}</view>
        <view class="status" v-if="isForWriteOff"
          :class="orderStatus.name === 'FINISHED' ? 'finished' : (orderStatus.name === 'UNFINISHED' ? 'unfinished' : 'terminated')">
          {{ orderStatus.value || ''}}
        </view>
      </view>
      <!--      <view style="display: flex;width: 100%;justify-content: space-between;">-->
      <!--        <view class="name width-70" :class="{'title-no-wrap': !isForWriteOff}">{{ item.name }}</view>-->
      <!--        <view style="color: #FF7A39;width: 100rpx;text-align: right;" v-if="isForWriteOff">{{ orderStatus }}</view>-->
      <!--      </view>-->
      <view class="middle right-item">
        <view style="display: flex;">
          <view class="service-type">{{ item.oneCate.value }}</view>
          <view class="service-type" style="margin-left: 10rpx;">{{ item.isStandard ? '标准件' : '非标准件' }}</view>
        </view>
      </view>
      <view v-if="!isForWriteOff" style="color: #FF7A39;" class="business-content-top-20">
        <view class="price" v-if="item.isStandard" style="font-size: 32rpx;">￥{{ item.price }}</view>
        <view class="price" v-else>{{ item.offStandardPrice }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      item: {
        type: Object,
        default: () => {}
      },
      isForWriteOff: {
        type: Boolean,
        default: false
      },
      orderStatus: {
        type: Object,
        default: undefined
      }
    },
    data() {
      return {
        testSrc: require('@/static/icon/logo.png')
      };
    },
    methods: {
      gotoDetails(item) {
        !this.isForWriteOff ? this.$emit('click-item', item) : undefined
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .width-70 {
    width: calc(70% - 40rpx);
  }

  .price {
    font-weight: bold;
  }
</style>
