<template>
  <view>
    <ht-pure-color-tabs :init-index="currentTab" :need-margin-top="false" :need-margin-right="false"
      @clickTab="clickTab" :tabs="tabs" is-center @capsuleLocation="getTabHeight" />

    <view :style="{paddingTop: `${tabHeight}px`}">
      <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
        @emptyclick="emptyClick">
        <view style="margin-top: 40rpx;">
          <view v-for="(o, index) in list" :key="index" class="business-content-top-20">
            <ht-order-card ref="order" :item="o.lineItems[0]" :is-show-operation="true" :is-confirm-order="false"
              :order="o" @click-item="clickItem" @cancel-order="cancelOrder" @delete-order="deleteOrder"
              @pay-order="payOrder" />
          </view>
        </view>
      </mescroll-body>
    </view>
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  // 全部订单
  import ListMixin from '@/mixins/listMixin.js';
  import PayMixin from '@/mixins/payMixin.js'
  import {
    getServiceOrdersList,
    postServiceOrder,
    deleteServiceOrder,
    postOrderPrepay
  } from '@/apis/order.js'

  export default {
    mixins: [ListMixin, PayMixin],
    data() {
      return {
        tabHeight: 0,
        currentTab: 0,
        tabs: [{
          name: '全部',
        }, {
          name: '待付款',
          value: 'CREATED'
        }, {
          name: '已付款',
          value: 'PAY_SUCCESS'
        }, {
          name: '已取消',
          value: 'CANCELED'
        }],
        msgType: 'success',
        messageText: ''
      }
    },
    computed: {},
    onLoad(params) {
      this.currentTab = this.getTabIndex(params.name)
    },
    onShow() {
      this.initList()
    },
    methods: {
      getTabIndex(name) {
        const index = this.tabs.findIndex(item => item.name === name)
        return index !== -1 ? index : 0
      },
      getTabHeight(e) {
        this.tabHeight = e.height
      },
      clickTab(e) {
        this.currentTab = this.getTabIndex(e.name)
        this.initList()
      },
      getList(page) {
        this.beforeGetList(page);
        this.listQuery.status = this.tabs[this.currentTab].value
        getServiceOrdersList(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
          })
          .catch(() => this.errorList());
      },
      clickItem(order) {
        uni.navigateTo({
          url: `/packageC/pages/order/detail?orderId=${order.id}`
        })
      },
      cancelOrder(order) {
        const data = {
          action: 'cancel'
        }
        postServiceOrder(order.id, data).then(() => {
          this.msgType = 'success';
          this.$refs.message.open();
          this.messageText = `已成功取消订单`;
          this.initList()
        })
      },
      deleteOrder(order) {
        deleteServiceOrder(order.id).then(() => {
          this.msgType = 'success';
          this.$refs.message.open();
          this.messageText = `已成功删除订单`;
          this.initList()
        })
      },
      // 支付
      payOrder(order) {
        this.payment(order.orderNo).then(resp => {
          this.initList()
          this.msgType = 'success';
          this.messageText = `已成功支付`;
          this.$refs.message.open();
        }).catch((e) => {
          if (e === 'fail') {
            uni.hideLoading()
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
