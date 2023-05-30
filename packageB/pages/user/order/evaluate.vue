<template>
  <view class="tui-form-container evaluate-container">
    <view class="margin-top-20">
      <ht-card>
        <view class="row">
          <view class="label">被邀请组别：</view>
          <view class="value">灯光组</view>
        </view>

        <view class="row">
          <view class="label">被邀请角色：</view>
          <uni-tag class="role" circle size="mini" text="灯光师" type="primary" />
        </view>

        <view class="row">
          <view class="label">被邀请人：</view>
          <view class="value">李四</view>
        </view>
      </ht-card>
    </view>

    <view class="margin-top-20">
      <ht-card>
        <view class="title">灯光组</view>
        <view class="group-container">
          <view class="item" v-for="(item, idx) in 10" :key="idx">
            <view class="avatar">
              <image class="image" :src="require('@/static/icon/avatar.png')" />
            </view>
            <view class="group">灯光师</view>
            <view class="name">李四</view>
          </view>
        </view>

        <view class="title margin-top-20">摄影组</view>
        <view class="group-container">
          <view class="item" v-for="(item, idx) in 5" :key="idx">
            <view class="avatar">
              <image class="image" :src="require('@/static/icon/avatar.png')" />
            </view>
            <view class="group">摄影师</view>
            <view class="name">张三</view>
          </view>
        </view>

        <view class="title margin-top-20">道具组</view>
        <view class="group-container">
          <view class="item" v-for="(item, idx) in 3" :key="idx">
            <view class="avatar">
              <image class="image" :src="require('@/static/icon/avatar.png')" />
            </view>
            <view class="group">道具师</view>
            <view class="name">王五</view>
          </view>
        </view>
      </ht-card>
    </view>

    <view class="margin-top-20">
      <ht-card class="margin-top-20">
        <view class="rate-view">
          <view class="left">
            <view class="label">服务态度</view>
            <view class="label">服务专业</view>
            <view class="label">满意度</view>
          </view>
          <view class="right">
            <uni-rate class="rate" v-model="form.attitude" allow-half />
            <uni-rate class="rate" v-model="form.professional" allow-half />
            <uni-rate class="rate" v-model="form.satisfaction" allow-half />
          </view>
        </view>
      </ht-card>
    </view>

    <view class="margin-top-20">
      <tui-textarea isCounter autoHeight v-model="form.content" textarea-border maxlength="200" placeholder="留言评价" />
    </view>

    <view class="submit-bt-view">
      <tui-form-button :loading="loadingBt" @click="submit()">提交</tui-form-button>
    </view>

    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="1500"></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script>
  export default {

    data() {
      return {
        id: undefined,
        items: [],
        msgType: 'error',
        messageText: '',
        loadingBt: false,
        form: {
          attitude: 0,
          satisfaction: 0,
          professional: 0,
          content: ''
        }
      }
    },
    computed: {

    },
    onLoad(params) {},
    methods: {
      checkValidate() {
        this.messageText = undefined
        let valid = true
        if (!this.form.attitude === 0) {
          this.messageText = '请给服务态度打分'
        } else if (!this.form.professional === 0) {
          this.messageText = '请给服务专业打分'
        } else if (!this.form.satisfaction === 0) {
          this.messageText = '请给满意度打分'
        }

        if (this.messageText) {
          this.$refs.message.open()
          valid = false
        }
        return valid
      },
      submit() {
        if (this.checkValidate()) {
          uni.navigateBack()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .evaluate-container {
    .row {
      display: flex;
      justify-items: center;
      justify-content: space-between;
    }

    .label {
      font-size: 28rpx;
    }

    .value {
      font-size: 24rpx;
      color: #999;
    }
  }

  .rate-view {
    display: flex;
    justify-content: space-around;

    .left {
      text-align: right;
      flex: 1;

      .label {
        line-height: 50rpx;
        height: 50rpx;
      }
    }

    .right {
      flex: 4;
      text-align: left;
      margin-left: 20rpx;
    }
  }


  .title {
    font-size: 30rpx;
  }

  .group-container {
    display: flex;
    flex-wrap: wrap;

    .item {
      margin-top: 6rpx;
      text-align: center;
      width: 120rpx;
      margin-bottom: 16rpx;
    }

    .avatar {
      .image {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
      }
    }

    .group {
      color: #bbb;
      font-size: 24rpx;
      line-height: 24rpx;
      height: 24rpx;
    }

    .name {
      color: #999;
      margin-top: 6rpx;
      font-size: 22rpx;
      line-height: 24rpx;
      height: 24rpx;
    }

  }
</style>