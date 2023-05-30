<template>
  <view>
    <view class="mine-user-info-container mine-container">
      <view @click="onLogin" style="display: flex;flex: 3;align-items: center">
        <view class="user-pic">
          <image :src="userInfo.avatarUrl" />
        </view>
        <view :class=" {'margin-bottom-10': userInfo, 'user-info' : true}">
          <view class="info">
            <view class="label">昵称：</view>
            <view class="name" style="font-size: 26rpx;">
              {{ userInfo.nickName }}
              <view v-if="userInfo.phone" class="mobile" style="border-bottom: 1px solid #9A8457;">
                ({{userInfo.phone}})</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="list-view">
      <uni-list>
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="idIcon" title="会员ID"
          rightText="jsfdaf21212" />
        <button open-type="getPhoneNumber" @getphonenumber="gotoPhone()">
          <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="phoneIcon" title="绑定手机号"
            rightText="13121211212" />
        </button>
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="wxIcon" title="绑定微信" rightText="mogu123" />
      </uni-list>
    </view>
  </view>
</template>
<script>
  import {
    mapGetters
  } from 'vuex';

  export default {
    components: {},
    props: {},
    data() {
      return {
        idIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'staff-filled'
        },
        phoneIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'phone-filled'
        },
        wxIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'weixin'
        }
      };
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created() {},
    methods: {
      gotoPhone() {
        uni.navigateTo({
          url: `/packageA/pages/mine/edit/phone`
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
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
</style>