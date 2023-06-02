<template>
  <view>
    <view class="mine-user-info-container mine-container">
      <view @click="onClick" class="info-view">
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
      <view v-if="userInfo" class="settting">
        <uni-icons type="gear" :size="25" color="#333" @click="gotoPersonalInfo()"></uni-icons>
      </view>
    </view>

    <view class="list-view">
      <uni-list>
        <button open-type="getPhoneNumber" @getphonenumber="getPhone()">
          <uni-list-item :show-extra-icon="true" link showArrow extra-icon-type="phone-filled" title="绑定手机号"
            rightText="13121211212" />
        </button>
        <uni-list-item :show-extra-icon="true" link showArrow extra-icon-type="person" title="个人信息预览并分享"
          @click="gotoPreviewPersonal()" />
        <uni-list-item :show-extra-icon="true" link showArrow extra-icon-type="headphones" title="平台客服"
          @click="gotoCustomerService()" />
        <uni-list-item :show-extra-icon="true" link showArrow extra-icon-type="mail-open-filled" title="意见反馈"
          @click="gotoFeedback()" />
        <uni-list-item :show-extra-icon="true" link showArrow extra-icon-type="plus-filled" title="加入我们"
          @click="gotoJoinUs()" />
        <uni-list-item :show-extra-icon="true" link showArrow extra-icon-type="auth-filled" title="成为商户/入驻申请"
          @click="gotoSettledIn()" />
        <uni-list-item :show-extra-icon="true" link showArrow extra-icon-type="map-filled" title="用户协议"
          @click="gotoAgreement()" />
        <uni-list-item :show-extra-icon="true" link showArrow extra-icon-type="undo" title="退出登录" @click="onExit()" />
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
      return {};
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
      getPhone(e) {
        console.log(e)
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
      gotoPersonalInfo() {
        uni.navigateTo({
          url: `/packageA/pages/mine/setting/personal-info/edit`
        });
      },
      gotoJoinUs() {
        uni.navigateTo({
          url: `/packageA/pages/mine/setting/join-us/index`
        });
      },
      gotoSettledIn() {
        uni.navigateTo({
          url: `/packageA/pages/mine/setting/settled-in/index`
        });
      },
      gotoAgreement() {
        console.log('用户协议')
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

  ::v-deep .list-view button {
    padding-right: 0;
    line-height: 100%;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
    background-color: transparent;
  }

  ::v-deep .list-view button::after {
    border: 0;
  }

  .edit-avatar-icon {
    margin-right: 30rpx;
  }
</style>