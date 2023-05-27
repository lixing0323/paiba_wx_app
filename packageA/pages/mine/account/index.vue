<template>
  <view>
    <view class="mine-user-info-container mine-container">
      <view @click="onLogin" style="display: flex;flex: 3;align-items: center">
        <view class="user-pic">
          <image :src="(userInfo && customerInfo.avatarUrl) || require('@/static/icon/avatar.png')" />
        </view>
        <view :class="{'margin-bottom-10': userInfo, 'user-info': true}">
          <view class="info">
            <view class="label">昵称：</view>
            <view class="name" style="font-size: 26rpx;">
              {{ customerInfo.fullName || '暂无' }}
              <view v-if="customerInfo.phone" class="mobile" @click="toCallPhone(customerInfo.phone)"
                style="border-bottom: 1px solid #9A8457;">
                ({{customerInfo.phone}})</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="list-view">
      <uni-list>
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="idIcon" title="会员ID"
          rightText="jsfdaf21212" />
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="phoneIcon" title="绑定手机号"
          rightText="13121211212" />
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
        emptyImg: require('@/static/icon/avatar.png'),
        customerInfo: {},
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
    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import '@/common/uni-nvue.css';
  @import '@/common/business.scss';
</style>