<template>
  <view class="background-box"
  style="background-image: url(https://financing-platform-1253330314.cos.ap-shanghai.myqcloud.com/wxapp-img/page-bg.png);"
    :style="{backgroundSize: `100% ${bgHeight + extraHeight}px`}">
    <view class="background-content" :style="{paddingTop: `${safeHeight}px`}">
      <slot name="content" />
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      extraHeight: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        barHeight: 0,
        safeHeight: 0,
        bgHeight: 0,
        windowHeight: 0
      }
    },
    created() {
      const _this = this
      wx.getSystemInfo({
        success: function(res) {
          _this.safeHeight = res.safeArea.top
          _this.bgHeight = res.windowHeight * 0.26
        }
      })
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .background-box {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    //background-size: 100% 185.7px;
    background-position: top left;
    //min-height: 123.8px;
    // margin-top: -250rpx;
  }

  .background-content {}
</style>
