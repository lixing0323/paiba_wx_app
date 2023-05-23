<template>
  <view>
    <view class="feedback-detail-container business-content-padding-top-20">
      <view class="feedback-detail">
        <ht-card-title title="反馈信息"></ht-card-title>
        <tui-form-item direction="column" padding="26rpx 0" :left="0" content-margin-top="8px">
          <template v-slot:label>
            <view class="title">
              <span class="text">反馈描述：</span>
            </view>
          </template>
          <template>
            <view class="content content-column">{{ feedbackInfo.content }}</view>
          </template>
        </tui-form-item>
        <tui-form-item :direction="feedbackInfo.images && feedbackInfo.images.length > 0 ? 'column' : 'row'" padding="26rpx 0" :left="0" content-margin-top="8px">
          <template v-slot:label>
            <view class="title">
              <span class="text">图片：</span>
              <span class="content" v-if="!(feedbackInfo.images && feedbackInfo.images.length > 0)">-</span>
            </view>
          </template>
          <template v-if="feedbackInfo.images && feedbackInfo.images.length > 0">
            <upload-img :files-list="feedbackInfo.images" :readonly="true"
                        v-if="feedbackInfo.images && feedbackInfo.images.length > 0" />
            <text v-else>-</text>
          </template>
        </tui-form-item>
        <tui-form-item padding="26rpx 0" :left="0">
          <template v-slot:label>
            <view class="title">
              <span class="text">联系电话：</span>
              <span class="content">{{ feedbackInfo.contactPhone || '-' }}</span>
            </view>
          </template>
        </tui-form-item>
        <tui-form-item padding="26rpx 0" :left="0" :bottom-border="false">
          <template v-slot:label>
            <view class="title">
              <span class="text">反馈时间：</span>
              <span class="content">{{ feedbackInfo.createdAt || '-' }}</span>
            </view>
          </template>
        </tui-form-item>
      </view>
      <view class="feedback-deal" v-if="feedbackInfo.replied">
        <ht-card-title title="处理回复" :img="require('@/static/icon/deal.png')" />
        <tui-form-item direction="column" padding="26rpx 0" :left="0" content-margin-top="8px">
          <template v-slot:label>
            <view class="title">
              <span class="text">回复描述：</span>
            </view>
          </template>
          <template>
            <view class="content content-column">{{ feedbackInfo.reply.content }}</view>
          </template>
        </tui-form-item>
        <tui-form-item :direction="feedbackInfo.reply && feedbackInfo.reply.images && feedbackInfo.reply.images.length > 0 ? 'column' : 'row'" padding="26rpx 0" :left="0" content-margin-top="8px">
          <template v-slot:label>
            <view class="title">
              <span class="text">回复图片：</span>
              <span class="content" v-if="!(feedbackInfo.reply && feedbackInfo.reply.images && feedbackInfo.reply.images.length > 0 ? 'column' : 'row')">-</span>
            </view>
          </template>
          <template v-if="feedbackInfo.reply && feedbackInfo.reply.images && feedbackInfo.reply.images.length > 0 ? 'column' : 'row'">
            <upload-img :files-list="feedbackInfo.reply && feedbackInfo.reply.images" :readonly="true"
                        v-if="feedbackInfo.reply && feedbackInfo.reply.images && feedbackInfo.reply.images.length > 0" />
            <text v-else>-</text>
          </template>
        </tui-form-item>
        <tui-form-item padding="26rpx 0" :left="0" :bottom-border="false">
          <template v-slot:label>
            <view class="title">
              <span class="text">回复时间：</span>
              <span class="content">{{ feedbackInfo.reply.createdAt || '-' }}</span>
            </view>
          </template>
        </tui-form-item>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getMyFeedbackWithId
  } from '@/apis/feedback.js'
  import uploadImg from '@/components/ht-upload-files/upload-image.vue'
  import { changeImagesWithUrl } from '@/common/filter.js'

  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        id: undefined,
        feedbackInfo: {},
        titleStyle: {
          fontSize: '26rpx',
          fontWeight: 'bold',
          color: 'black'
        }
      }
    },
    onLoad(params) {
      this.id = params.id;
      this.getItem()
    },
    methods: {
      getItem() {
        if (this.id) {
          uni.showLoading();
          getMyFeedbackWithId(this.id)
            .then(res => {
              uni.hideLoading();
              this.feedbackInfo = Object.assign({}, res)
              this.feedbackInfo.images = changeImagesWithUrl(res.images)
              this.feedbackInfo.reply.images = changeImagesWithUrl(res.reply.images)
            })
            .catch(() => uni.hideLoading());
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .feedback-detail, .feedback-deal{
    background-color: #FFFFFF;
    padding: 0 40rpx;
    margin-bottom: 20rpx;

  }
  .title {
    font-weight: bold;
    color: black;
    .content{
      color: #333;
      font-weight: normal;
    }
  }
</style>
