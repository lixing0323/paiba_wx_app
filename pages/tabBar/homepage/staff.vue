<template>
  <view>
    <ht-title title="首页"  :has-back="false"/>
    <view style="height: 100%;" :style="{paddingTop: getContentPaddingTop()}">
      <!--      <uni-search-bar ref="search" placeholder="客户名称" @confirm="search" cancelButton="none">-->
      <!--        <uni-icons slot="searchIcon" color="#9A8457" type="search" @click="search" />-->
      <!--      </uni-search-bar>-->
      <view class="page-container" style="height: 100%; padding: 0 40rpx">
        <view class="static-container" @click="viewMyCustomer">
          <view style="display: flex;align-items: flex-end;">
            <view class="left" @click="viewMyCustomer">
              <view class="value">{{ staticsInfo.customerCount }}</view>
              <view class="label">我的客户
                <image class="label-icon" :src="require('@/static/icon/arrows.png')" mode="widthFix" />
              </view>
            </view>
            <view class="center">
              <view>近日到期：<text class="warning-number">{{ staticsInfo.customerDueLoanCount }}</text></view>
              <view>近日还款：<text class="warning-number">{{ staticsInfo.customerRepayLoanCount }}</text></view>
            </view>
          </view>
        </view>
        <view class="card-margin">
          <view class="feature-container">
            <view v-for="(item, index) in featureList" :key="index" class="feature-item-container" @click="viewDetal(item)">
              <image :src="item.icon" class="feature-image" mode="widthFix" />
              <view class="feature-content">
                <view class="title"> {{ item.title }}</view>
                <view class="content">
                  <view v-if="index === 0 || index === 1" class="warning">
                    待处理：<text class="tag-warning tag">{{ staticsInfo[item.prop] }}</text>
                  </view>
                  <view v-else class="number">
                    {{ staticsInfo[item.prop] || 0 }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getStatics,
    getTest
  } from '@/apis/staff/homepage.js'
  import {
    getContentPaddingTop
  } from '@/common/filter.js'
  export default {
    data() {
      return {
        featureList: [{
            title: '客户需求',
            url: '/packageB/pages/staff/customer-req/index',
            prop: 'requirementCount',
            icon: require('@/static/icon/staff-homepage/icon4.png')
          },
          {
            title: '产品申请',
            prop: 'pendingProductApplicationCount',
            url: '/packageA/pages/common/apply-record/index',
            icon: require('@/static/icon/staff-homepage/icon1.png')
          }
        ],
        staticsInfo: undefined,
        content: undefined,
        titleHeight: '100px'
      }
    },
    created() {
    },
    methods: {
      getContentPaddingTop,
      refreshData() {
        this.getStaticsFun()
      },
      getStaticsFun() {
        getStatics().then((resp) => {
          this.staticsInfo = resp
        })
      },
      search(e) {
        console.log(e)
      },
      viewDetal(i) {
        if (i.url) {
          uni.navigateTo({
            url: i.url
          });
        }
      },
      viewMyCustomer() {
        uni.navigateTo({
          url: '/packageB/pages/staff/my-customer/index'
        });
      },
      getTitleHeight(val) {
        this.titleHeight = (val + 10) + 'px'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .page-container{
    //background-color: #000000;
  }

  .static-container {
    height: calc(260rpx);
    background-image: url('@/static/img/staff-homepage.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    //border: 1px solid $system-color;
    width: calc(100% - 80rpx);
    padding: 0 40rpx;

    .left {
      letter-spacing: 3rpx;
      margin-right: 10rpx;

      .value {
        font-size: 80rpx;
        font-weight: bold;
      }

      .label {
        font-size: 32rpx;
        display: flex;
        height: 36rpx;
        line-height: 36rpx;

        .label-icon{
          height: 36rpx;
          width: 36rpx;
          margin-left: 10rpx;
        }
      }

      uni-icons {
        font-weight: bold;
        margin-left: 5rpx;
        margin-top: -5rpx;
      }
    }

    .center {
      margin-left: 10px;
      color: #F56C6C;
      font-size: 30rpx;
      margin-bottom: -5rpx;

      .warning-number {
        font-weight: bold;
        font-size: 36rpx;
      }
    }
  }

  .feature-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .feature-item-container {
    padding: 30rpx;
    width: calc((100% - 140rpx) / 2);
    border-radius: 10rpx;
    background-color: #FFFFFF;
    margin-bottom: 20rpx;
    display: flex;

    .feature-image {
      width: 50rpx;
      height: 50rpx;
      margin-right: 20rpx;
      margin-top: 0;
    }

    .feature-content {
      flex: 1;
      width: 0;
      font-size: 30rpx;
      font-weight: bold;

      .content {
        margin-top: 10rpx;

        .warning {
          color: #F56C6C;
          letter-spacing: 3rpx;

          .tag-warning {
            font-size: $normal-font-size;
            background-color: #F56C6C;
          }
        }

        .number {
          color: $system-color;
          letter-spacing: 3rpx;
        }
      }

      .tag {
        display: inline-block;
        padding: 0rpx 18rpx;
        border-radius: 22rpx;
        color: white;
      }
    }
  }
</style>
