<template>
  <view class="bg-img-padding">
    <view class="business-content-top-20" style="background-color: #FFFFFF">
      <view class="customer-container">
        <view style="display: inline-block;">
          <image class="customer-pic" :src="customerPic" :data-src="customerPic"></image>
        </view>
        <view style="display: inline-block;" class="customer-info">
          <template>
            <view class="name">{{ customerInfo.fullName || customerInfo.mobile }}</view>
            <view class="mobile">
              <!-- <uni-icons type="phone-filled" color="#" size="20"></uni-icons> -->
              身份证号：{{ customerInfo.idCard || '-'  }}
            </view>
            <view class="mobile">
              <!-- <uni-icons type="phone-filled" color="#" size="20"></uni-icons> -->
              手机号：
              <text v-if="customerInfo.mobile" style="color: #9A8457;border-bottom: 1px solid #9A8457;"
                    @click="phoneCall">{{ customerInfo.mobile }}</text>
              <text v-else>-</text>
            </view>
          </template>
        </view>
      </view>
    </view>
    <view class="tui-form-container business-content-top-20">
      <tui-form-item padding="26rpx 0" :left="0" v-for="(i, index) in lists" :key="index" :bottom-border="index !== lists.length -1" @click="viewDetail(i)">
        <template v-slot:label>
          <view class="tui-form-item">
            <view class="title">
              <span class="block">
                <image class="manger-img" :src="require(`@/static/icon/customer/icon${index+1}.png`)" />
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
    getCustomerWithId
  } from '@/apis/staff/customer.js'
  export default {
    data() {
      return {
        customerInfo: undefined,
        customerId: undefined,
        customerPic: require('@/static/img/customer.png'),
        lists: [{
            title: '客户资料',
            url: 'customer-info-upload/index'
          },
          {
            title: '个人基本信息',
            url: 'customer-info/index'
          },
          {
            title: '关联公司',
            url: 'business/index'
          },
          {
            title: '存款',
            url: 'deposit/index'
          },
          {
            title: '不动产',
            url: 'immovable/index'
          },
          {
            title: '动产',
            url: 'movable/index'
          },
          {
            title: '客户贷款',
            url: 'loan/index'
          },
          {
            title: '信用卡',
            url: 'credit-card/index'
          },
          {
            title: '对外担保',
            url: 'guarantee/index'
          },
          {
            title: '已购服务',
            url: 'service/index'
          }
        ]
      }
    },
    onLoad(params) {
      this.customerId = params.id;
    },
    onShow() {
      this.getItem()
    },
    methods: {
      getItem() {
        if (this.customerId) {
          uni.showLoading();
          getCustomerWithId(this.customerId)
            .then(res => {
              uni.hideLoading();
              this.customerInfo = res
            })
            .catch(() => uni.hideLoading());
        }
      },
      viewDetail(i) {
        const url = `/packageB/pages/staff/my-customer/components/${i.url}?id=${this.customerId}`
        uni.navigateTo({
          url: url
        });
      },
      phoneCall() {
        uni.makePhoneCall({
          phoneNumber: this.customerInfo.mobile
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .customer-container {
    width: 100%;
    padding: 15rpx 0rpx 15rpx 15rpx;
    display: flex;

    .customer-pic {
      width: 200rpx;
      height: 250rpx;
    }

    .customer-info {
      padding: 40rpx 3rpx 0rpx 20rpx;

      .name {
        margin: 15rpx 0;
        margin-bottom: 30rpx;
        font-size: 40rpx;
        font-weight: bold;
        color: $system-color;
        letter-spacing: 2px;
      }

      .mobile {
        margin-top: 10px;
        color: $system-color;
        font-size: 28rpx;
      }
    }
  }

  .manger-img {
    width: 36rpx;
    height: 36rpx;
  }
</style>
