<template>
  <view>
    <view class="list-container">
      <view v-for="(item, index) in list" :key="index" class="message-container" @click="onClickViewBusiness(item)">
        <view class="message-left">
          <image :src="getIcon(item)" class="message-image" mode="widthFix" />
        </view>
        <view class="message-right">
          <view class="right-top">
            <text class="title">{{ item.name }}</text>
          </view>
          <view class="right-middle">
            <view v-if="item.wxInboxContent" class="content" v-html="item.wxInboxContent"></view>
            <text v-else class="content">{{ item.inboxContent }}</text>
          </view>
          <view class="right-bottom">
            <text class="time">{{ getTime(item.createdAt) }}</text>
            <view v-if="isCanJump(item)" class="jump">点击跳转</view>
          </view>
        </view>
      </view>
    </view>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="success" message="该消息已读" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  import {
    postMessages
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
      return {};
    },
    methods: {
      // 是否是未读
      isUnRead(item) {
        return item && item.status && item.status.name === 'UNREAD';
      },
      isCanJump(item) {
        return routerTagToPath[item.tag]
      },
      getIcon(item) {
        return this.isUnRead(item) ? `/static/icon/message_no_read.png` : `/static/icon/message_has_read.png`;
      },
      onClickViewBusiness(item) {
        if (this.isUnRead(item)) {
          uni.showLoading();
          postMessages(item.id)
            .then(() => {
              uni.hideLoading();
              this.gotoBusiness(item);
            })
            .catch(() => uni.hideLoading());
        } else {
          this.gotoBusiness(item);
        }
      },
      onClickViewDetail(item) {
        this.gotoDetails(item);
      },
      gotoBusiness(item) {
        if (routerTagToPath[item.tag]) {
          uni.navigateTo({
            url: `${routerTagToPath[item.tag]}?id=${item.bizEntityId}`
          })
        } else {
          if (this.isUnRead(item)) {
            uni.showToast({
              title: `该消息已读！`,
              icon: 'none',
              duration: 3000
            });
          }
          item.status = {
            name: "READ",
            value: "已读"
          }
        }
      },
      gotoDetails(item) {
        uni.navigateTo({
          url: `/pages/tabBar/message/message-detail?id=${item.id}`
        })
      },
      getTime(time) {
        let whatTime = this.getNumberNum(new Date(time).getHours()) + ':' + this.getNumberNum(new Date(time)
          .getMinutes()) + ':' + this.getNumberNum(new Date(time).getSeconds())
        let createdAtDate = new Date(time).setHours(0, 0, 0, 0)
        let currentDate = new Date().setHours(0, 0, 0, 0)
        let differDate = currentDate - createdAtDate
        let day = differDate / (1000 * 60 * 60 * 24)
        switch (day) {
          case 0:
            return whatTime;
          case 1:
            return '昨天';
          default:
            return time;
        }
      },
      getNumberNum(num) {
        return num > 9 ? num : '0' + num
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .list-container {
    position: relative;
    background-color: #FFFFFF;
  }

  .message-container {
    display: flex;
    padding: 40rpx 30rpx 0;

    .message-left {
      width: 110rpx;
      display: flex;

      .message-image {
        width: 80rpx;
        height: auto;
      }
    }

    .message-right {
      flex: 1;
      width: 0;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .right-top {
        display: flex;
        align-items: center;

        .title {
          flex: 1;
          width: 0;
          font-size: 32rpx;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 20rpx;
        }

        .view {
          font-size: 28rpx;
          color: #999999;
        }
      }

      .right-middle {
        display: flex;
        margin-bottom: 10rpx;
        margin-top: 10rpx;

        .content {
          font-size: 28rpx;
          color: #666666;
          //overflow: hidden;
          //text-overflow: ellipsis;
          //white-space: nowrap;
        }
      }

      .right-bottom {
        display: flex;
        align-items: center;
        margin-bottom: 10rpx;

        .time {
          flex: 1;
          width: 0;
          font-size: 24rpx;
          color: #999999;
          margin-right: 20rpx;
        }

        .jump {
          font-size: 24rpx;
          padding: 5rpx 15rpx;
          background-color: #F2E7D6;
          height: 35rpx;
          border-radius: 20rpx;
        }
      }
    }
  }
</style>
