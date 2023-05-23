<template>
  <view>
    <view class="list-container" >
      <view v-for="(item, index) in list" :key="index" class="notice-container" @click="onClickViewbt(item)">
        <view class="notice-left">
          <img :src="getIcon(item)" class="notice-image" mode="widthFix">
        </view>
        <view class="notice-right">
          <text class="title">{{ item.title }}</text>
          <text class="time">{{ item.publishedAt }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  postNotices
} from '@/apis/message.js';
import {
  routerTagToPath
} from './constants.js'
import {
  isCustomer,
  isStaff
} from '@/common/roles.js'
// 消息列表
export default {
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // routerTagToPath
    };
  },
  methods: {
    // 是否是未读
    isUnRead(item) {
      return item && item.status && item.status.name === 'UNREAD';
    },
    getIcon(item) {
      return this.isUnRead(item) ? `/static/icon/notice_no_read.png` : `/static/icon/notice_has_read.png`;
    },
    onClickViewbt(item) {
      if (this.isUnRead(item)) {
        uni.showLoading();
        postNotices({ noticeId: item.id })
          .then(() => {
            uni.hideLoading();
            this.gotoDetails(item);
          })
          .catch(() => uni.hideLoading());
      } else {
        this.gotoDetails(item);
      }
    },
    gotoDetails(item) {
      uni.navigateTo({
        url: `/pages/tabBar/message/notice-detail?id=${item.id}`
      })
    },
    getTime(time) {

    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/common/business.scss';
.list-container{
  position: relative;
  background-color: #FFFFFF;
}
.notice-container{
  display: flex;
  height: 100rpx;
  padding: 30rpx;

  .notice-left{
    width: 110rpx;
    height: 100rpx;
    line-height: 150rpx;
    display: flex;
    align-items: center;
    .notice-image{
      width: 80rpx;
      height: auto;
    }
  }
  .notice-right{
    flex: 1;
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
    .title{
      flex: 1;
      width: 0;
      font-size: 32rpx;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 20rpx;
    }
    .time{
      font-size: 24rpx;
      color: #999999;
    }
  }
}
</style>
