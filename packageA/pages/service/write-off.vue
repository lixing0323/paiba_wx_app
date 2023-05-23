<template>
  <view>
    <view class="box business-content-top-20">
      <ht-service-card :item="order.lineItems[0]" :is-for-write-off="true" :order-status="order.status" />
      <view class="desc card-bottom business-content-top-20">
        <text class="label-point">●</text>
        <text style="font-weight: bold;">服务内容：</text>
        <view style="color: #666666;margin-top: 10rpx;">{{ order.lineItems[0].serviceContent }}</view>
      </view>
      <view class="card-bottom common-flex">
        <view style="float: right;color: #999999;">订购时间：
          <text v-if="order && order.createdAt"> {{ order.createdAt.substring(0,10) }}</text>
        </view>
        <view style="float: right;color: #999999;" @click="gotoDetail">查看详情 ></view>
      </view>
    </view>
    <view class="time-box card-bottom business-content-top-20"
      v-if="order && order.writeOffRecords && order.writeOffRecords.length > 0">
      <tui-time-axis class="business-content-top-20">
        <tui-timeaxis-item backgroundColor="transparent" v-for="(i, index) in order.writeOffRecords" :key="index">
          <template v-slot:node>
            <view :class="{'now-node': index === 0,'normal-node': index !== 0 }">●</view>
          </template>
          <template v-slot:content>
            <view>
              <view class="tui-order-title">
                <text style="margin-right: 10rpx;font-weight: bold;font-size: 30rpx;"
                  :class="{'normal-node': index !== 0,'now-node': index === 0}">{{ i.recordName }}</text>
                <text style="font-size: 26rpx;color: #999999;">{{ i.operateAt }}</text>
              </view>
              <view class="tui-order-desc business-content-top-20">
                {{ i.remark }}
              </view>
              <view class="business-content-top-20 comment">
                <text style="margin-right: 30rpx;">操作人：{{ i.operatorFullName }}</text>
                <text>操作人电话：{{ i.operatorMobile }}</text>
              </view>
              <view v-if="hasAttachments(i)" class="attachment business-content-top-20">
                <span class="comment">附件：</span>
                <view class="item" v-for="(a, aIdx) in i.attachments" :key="aIdx" @click="download(a)">
                  {{ a.filename }}
                </view>
              </view>
            </view>
          </template>
        </tui-timeaxis-item>
      </tui-time-axis>
    </view>
  </view>
</template>

<script>
  import {
    getServiceProductItem,
    getCustomerSupport
  } from '@/apis/service';
  import DownloadFileMixin from '@/mixins/downloadFileMixin.js'

  export default {
    mixins: [DownloadFileMixin],
    data() {
      return {
        product: undefined,
        order: undefined,
        id: undefined
      }
    },
    onLoad(params) {
      this.id = params.id
      this.getCustomerSupportItemFunc()
    },
    created() {

    },
    methods: {
      getCustomerSupportItemFunc() {
        getCustomerSupport(this.id).then((resp) => {
          this.order = resp
        })
      },
      gotoDetail() {
        uni.navigateTo({
          url: `/packageA/pages/service/detail?id=${this.order.lineItems[0].serviceProductId}&showButton=${false}`
        })
      },
      // 是否有附件
      hasAttachments(item) {
        return item && item.attachments.length > 0;
      },
      download(item) {
        this.doDownloadFile(item.url)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .common-flex {
    display: flex;
    justify-content: space-between;
  }

  .box {
    background-color: #ffffff;
    width: calc(100%);
  }

  .time-box {
    padding: 10rpx 0 30rpx 0;
    background-color: #ffffff;
    width: calc(100% - 60rpx);
  }

  .card-bottom {
    padding: 20rpx 30rpx 30rpx 30rpx;
  }

  .label-point {
    color: #FF7A39;
    margin-right: 10rpx;
  }

  .tui-order-desc {
    font-size: 30rpx;
    padding: 30rpx;
    min-height: 120rpx;
    min-width: 90%;
    background-color: #F7F7F7;
  }

  .now-node {
    color: #FF7A39
  }

  .normal-node {
    color: #999999;
  }

  .desc {
    font-size: 30rpx;
  }

  .comment {
    font-size: 26rpx;
    color: #999999;
  }

  .attachment {
    .item {
      margin-bottom: 10rpx;
      color: $system-color;
      text-decoration: underline;
    }
  }
</style>
