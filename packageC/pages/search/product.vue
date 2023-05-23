<template>
  <view class="business-search-container">
    <view class="search-box">
      <view class="search-input">
        <icon type="search" :size="18" color="#333"></icon>
        <input confirm-type="search" placeholder="请输入银行名称或者产品名称" :focus="true" auto-focus
          placeholder-class="search-input-plholder" class="search-input-component" v-model.trim="key" @input="inputKey"
          @confirm="doSearch" />
        <icon type="clear" :size="13" color="#bcbcbc" @tap="onClearKey()" v-show="key"></icon>
      </view>
      <view class="search-cancle" @tap="goBack()">取消</view>
    </view>

    <view class="search-history" v-show="history.length > 0 && !key">
      <view class="search-history-header">
        <view class="search-history-title">历史搜索</view>
        <view class="search-icon-delete" v-show="history.length > 0" @tap="openActionSheet">
          <tui-icon name="delete" :size="14" color="#333" />
          <span class="search-text-delete">清除</span>
        </view>
      </view>
      <view class="search-history-content">
        <block v-for="(item, index) in history" :key="index">
          <tui-tag margin="0 24rpx 24rpx 0" type="gray" shape="circle" @click="onClickHistoryItem(item)">{{ item }}
          </tui-tag>
        </block>
      </view>
    </view>
    <view v-show="key">
      <view v-if="searchList.length > 0" class="search-result-box">
        <block v-for="(item, index) in searchList" :key="index">
          <view class="search-result-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="goDetails(item)">
            <view class="search-result-item-left search_content">
              <span class="search-search-bank-name"> {{ getBankName(item) }}</span>
              <span class="search-search-item-name"> {{ getProductName(item) }}</span>
            </view>
            <view class="search-result-item-right">
              <tui-tag :type="getFinancialTypeValue(item)" padding="5px 10px" size="20rpx" shape="circle">
                {{ getFinancialTypeName(item) }}
              </tui-tag>
            </view>
          </view>
        </block>
      </view>
      <view v-else>
        <ht-mescroll-empty v-if="isLoading===false" />
      </view>
    </view>

    <view class="search-hot" v-show="hot.length > 0 && !key">
      <view class="search-hot-header">
        <view class="search-hot-title">热门推荐</view>
      </view>
      <view class="search-hot-content">
        <block v-for="(item, index) in hot" :key="index">
          <tui-tag class="search-hot-tag-button" margin="0 24rpx 24rpx 0" type="gray" shape="circle"
            @click="onClickHistoryItem(item)">
            <view class="search-hot-tag-text">{{ item }}</view>
          </tui-tag>
        </block>
      </view>
    </view>

    <tui-actionsheet :show="showActionSheet" :tips="tips" @click="onClearHistory()" @cancel="closeActionSheet">
    </tui-actionsheet>
  </view>
</template>

<script>
  import {
    replaceAll,
    trim
  } from '@/common/utils.js';
  import {
    getProductOfSearching,
    postProductOfSearchHistory,
    getProductOfSearchHistory,
    getProductOfSearchHot
  } from '@/apis/search.js'

  export default {
    data() {
      return {
        history: [],
        hot: [],
        key: '',
        showActionSheet: false,
        tips: '确认清空搜索历史吗？',
        searchResult: ['按照展示的列表输入关键词看效果', 'thorui', '2019退役球星', '搜索关键词高亮显示', '模拟搜索结果集', '开源不易，需要鼓励', '人人为我，我为人人'],
        searchList: [],
        isLoading: false
      };
    },
    onLoad() {
      this.getHistoryList()
      this.getHotList()
    },
    created() {},
    methods: {
      getHistoryList() {
        getProductOfSearchHistory().then(resp => {
          this.history = resp
        })
      },
      getHotList() {
        getProductOfSearchHot().then(resp => {
          this.hot = resp
        })
      },
      goBack() {
        uni.navigateBack();
      },
      onClearKey() {
        this.key = '';
      },
      closeActionSheet() {
        this.showActionSheet = false;
      },
      openActionSheet() {
        this.showActionSheet = true;
      },
      onClearHistory(e) {
        let index = e.index;
        if (index == 0) {
          postProductOfSearchHistory({
            action: 'clear'
          }).then(() => {
            this.showActionSheet = false;
            this.history = [];
          })
        }
      },
      doSearch() {
        postProductOfSearchHistory({
          keyword: this.key,
          action: 'add'
        }).then(() => {})
      },
      onClickHistoryItem(item) {
        this.key = item
        this.searching()
      },
      inputKey(e) {
        this.key = trim(e.detail.value);
        if (!this.key) {
          this.searchList = [];
        } else {
          this.searching()
        }
      },
      // 根据关键词查找
      searching() {
        this.isLoading = true
        getProductOfSearching({
          keyword: this.key
        }).then(resp => {
          this.isLoading = false
          this.searchList = [...resp.DEPOSIT, ...resp.FINANCIAL, ...resp.LOAN]
        }).catch(() => (this.isLoading = false))
      },
      getProductName(item) {
        let name = ''
        if (item.name) {
          name = item.name
        }
        return name
      },
      getBankName(item) {
        let name = ''
        if (item && item.fiComposite) {
          name = item.fiComposite.fiName
        }
        return name
      },
      getFinancialTypeName(item) {
        let name = ''
        if (item && item.financialType && item.financialType) {
          name = item.financialType.value
        }
        return name
      },
      getFinancialTypeValue(item) {
        const name = this.getFinancialTypeName(item)
        let type = 'light-orange'
        if (name === '存款') {
          type = 'warning'
        } else if (name === '理财') {
          type = 'danger'
        }
        return type
      },
      goDetails(item) {
        const name = this.getFinancialTypeName(item)
        let url
        if (name === '贷款') {
          url = `/packageA/pages/common/loan-product/detail?id=${item.id}`
        } else {
          url = `/packageA/pages/common/financial-product/detail?id=${item.id}`
        }

        if (name && url) {
          uni.redirectTo({
            url: url
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
