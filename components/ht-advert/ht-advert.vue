<template>
  <view class="mask flex-center">
    <view class="content botton-radius">
      <view class="image">
        <swiper class="image" circular :indicator-dots="true" :autoplay="false" :interval="3000">
          <swiper-item v-for="(img, index) in imageUrls" :key="index">
            <view class="swiper-item" @click="onClick(img)"><image :src="img" style="width: 100%;height: 100%;border-radius: 10rpx;" mode="aspectFill" /></view>
          </swiper-item>
        </swiper>
      </view>
      <image class="close" :src="closeImgSrc" @click.stop="close()"></image>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    imageUrls: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      closeImgSrc: require('@/static/module/advert-close.png')
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    onClick() {}
  }
};
</script>

<style scoped>
.flex-center {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
}

.botton-radius {
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
}

.content {
  position: relative;
  top: 0;
  width: 600rpx;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 50rpx;
  font-family: Source Han Sans CN;
}

.image {
  position: absolute;
  top: -57%;
  left: 0;
  width: 600rpx;
  height: 800rpx;
  border-radius: 20rpx;
}

.swiper-item {
  width: 100%;
  display: block;
  height: 800rpx;
}

.close {
  width: 70rpx;
  height: 70rpx;
  z-index: 1000;
  position: absolute;
  bottom: -460rpx;
  left: calc(50% - 70rpx / 2);
}
</style>
