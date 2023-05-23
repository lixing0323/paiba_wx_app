<template>
  <view @click.stop.prevent="openCamera">
    <image class="icon" :src="cameraImgSrc" />
    <text class="text">{{ name }}</text>
    <ht-upload-files ref="upload" class="upload-file" :cosKey="'camera'" :limit="1" @selection-change="onChange" />
  </view>
</template>

<script>
import { getCosFileUrl, sliceUploadFileOnCOS, filenameWithTimestamp } from '@/common/cos.js';
export default {
  props: {
    name: {
      type: String,
      default: '拍照识别'
    }
  },
  data() {
    return {
      cameraImgSrc: require('@/static/module/camera.png')
    };
  },
  methods: {
    openCamera() {
      this.$refs.upload.initData([]);
      this.$refs.upload.choose();
    },
    onChange(urls) {
      if (urls && urls.length > 0) {
        this.$emit('success', urls[0]);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-file {
  display: none;
}

.text {
  font-size: 30rpx;
  height: 30rpx;
  vertical-align: middle;
  //margin-right: 30rpx;
  font-weight: bold;
  color: #409eff;
}
.icon {
  font-size: 30rpx;
  height: 30rpx;
  width: 36rpx;
  font-weight: bold;
  vertical-align: middle;
  color: #409eff;
  margin-right: 20rpx;
}
</style>
