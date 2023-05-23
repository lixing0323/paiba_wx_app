<template>
  <view>
    <ht-pure-color-tabs :init-index="currentTab" :need-margin-top="false" :need-margin-right="false"
                        @clickTab="clickTab" :tabs="tabs" is-center @capsuleLocation="getTabHeight" />
    <view :style="{paddingTop: `${tabHeight + 20}px`}">
      <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getCustomerSupports"
                     @emptyclick="emptyClick" :height="400">
        <ht-payed-service-card v-for="(s, index) in list" :key="index" :item="s" @click-item="clickItem(s)" />
      </mescroll-body>
    </view>
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
  data() {
    return{
      tabHeight: 0,
      currentTab: 0,
      tabs: [{
        name: '全部',
      }, {
        name: '未完成',
        value: 'UNFINISHED'
      }, {
        name: '已完成',
        value: 'FINISHED'
      }, {
        name: '已终止',
        value: 'TERMINATED'
      }],
    }
  },
  onLoad(params) {
    this.currentTab = this.getTabIndex(params.name)
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
    getCustomerSupports(page) {
      this.beforeGetList(page);
      this.listQuery.status = this.tabs[this.currentTab].value
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
