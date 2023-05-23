<template>
  <view>
    <view class="search-bar-container">
      <uni-search-bar v-model="listQuery.fullName" ref="searchBar" placeholder="搜索客户名称" border="none" @input="search"
        @clear="clear" cancelButton="none" rightSearchButton="none" bg-color="#F5F5F5">
      </uni-search-bar>
    </view>

    <mescroll-body ref="mescrollRef" top="67px" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick">
      <view v-for="(d, index) in list" :key="index" class="business-content-bottom-20">
        <customer-card :d="d" @viewDetail="viewDetail" />
      </view>
    </mescroll-body>

    <ht-fab @click="createCustomer" />
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';

  import {
    getCustomers
  } from '@/apis/staff/customer.js';
  import customerCard from '@/packageB/pages/staff/my-customer/customer-card.vue';
  import {
    mapGetters
  } from 'vuex';

  export default {
    components: {
      customerCard
    },
    mixins: [ListMixin],
    data() {
      return {};
    },
    computed: {},
    onShow() {
      this.resetList();
    },
    methods: {
      getList(page) {
        this.beforeGetList(page);
        getCustomers(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
          })
          .catch(() => this.errorList());
      },
      createCustomer() {
        uni.navigateTo({
          url: `/packageB/pages/staff/my-customer/components/customer-info/index`
        });
      },
      viewDetail(d) {
        uni.navigateTo({
          url: `/packageB/pages/staff/my-customer/detail?id=${d.id}`
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '@/common/business.scss';

  .search-bar-container {
    position: fixed;
    padding: 10px 30rpx;
    top: 0;
    z-index: 999;
    width: calc(100% - 60rpx);
    //background-color: #F5F5F5;
    background-color: #ffffff;
  }
</style>
