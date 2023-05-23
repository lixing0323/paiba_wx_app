<template>
  <view>
    <ht-title title="我的" :has-back="false" />
    <view :style="{paddingTop: getContentPaddingTop()}">
      <view class="mine-user-info-container">
        <view @click="onLogin" style="display: flex;flex: 3;align-items: center">
          <view class="user-pic">
            <image :src="(userInfo && staffInfo && staffInfo.avatarUrl) || require('@/static/img/user-profile.png')" />
          </view>
          <view :class="{'margin-bottom-10': userInfo, 'user-info': true}">
            <text v-if="!userInfo">请登录</text>
            <template v-else>
              <view class="info">
                <view class="label" style="font-weight: bold;">{{ staffInfo.fullName || '暂无' }}</view>
                <view class="name" style="font-size: 26rpx;">
                  <view v-if="staffInfo.mobile" class="mobile">{{ staffInfo.mobile }}</view>
                </view>
              </view>
            </template>
          </view>
        </view>
      </view>
      <view style="margin-top: 20rpx;">
        <view v-for="(i, index) in featureList" :index="index" :key="i.title" @click="onChangeGrid(index, i)"
          class="feature-item">
          <img :src="i.image" class="staff-feature-image" />
          <text class="service-title">{{ i.title }}</text>
        </view>
        <!-- <uni-grid :column="1" :showBorder="false" class="service-list">
          <uni-grid-item v-for="(i, index) in featureList" :index="index" :key="i.title" class="service-item"
            @tap="onChangeGrid(index, i)">
            <img :src="i.image" class="service-image" />
            <text class="service-title">{{ i.title }}</text>
          </uni-grid-item>
        </uni-grid> -->
      </view>
    </view>
  </view>
</template>

<script>
  // 我的、
  import {
    mapGetters
  } from 'vuex';
  import {
    getContentPaddingTop
  } from '@/common/filter.js'
  import {
    resetMobile,
    getUserInfo,
    getWxQRCode,
    getVersionControl
  } from '@/apis/user.js';
  import {
    setMessageCount
  } from "@/common/utils";
  import uploadImg from '@/components/ht-upload-files/upload-image.vue'
  import {
    getLoanStatistic
  } from '@/apis/my-loan.js';

  export default {
    components: {
      uploadImg
    },
    props: {
      buttonHeight: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        emptyImg: require('@/static/icon/avatar.png'),
        lists: [],
        staffInfo: undefined,
        version: undefined,
        featureList: []
      };
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    methods: {
      getContentPaddingTop,
      initGrid(version) {
        uni.showLoading()
        this.featureList = [{
          image: require('@/static/module/mine/info.png'),
          title: '个人基本信息'
        }]
        if (this.userInfo && this.token) {
          this.featureList.push({
            image: require('@/static/module/mine/qRCode.png'),
            title: '个人二维码'
          })
          this.featureList.push({
            image: require('@/static/module/mine/exit.png'),
            title: '退出登录'
          })
        }
        uni.hideLoading()
      },
      onChangeGrid(index, i) {
        let url;
        switch (this.featureList[index].title) {
          case '个人基本信息':
            url = '/packageA/pages/mine/userInfo/index'
            break;
          default:
            break;
        }
        if (this.userInfo && this.token) {
          if (url) {
            uni.navigateTo({
              url: url
            });
          } else {
            const title = this.featureList[index].title
            if (title === '退出登录') {
              this.onExit()
            } else if (title === '个人二维码') {
              this.getWxQRCodeFun()
            }
          }
        } else {
          uni.navigateTo({
            url: `/packageA/pages/login/index`
          });
        }
      },
      onLogin() {
        this.$emit('onLogin')
      },
      onExit() {
        this.$emit('onExit')
      },
      getWxQRCodeFun() {
        this.$emit('getWxQRCodeFun')
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/uni-nvue.css';
  @import '@/common/business.scss';

  .feature-item {
    background-color: #ffffff;
    margin-top: 20rpx;
    display: flex;
    align-items: center;
    padding: 20rpx 50rpx;

    .staff-feature-image {
      width: 35rpx;
      height: 35rpx;
      margin-right: 20rpx;
    }
  }
</style>
