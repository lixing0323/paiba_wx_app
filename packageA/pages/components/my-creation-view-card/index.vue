<template>
  <view v-if="showMore">
    <view class="tui-form-container">
      <tui-form-item v-if="info.myCreationImages && info.myCreationImages.length > 0" direction="column" label="图片:"
        content-margin-top="8px">
        <template>
          <ht-upload-files ref="images" :readonly="true" />
        </template>
      </tui-form-item>
    </view>

    <view class="tui-form-container">
      <tui-form-item v-if="info.myCreationVideos && info.myCreationVideos.length > 0" direction="column" label="视频:"
        content-margin-top="8px">
        <template>
          <ht-upload-files ref="videos" fileMediatype="video" :readonly="true" />
        </template>
      </tui-form-item>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      info: {
        type: Object,
        default: () => {}
      },
      showMore: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      'info.myCreationImages': {
        handler(val) {
          if (val && val.length > 0 && this.showMore) {
            this.$nextTick(() => {
              this.$refs.images.initData(val);
            })
          }
        },
        deep: true,
        immediate: true
      },
      'info.myCreationVideos': {
        handler(val) {
          if (val && val.length > 0 && this.showMore) {
            this.$nextTick(() => {
              this.$refs.videos.initData(val);
            })
          }
        },
        deep: true,
        immediate: true
      }
    },
    data() {
      return {};
    },
    computed: {},
    onLoad() {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>