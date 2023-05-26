<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item direction="column" label="上传图片（选填，最多9张）" content-margin-top="8px">
        <template>
          <ht-upload-files ref="images" :max-size="1024*1024*20" :limit="9" @selection-change="onChangeImages" />
          <view class="note">所上传照片均按照4000*3000像素，大小不能超过20M</view>
        </template>
      </tui-form-item>

      <tui-form-item direction="column" label="上传视频（选填，最多3个）" content-margin-top="8px">
        <template>
          <ht-upload-files fileMediatype="video" ref="videos" :max-size="1024*1024*50" :limit="3"
            @selection-change="onChangeVideos" />
          <view class="note">所上传视频均按照1920*1080码率，大小不能超过50M</view>
        </template>
      </tui-form-item>

      <view class="submit-bt-view"><button type="primary" @click="submit()" :disabled="loading">提交</button></view>

      <uni-popup ref="message" type="message">
        <uni-popup-message :type="msgType" :message="messageText" :duration="1500"></uni-popup-message>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  import {
    getMyCreation,
    saveMyCreation
  } from './var.js'

  export default {
    data() {
      return {
        form: {
          images: [],
          videos: []
        },
        msgType: 'error',
        messageText: '',
        loading: false
      };
    },
    created() {},
    onLoad() {
      this.getItemData()
    },
    methods: {
      getItemData() {
        this.form = getMyCreation()
        if (this.form.images && this.form.images.length > 0) {
          this.$nextTick(() => {
            this.$refs.images.initData(this.form.images);
          })
        }
        if (this.form.videos && this.form.videos.length > 0) {
          this.$nextTick(() => {
            this.$refs.videos.initData(this.form.videos);
          })
        }
      },
      // 已上传的图片
      onChangeImages(images) {
        this.form.images = images;
      },
      // 已上传的视频
      onChangeVideos(videos) {
        this.form.videos = videos;
      },
      // 提交
      submit() {
        saveMyCreation(this.form)
        uni.navigateBack()
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .note {
    margin-top: 10rpx;
    color: #999;
    font-size: 20rpx;
  }
</style>