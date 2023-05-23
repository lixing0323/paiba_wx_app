<template>
  <view>
    <ht-message title="提交成功" :sub-title="timeString" :src="src"></ht-message>

    <view class="submit-bt-view" style="width: 94%">
      <button type="primary" @click="goback()">返回</button>
    </view>
  </view>

</template>
<script>
  // 提交成功界面
  export default {
    components: {},
    props: {
    },
    data() {
      return {
        timer: null,
        times: 3,
        src: require("@/static/icon/finish.png"),
        path: undefined,
        isToHomepage: undefined,
        backDelta: undefined
      };
    },
    onLoad(params) {
      this.backDelta = params.backDelta ? parseInt(params.backDelta) : undefined
      if (params.path && params.id) {
        this.path = `${params.path}?id=${params.id}`
      }else if (params.path) {
        this.path = params.path
      } else if (params.isToHomepage) {
        this.path = '/pages/tabBar/homepage/index'
      }
      this.isToHomepage = params.isToHomepage
    },
    computed: {
      timeString() {
        return `${this.times} 秒后自动返回`
      }
    },
    created() {
      this.countdown()
    },
    destroyed() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    methods: {
      countdown() {
        this.timer = null
        this.timer = setInterval(() => {
          this.times--
          if (this.times <= 0) {
            clearInterval(this.timer)
            this.goback()
          }
        }, 1000)
      },
      // 返回
      goback() {
        if (this.isToHomepage) {
          uni.switchTab({
            url: this.path
          })
        } else if (this.backDelta) {
          uni.navigateBack({delta: this.backDelta})
        } else if (this.path) {
          uni.redirectTo({
            url: this.path
          })
        } else {
          uni.navigateBack()
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .finish-container {
    text-align: center;

    .image {
      margin-top: 100rpx;
      width: 260rpx;
      height: 260rpx;
    }

    .tip {
      margin-top: 100rpx;
      font-size: 60rpx;
    }

    .time {
      margin-top: 40rpx;
      font-size: 34rpx;
      color: #888888;
      margin-bottom: 40rpx;
    }
  }
</style>
