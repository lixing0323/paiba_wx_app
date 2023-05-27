<template>
  <view class="avatar-container">
    <ht-upload-files class="image" ref="images" :del-icon="false" :is-cropper="true" :limit="1"
      @selection-change="onChangeImages" />

    <view class="button">
      <button type="primary" @click="onOpenFile()">修改</button>
    </view>
  </view>
</template>

<script>
  import {
    getInformation,
    saveAvatar
  } from './var.js'

  export default {
    mixins: [],
    components: {},
    data() {
      return {
        avatarUrl: ''
      };
    },
    computed: {},
    onLoad() {
      this.getItemData()
    },
    methods: {
      getItemData() {
        this.avatarUrl = getInformation().avatarUrl || require('@/static/icon/avatar.png')
        this.$nextTick(() => {
          this.$refs.images.initData([this.avatarUrl])
        })
      },
      onChangeImages(urls) {
        this.avatarUrl = urls[0]
        saveAvatar(this.avatarUrl)
      },
      onOpenFile() {
        this.$refs.images.choose()
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .avatar-container {
    text-align: center;

    .image {
      margin-top: 100rpx;
    }

    ::v-deep .uni-file-picker__container {
      display: flex;
      justify-content: center;
    }

    ::v-deep .uni-file-picker__container .file-picker__box {
      height: 260px !important;
      width: 260px !important;
    }

    ::v-deep .uni-file-picker__container .file-picker__box-content {
      border-radius: 50% !important;
    }
  }

  .button {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 160rpx;
    margin: 0 auto;
    width: 400rpx;
  }
</style>