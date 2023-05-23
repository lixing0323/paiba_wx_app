<template>
  <view>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList" @emptyclick="emptyClick">
      <business-list-card ref="list" :titles="TITLE_CUSTOMER_BUSINESS" cardTitle="公司"></business-list-card>
    </mescroll-body>

    <ht-fab @click="createCustomerCompany" />
  </view>
</template>

<script>
import ListMixin from '@/mixins/listMixin.js';
import businessListCard from './business-list-card.vue';
import { TITLE_CUSTOMER_BUSINESS } from '@/packageA/pages/common/titles.js';
import { getCompanies } from '@/apis/staff/customer.js';

export default {
  mixins: [ListMixin],
  components: {
    businessListCard
  },
  data() {
    return {
      TITLE_CUSTOMER_BUSINESS,
      customerId: undefined
    };
  },
  onShow() {
    this.resetList();
  },
  onLoad(params) {
    this.customerId = params.id;
  },
  methods: {
    getList(page) {
      this.beforeGetList(page);
      this.listQuery.customerId = this.customerId;
      getCompanies(this.listQuery)
        .then(res => {
          // this.initData(res)
          this.afterGetList(res);
          this.$refs.list.initList(res.items);
        })
        .catch(() => this.errorList());
    },
    createCustomerCompany() {
      uni.navigateTo({
        url: `/packageB/pages/staff/my-customer/components/business/create?id=${this.customerId}`
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
