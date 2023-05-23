<template>
  <view>
    <ht-pure-color-tabs :need-margin-top="false" @clickTab="clickTab" :isSecondLevelPage="true"></ht-pure-color-tabs>
    <mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick" top="50px">
      <feedbakc-card v-for="(d, index) in list" :key="index" :d="d" @viewDetail="viewDetail" />
      <uni-load-more color="#007AFF" :status="status" />
    </mescroll-uni>
  <!--  <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick">
      <ht-tabs @clickTab="clickTab" />
      <ht-card v-for="(d, index) in list" :key="index" marginBottom="20rpx">
        <feedbakc-card :d="d" @viewDetail="viewDetail" />
      </ht-card>
      <uni-load-more color="#007AFF" :status="statu -->" />
<!--    </mescroll-body>-->
    <ht-fab v-if="!isUnLoginUser() && isCustomer()" @click="createFeedback" />
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    getMyFeedbacks
  } from '@/apis/feedback.js';
  import feedbakcCard from './feedback-card.vue';
  import { isCustomer, isUnLoginUser } from '@/common/roles.js'

  // 办卡卡片组件
  export default {
    components: {
      feedbakcCard
    },
    mixins: [ListMixin],
    data() {
      return {
        isHandled: false,
        searchParams: {},
        replied: false
      };
    },
    onShow() {
      this.resetList();
    },
    methods: {
      isCustomer,
      isUnLoginUser,
      clickTab(val) {
        this.replied = val.value;
        this.mescroll.resetUpScroll();
      },
      getList(page) {
        let data = {};
        this.beforeGetList(page);
        this.listQuery.replied = this.replied;
        data = Object.assign(this.searchParams, this.listQuery);
        getMyFeedbacks(data)
          .then(res => {
            this.afterGetList(res, page);
          })
          .catch(() => this.errorList());
      },
      createFeedback() {
        uni.navigateTo({
          url: `/packageA/pages/mine/feedback/create`
        });
      },
      viewDetail(d) {
        uni.navigateTo({
          url: `/packageA/pages/mine/feedback/detail?id=${d.id}`
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .title {
    font-weight: bold;
    letter-spacing: 3rpx;

    .name {
      color: $system-color;
    }

    .mobile {
      color: black;
    }
  }

  .content {
    letter-spacing: 3rpx;

    text {
      font-weight: bold;
      color: black;
    }
  }
</style>
