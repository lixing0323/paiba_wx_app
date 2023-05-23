<template>
  <view>
    <view class="create-feedback-container business-content-padding-top-20">
      <view class="tui-form-container">
        <ht-card-title title="意见反馈" :img="require('@/static/icon/deal.png')" />
        <tui-form-item asterisk direction="column" label="反馈描述" padding="26rpx 0" :left="0" content-margin-top="8px">
          <tui-textarea isCounter autoHeight v-model="form.content" textarea-border maxlength="200" placeholder="请您填写相关的问题描述以便于我们提供更好的服务" />
        </tui-form-item>
        <tui-form-item direction="column" label="上传图片（选填，最多3张）" padding="26rpx 0" :left="0" content-margin-top="8px">
          <template>
            <view style="height: 100%;">
              <view class="input-view">
                <ht-upload-files style="width: 100%;" ref="images" :cosKey="'feedback'" :limit="3" @selection-change="onChangeImages" />
              </view>
            </view>
          </template>
        </tui-form-item>
        <tui-form-item direction="column" label="联系电话（选填）" padding="26rpx 0" :left="0" content-margin-top="8px" :bottom-border="false">
          <template>
            <view style="height: 100%;">
              <view class="input-view">
                <uni-easyinput
                  fontSize="26rpx"
                  :maxlength="11"
                  class="input-view"
                  height="40rpx"
                  v-model="form.contactPhone"
                  placeholder="联系电话"
                  @change="form.contactPhone = $event"
                />
              </view>
            </view>
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
import { postFeedback } from '@/apis/feedback.js';
import WxMessageMixin from '@/mixins/wxMessageMixin.js';

export default {
  mixins: [WxMessageMixin],
  data() {
    return {
      form: {
        content: '',
        contactPhone: '',
        images: []
      },
      msgType: 'error',
      messageText: '',
      titleStyle: {
        fontSize: '26rpx',
        fontWeight: 'bold',
        color: 'black'
      },
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

.create-feedback{
  background-color: #FFFFFF;
  padding: 0 40rpx;
}

.input-view {
  width: 100%;
  //padding-top: 20rpx;
}
.submit-button {
  position: relative;
  height: 100rpx;
  margin: 20rpx auto;
}
</style>
