<template>
  <ht-card v-if="info.mailRegion">
    <view class="business-view-card-container">
      <view class="row">
        <view class="label">联系人：</view>
        <view class="value school">{{ info.mailName }}</view>
      </view>
      <view class="row">
        <view class="label">手机号码：</view>
        <view class="value date">{{ info.mailPhone }}</view>
      </view>
      <view class="row">
        <view class="label">所在地区：</view>
        <view class="value">{{ info.mailRegion }}</view>
      </view>
      <view class="row">
        <view class="label">详细地址：</view>
        <view class="value">{{ info.mailAddress }}</view>
      </view>
    </view>
  </ht-card>
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