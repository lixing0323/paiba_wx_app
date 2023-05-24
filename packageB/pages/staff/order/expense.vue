<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item asterisk direction="column" label="报销时间" content-margin-top="8px">
        <uni-datetime-picker type="datetime" :clear-icon="false" v-model="form.date" />
      </tui-form-item>

      <tui-form-item asterisk direction="column" label="报销事由" content-margin-top="8px">
        <tui-textarea isCounter autoHeight v-model="form.reason" textarea-border maxlength="200"
          placeholder="请填写报销事由" />
      </tui-form-item>
      <tui-form-item asterisk direction="column" label="上传报销凭证图片（选填，最多9张）" content-margin-top="8px">
        <template>
          <view class="input-view">
            <ht-upload-files style="width: 100%;" ref="images" :limit="9" @selection-change="onChangeImages" />
          </view>
        </template>
      </tui-form-item>
      <tui-form-item asterisk direction="column" label="报销费用合计">
        <template v-slot:right>
          <view class="amount-view">
            <uni-easyinput class="amount" type="number" v-model="form.amount"></uni-easyinput>
            <view class="unit">元</view>
          </view>
        </template>

      </tui-form-item>

      <view class="submit-button"><button type="primary" @click="submit()" :disabled="loading">提交</button></view>

      <uni-popup ref="message" type="message">
        <uni-popup-message :type="msgType" :message="messageText" :duration="1500"></uni-popup-message>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  import {
    postFeedback
  } from '@/apis/feedback.js';

  export default {
    data() {
      return {
        form: {
          amount: '',
          date: '',
          images: [],
          reason: ''
        },
        msgType: 'error',
        messageText: '',
        id: undefined,
        loading: false
      };
    },
    created() {},
    methods: {
      // 已上传的图片
      onChangeImages(images) {
        this.form.images = images;
      },
      checkValidate() {
        this.messageText = undefined;
        if (!this.form.date) {
          this.messageText = `请选择报销时间`;
        } else if (!this.form.reason) {
          this.messageText = `请填写报销理由`;
        } else if (this.form.images.length === 0) {
          this.messageText = `请上传报销凭证图片`;
        } else if (!this.form.amount) {
          this.messageText = `请填写报销费用金额`;
        }

        if (this.messageText) {
          this.msgType = 'error';
          this.$refs.message.open();
        }
      },
      // 提交
      submit() {
        uni.navigateBack()
        if (this.checkValidate()) {
          uni.navigateBack()
          // this.loading = true;
          // postFeedback(this.form)
          //   .then(() => {
          //     this.msgType = 'success';
          //     this.$refs.message.open();
          //     this.messageText = `提交成功`;
          //     this.loading = false;
          //   })
          //   .catch(() => (this.loading = false));
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .input-view {
    width: 100%;
  }

  .amount-view {
    display: flex;
    justify-content: right;
    justify-items: center;
    align-items: center;

    .amount {
      width: 300rpx;
    }

    .unit {
      margin-left: 10rpx;
    }
  }



  .submit-button {
    position: relative;
    height: 100rpx;
    margin: 20rpx auto;
  }
</style>