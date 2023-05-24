<template>
  <view>
    <view class="create-feedback-container business-content-padding-top-20">
      <view class="tui-form-container">
        <tui-form-item asterisk direction="column" label="意见或建议" padding="26rpx 0" :left="0" content-margin-top="8px">
          <tui-textarea isCounter autoHeight v-model="form.content" textarea-border maxlength="200"
            placeholder="您的意见和建议对我们来说很重要" />
        </tui-form-item>
        <tui-form-item direction="column" label="上传图片（选填，最多3张）" padding="26rpx 0" :left="0" content-margin-top="8px">
          <template>
            <view style="height: 100%;">
              <view class="input-view">
                <ht-upload-files style="width: 100%;" ref="images" :cosKey="'feedback'" :limit="3"
                  @selection-change="onChangeImages" />
              </view>
            </view>
          </template>
        </tui-form-item>
        <tui-form-item direction="column" label="评价" padding="26rpx 0" :left="0" content-margin-top="8px"
          :bottom-border="false">
          <template>
            <ht-card>
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
          </template>
        </tui-form-item>

        <view class="submit-button"><button type="primary" @click="submit()" :disabled="loading">提交</button></view>

        <uni-popup ref="message" type="message">
          <uni-popup-message :type="msgType" :message="messageText" :duration="1500"></uni-popup-message>
        </uni-popup>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    postFeedback
  } from '@/apis/feedback.js';
  import WxMessageMixin from '@/mixins/wxMessageMixin.js';

  export default {
    mixins: [WxMessageMixin],
    data() {
      return {
        form: {
          content: '',
          contactPhone: '',
          images: [],
          attitude: 0,
          satisfaction: 0,
          professional: 0
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
      formValidate() {
        this.messageText = undefined;
        if (!this.form.content) {
          this.messageText = `请填写反馈内容`;
        }
      },
      // 提交
      submit() {
        this.formValidate();
        if (this.messageText) {
          this.msgType = 'error';
          this.$refs.message.open();
        } else {
          this.loading = true;
          postFeedback(this.form)
            .then(() => {
              this.msgType = 'success';
              this.$refs.message.open();
              this.messageText = `提交成功`;
              this.loading = false;
              this.requestMessage('FEEDBACK');
            })
            .catch(() => (this.loading = false));
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .rate-view {
    display: flex;
    justify-content: space-around;

    .left {
      text-align: right;
      flex: 2;

      .label {
        line-height: 50rpx;
        height: 50rpx;
      }
    }

    .right {
      flex: 3;
      margin-left: 20rpx;
    }
  }


  .create-feedback {
    background-color: #FFFFFF;
    padding: 0 40rpx;
  }

  .input-view {
    width: 100%;
  }

  .submit-button {
    position: relative;
    height: 100rpx;
    margin: 20rpx auto;
  }
</style>