<template>
  <view style="background-color: #FDFBFB;">
    <template v-if="location === 'TECHNOLOGY'">
      <view class="tab-box">
        <view class="tab">
          <view v-for="(i, index) in tabList" :key="i.name" :class="{'activated-tab': selectedTab.name === i.name}"
                @click="tabClick(i, index)">
            <view class="name">{{ i.name }} </view>
            <view class="line" v-if="selectedTab.name === i.name" />
          </view>
        </view>
      </view>
    </template>

    <view v-if="imageWidth" style="width: 100%;" :class="{'margin-top': location === 'TECHNOLOGY'}">
      <image style="display: block;" id="box" :src="imageUrl" mode="widthFix" :style="{width: `${imageWidth}px`}" />
    </view>
  </view>
</template>

<script>
  import {
    getDescImg
  } from "@/apis/desc";
  export default {
    name: "showIntroduceDetail",
    data() {
      return {
        imageUrl: undefined,
        location: undefined,
        imageWidth: undefined,
        tabList: [{
            name: '企业金融',
            url: 'loan-product'
          }, {
            name: '企业ERP',
            url: 'financial-product'
          },
          {
            name: '企业仓储',
            url: 'financial-product'
          },
          {
            name: '网站开发',
            url: 'financial-product'
          }
        ],
        selectedTab: undefined,
        selectedIndex: 0,
        list: []
      }
    },
    onLoad(params) {
      this.selectedTab = this.tabList[0]
      this.location = params.location;
      this.getPlatformDesc()
    },
    methods: {
      async getPlatformDesc() {
        uni.showLoading();
        this.list = await getDescImg({
          location: this.location
        });
        if (this.location === 'TECHNOLOGY') {
          this.imageUrl = this.list[this.selectedIndex].imageUrl
        } else {
          this.imageUrl = this.list[this.list.length - 1].imageUrl
        }
        await this.getSystem()
      },
      async getSystem() {
        const _this = this
        await uni.getSystemInfo({
          success: function(res) {
            _this.imageWidth = res.screenWidth
            uni.hideLoading()
          }
        })
      },
      tabClick(val, index) {
        this.selectedTab = val
        this.selectedIndex = index
        this.imageUrl = this.list[this.selectedIndex].imageUrl
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/common/business.scss';
.tab-box {
  margin: 0 auto;
  padding: 20rpx 0;
  background-color: #FDFBFB;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
  .tab {
    background-color: #FDFBFB;
    width: 98%;
    display: flex;
    margin: 0 auto;
    color: #333333;
    justify-content: space-between;
    border-bottom: 1px solid #FC6A30;

    .name {
      font-size: 30rpx;
      padding: 4rpx 10rpx;
    }

    .line {
      width: 100%;
      height: 3px;
      text-align: center;
      margin: 0rpx auto;
      border-radius: 8rpx;
      background-color: #FC6A30;
    }

    .check-more {
      font-size: 28rpx;
      color: $system-color;
    }
  }

  .margin-top {
    padding-top: 50px;
  }
  .activated-tab {
    color: #FC6A30 !important;
    font-weight: bold;
    // border-bottom: 2px solid $system-color;
  }
</style>
