<template>
  <ht-card v-if="info.contactName">
    <view class="business-view-card-container">
      <view class="row">
        <view class="label">联系人姓名：</view>
        <view class="value school">{{ info.contactName }}</view>
      </view>
      <view class="row">
        <view class="label">与本人关系：</view>
        <view class="value date">{{ info.contactRelation }}</view>
      </view>
      <view class="row">
        <view class="label">联系人电话：</view>
        <view class="value">{{ info.contactPhone }}</view>
      </view>
      <view class="row">
        <view class="label">联系人住址：</view>
        <view class="value">{{ info.contactAddress }}</view>
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