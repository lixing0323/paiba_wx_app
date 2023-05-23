<template>
  <view style="margin-top: 10px">
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getCustomerSupports"
                   @emptyclick="emptyClick" :height="400">
      <ht-payed-service-card v-for="(s, index) in list" :key="index" :item="s" @click-item="clickItem(s)" />
    </mescroll-body>
  </view>
</template>

<script>
import ListMixin from '@/mixins/listMixin.js';
import {
  getServiceCustomerSupportsList
} from '@/apis/service.js'

export default {
  name: "index",
  mixins: [ListMixin],
  onLoad(params) {
    this.customerId = params.id
  },
  methods: {
    getCustomerSupports(page) {
      this.beforeGetList(page);
      this.listQuery.customerId = this.customerId
      getServiceCustomerSupportsList(this.listQuery)
        .then(res => {
          this.afterGetList(res, page);
        })
        .catch(() => this.errorList());
    },
    clickItem(s) {
      uni.navigateTo({
        url: `/packageA/pages/service/write-off?id=${s.id}`
      })
    }
  }
}
</script>

<style scoped>

</style>
