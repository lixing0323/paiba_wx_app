<template>
  <view
    :class="{'padding-bottom-170': showButton !== 'false' && isCustomer(), 'padding-bottom-40': showButton === 'false' && !isCustomer()}">
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
      :style="{height: `${imageWidth}px`}">
      <swiper-item v-for="(i, index) in banners" :key="i.id">
        <view class="swiper-item">
          <image :src="i" style="width: 100%;" mode="widthFix" />
        </view>
      </swiper-item>
    </swiper>
    <view class="introduce-box common-container">
      <view class="text-box">
        <text class="money" v-if="item.isStandard" style="font-size: 42rpx;">￥{{ item.price }}</text>
        <text class="money" v-else>{{ item.offStandardPrice }}</text>
        <view>{{ item.name }}</view>
        <view style="display: flex;align-items:center;" class="business-content-top-20">
          <view class="service-type">{{ item.oneCate.value }}</view>
          <view class="service-type" style="margin-left: 20rpx;">{{ item.isStandard ? '标准件' : '非标准件' }}</view>
        </view>
      </view>
      <view class="desc">
        <text class="label-point">●</text>
        <text style="font-weight: bold;">服务内容：</text>
        <view style="margin: 10rpx 0 20rpx 0;color: #666666;">{{ item.serviceContent }}</view>
        <text v-if="hasServiceImage()" class="label-point">●</text>
        <text v-if="hasServiceImage()" style="font-weight: bold;">详情：</text>
      </view>
    </view>
    <image v-if="hasServiceImage()" :src="item.detailImages" :style="{width: `${imageWidth}px`}" mode="widthFix" />

    <!--    服务上线1： 隐藏立即购买-->
    <view v-if="showButton !== 'false' && isCustomer()">
      <view class="submit-bt-container-fixed">
        <button type="primary" @click="gotoBuy" class="one-button">立即购买</button>
      </view>
    </view>


    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog type="error" cancelText="继续购买" confirmText="去支付" title="提醒" @close="dialogClose()"
        @confirm="dialogConfirm()">
        <view style="text-align: center;font-size: 28rpx;">
          <view>该商品已存在一笔待支付订单，</view>
          <view>您可以选择去支付或者继续购买</view>
        </view>
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import {
    getBanners
  } from '@/apis/desc';
  import {
    getServiceProductItem
  } from '@/apis/service';
  import {
    checkOrder
  } from '@/apis/order.js';
  import {
    isCustomer
  } from '@/common/roles.js';
  export default {
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        banners: [],
        item: {},
        imageWidth: undefined,
        id: undefined,
        showButton: 'false',
        orderId: undefined
      }
    },
    onLoad(params) {
      this.id = params.id
      this.showButton = params.showButton
      this.getSystem()
      this.getServiceProductItemFunc()
    },
    created() {

    },
    methods: {
      isCustomer,
      getServiceProductItemFunc() {
        getServiceProductItem(this.id).then((resp) => {
          this.item = resp
          this.banners = resp.carouselImages
        })
      },
      async getSystem() {
        const _this = this
        await uni.getSystemInfo({
          success: function(res) {
            _this.imageWidth = res.screenWidth
            uni.hideLoading()
          }
        })
      },
      gotoBuy() {
        uni.showLoading({
          mask: true
        })
        checkOrder({
          serviceProductId: this.id
        }).then(resp => {
          uni.hideLoading()
          console.log('check', resp)
          if (resp.isExist) {
            this.orderId = resp.serviceOrderId
            this.$refs.alertDialog.open()
          } else {
            this.dialogClose()
          }
        }).catch(() => (uni.hideLoading()))
      },
      hasServiceImage() {
        return this.item && this.item.detailImages
      },
      // 继续购买
      dialogClose() {
        uni.navigateTo({
          url: `/packageC/pages/order/detail?id=${this.id}`
        })
      },
      // 去支付
      dialogConfirm() {
        uni.navigateTo({
          url: `/packageC/pages/order/detail?orderId=${this.orderId}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .swiper {
    width: 100%;
  }

  .padding-bottom-170 {
    //服务上线1： 隐藏立即购买
    padding-bottom: 170rpx;
  }

  .padding-bottom-20 {
    padding-bottom: 40rpx;
  }

  .common-container {
    padding: 20rpx;
    width: calc(100% - 40rpx);
    background-color: #ffffff;
  }

  .swiper-item {
    width: 100%;
    margin: 0 auto;
    display: block;
  }

  .introduce-box {
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;

    .money {
      color: #FF7A39;
      font-weight: bold;
      font-size: 34rpx;
    }

    .text-box {
      width: 90%;
      margin-left: 1%;
      padding: 20rpx 0 20rpx 3%;
      border-bottom: 1px solid #EEEEEE;
      font-size: 30rpx;
    }

    .desc {
      padding: 20rpx 4%;
      font-size: 30rpx;
    }

    .label-point {
      color: #FF7A39;
      margin-right: 10rpx;
    }
  }

  .recommend {
    margin-top: 20rpx;
    padding: 20rpx 2%;

    .title-txt {
      font-size: 30rpx;
      font-weight: bold;
    }

    .title-image {
      height: 30rpx;
      width: auto;
      margin-left: 10rpx;
    }
  }

  .submit-bt-container-fixed {
    z-index: 9;
  }
</style>
