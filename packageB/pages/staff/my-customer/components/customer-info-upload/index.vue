<template>
  <view class="business-content-top-20">
    <ht-module-card title="上传用户资料">
      <view style="padding-bottom: 20rpx;">
        <!--          <view style="font-size: 26rpx;">注意：最多可上传18张图片</view>-->
        <ht-upload-files style="width: 100%;" ref="images" :cosKey="'feedback'" :limit="18"
          @selection-change="onChangeImages" @uploadCurrentFilesToCOS="loading = true" title="注意：最多可上传18张图片" />
      </view>
    </ht-module-card>
    <view class="submit-bt-view"><button type="primary" @click="submit()" :disabled="loading">提交</button></view>
  </view>
</template>

<script>
  import {
    getCascaderChinaZones
  } from '@/apis/china-zone.js';
  import {
    postCustomerImages,
    getCustomerImages
  } from '@/apis/staff/customer.js';
  import {
    getZonesShow,
    changeZonesDataKey
  } from '@/common/filter.js';
  export default {
    data() {
      return {
        loading: false,
        images: []
      };
    },
    onLoad(params) {
      this.customerId = params.id;
      this.getImages();
    },
    onShow() {},
    methods: {
      getImages() {
        getCustomerImages({
          customerId: this.customerId
        }).then(resp => {
          let images = [];
          images = resp.map(i => i.imageUrl);
          this.$refs.images.initData(images);
        });
      },
      onChangeImages(images) {
        this.images = images;
        this.loading = false;
      },
      submit() {
        const data = {
          customerId: this.customerId,
          imageUrls: this.images
        };
        postCustomerImages(data).then(() => {
          uni.navigateTo({
            url: `/pages/loadingPage/index?backDelta=2`
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
