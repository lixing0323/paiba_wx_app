<template>
  <ht-card>
    <view class="order-container" @click="clickItem">
      <view class="row date">
        <view class="label">订单时间：</view>
        <view class="value">2020年5月30日</view>
      </view>
      <view class="row number">
        <view class="label">订单编号：</view>
        <view class="value">DXA1212121212</view>
      </view>

      <view class="row company">
        <view class="label">供应商：</view>
        <view class="value">***有限公司</view>
      </view>

      <view class="row range">
        <view class="label">服务时间：</view>
        <view class="value">2023年5月30日 至 2023年6月3日</view>
      </view>

      <view class="row range">
        <view class="label">服务地点：</view>
        <view class="value">陕西省西安市高新区1号</view>
      </view>

      <view class="row line"></view>
      <view class="row status">
        <view class="left">
          订单状态：
          <uni-tag class="tag" circle size="mini" text="已完结" type="success" />
        </view>
        <view class="right" @click.stop="gotoEvaluate()">
          待评价 <text class="symbol"> > </text>
        </view>
      </view>

      <view class="qr-code" @click.stop="onShare()">
        <image class="image" :src="qrCodeSrc" :data-src="qrCodeSrc" mode="widthFix"></image>
      </view>
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
      },
      invited: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        qrCodeSrc: require('@/static/icon/qrCode.png')
      }
    },
    methods: {
      clickItem() {
        this.$emit('click-item', this.order)
      },
      onShare() {
        this.$emit('click-qr-code', this.order)
      },
      gotoEvaluate() {
        uni.navigateTo({
          url: `/packageB/pages/user/order/evaluate`
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .order-container {

    .row {
      display: flex;

      .label {
        font-size: 28rpx;
        width: 150rpx;
      }

      .value {
        font-size: 24rpx;
        color: #999;
      }
    }

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

  .qr-code {
    position: absolute;
    top: 20rpx;
    right: 20rpx;

    .image {
      width: 100rpx;
      height: 100rpx;
      border: 1px solid #bbb;
    }
  }
</style>