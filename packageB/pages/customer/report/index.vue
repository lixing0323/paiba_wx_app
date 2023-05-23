<template>
  <view>
    <view class="business-content-padding-top-20">
      <ht-card>
        <view class="customer-container">
          <view style="display: inline-block;">
            <image class="user-pic" :src="customerPic" :data-src="customerPic"></image>
          </view>
          <view style="display: inline-block;" class="customer-info">
            <template>
              <view class="name">{{ userInfo.fullName || `用户${userInfo.starMaskMobile.slice(-4)}`}}</view>
              <view class="mobile">
                <!-- <uni-icons type="phone-filled" color="#" size="20"></uni-icons> -->
                身份证号：{{ userInfo.starMaskIdCard || '-'  }}
              </view>
              <view class="mobile">
                <!-- <uni-icons type="phone-filled" color="#" size="20"></uni-icons> -->
                手机号：{{ userInfo.starMaskMobile || '-'  }}
              </view>
            </template>
          </view>
        </view>
      </ht-card>
    </view>
    <view class="tui-form-container business-content-top-20">
      <tui-form-item padding="26rpx 0" :left="0" v-for="(i, index) in lists" :key="index" @click="checkReport(i)" :bottom-border="index < lists.length - 1">
        <template v-slot:label>
          <view class="tui-form-item">
            <view class="title">
            <span class="block">
              <image class="manger-img" :src="require(`@/static/icon/report/icon${index+1}.png`)" />
            </span>
              <span class="text">{{ i.title }}</span>
            </view>
          </view>
        </template>
      </tui-form-item>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    getMineInfo
  } from '@/apis/mine.js'
  import {
    getTabMarginTop
  } from '@/common/filter.js'
  export default {
    data() {
      return {
        ownInfo: undefined,
        zones: undefined,
        customerPic: require('@/static/img/customer.png'),
        lists: [{
            title: '经营分析',
            url: 'business/index'
          },
          {
            title: '财务分析',
            url: 'financial/index'
          },
          {
            title: '抵押物情况',
            url: 'pawn/index'
          },
          {
            title: '个人征信分析',
            url: 'credit-report/my'
          },
          {
            title: '经营背景征信分析',
            url: 'credit-report/company'
          },
          {
            title: '信用卡及担保信息',
            url: 'credit-guarantees/index'
          },
        ]
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created() {},
    methods: {
      getTabMarginTop,
      checkReport(i) {
        uni.navigateTo({
          url: `/packageB/pages/customer/report/${i.url}`
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/common/business.scss';
  .manger-img {
    width: 40rpx;
    height: 40rpx;
  }

  .customer-container {
    width: 100%;
    padding: 15rpx 0rpx 15rpx 15rpx;
    display: flex;

    .user-pic {
      width: 200rpx;
      height: 250rpx;
    }

    .customer-info {
      padding: 40rpx 3rpx 0rpx 20rpx;

      .name {
        margin-top: 15rpx;
        font-size: 40rpx;
        font-weight: bold;
        color: $system-color;
        letter-spacing: 2px;
      }

      .mobile {
        margin-top: 15rpx;
        color: $system-color;
        font-size: 28rpx;
      }
    }
  }
</style>
