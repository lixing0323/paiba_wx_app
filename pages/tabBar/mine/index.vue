<template>
  <view>
    <view class="mine-user-info-container mine-container">
      <view @click="onClick" style="display: flex;flex: 3;align-items: center">
        <view class="user-pic">
          <image :src="userInfo.avatarUrl || require('@/static/icon/avatar.png')" />
        </view>
        <view :class="{'margin-bottom-10': userInfo, 'user-info': true}">
          <text v-if="!userInfo">请登录</text>
          <template v-else>
            <view class="info">
              <view class="label">昵称：</view>
              <view class="name" style="font-size: 26rpx;">
                {{ userInfo.nickName }}
                <view v-if="userInfo.phone" class="mobile" style="border-bottom: 1px solid #9A8457;">
                  ({{userInfo.phone}})</view>
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>

    <view class="list-view">
      <uni-list>
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="accountIcon" title="我的帐号"
          @click="gotoAccount()" />
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="serviceIcon" title="平台客服"
          @click="gotoCustomerService()" />
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="feedbackIcon" title="意见反馈"
          @click="gotoFeedback()" />
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="settingIcon" title="我的设置"
          @click="gotoSetting()" />
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="exitIcon" title="退出登录" @click="onExit()" />
      </uni-list>
    </view>
  </view>
</template>
<script>
  // 我的、
  import {
    mapGetters
  } from 'vuex';

  export default {
    components: {},
    props: {},
    data() {
      return {
        emptyImg: require('@/static/icon/avatar.png'),
        customerInfo: {},
        accountIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'staff-filled'
        },
        serviceIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'headphones'
        },
        feedbackIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'mail-open-filled'
        },
        settingIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'gear-filled'
        },
        exitIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'undo'
        }
      };
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    created() {},
    methods: {
      onClick() {
        if (!this.userInfo) {
          this.gotoLogin()
        } else {
          this.gotoAvatar()
        }
      },
      gotoAccount() {
        uni.navigateTo({
          url: `/packageA/pages/mine/account/index`
        });
      },
      gotoCustomerService() {
        uni.navigateTo({
          url: `/packageA/pages/mine/customer-service/index`
        });
      },
      gotoFeedback() {
        uni.navigateTo({
          url: `/packageA/pages/mine/feedback/index`
        });
      },
      gotoSetting() {
        uni.navigateTo({
          url: `/packageA/pages/mine/setting/index`
        });
      },
      gotoLogin() {
        uni.reLaunch({
          url: `/packageA/pages/login/index`
        });
      },
      gotoAvatar() {
        uni.navigateTo({
          url: `/packageA/pages/mine/edit/avatar`
        })
      },
      onExit() {
        uni.showModal({
          content: '你是否要退出登录？',
          confirmText: '确定',
          cancelText: '取消',
          success: res => {
            if (res.confirm) {
              uni.showToast({
                title: '退出成功！'
              });
              this.$store.dispatch('user/logout');
              uni.reLaunch({
                url: `/pages/tabBar/homepage/index`
              });
            }
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/uni-nvue.css';
  @import '@/common/business.scss';
</style>