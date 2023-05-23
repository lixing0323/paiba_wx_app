<template>
  <view v-if="hasLogin()">
    <view v-if="isFormalVersion(version)">
      <view class="business-search-container">
        <view class="search-box">
          <view class="search-input" @click="onSearch()">
            <icon type="search" :size="18" color="#333"></icon>
            <input confirm-type="search" placeholder="搜索服务名称" placeholder-class="search-input-plholder"
              class="search-input-component" v-model.trim="key" />
          </view>
          <view class="search-sort" :class="{'active-price': descending !== -1 }" @click="clickSortPrice()">价格
            <image :src="getSortIcon()" class="sort-icon"></image>
          </view>
        </view>
      </view>
      <view class="tab-view" :style="{ top: top + 'px' }">
        <view :id="`id_${index}`" v-for="(item, index) in navMenu" :key="index" class="tab-bar-item"
          :class="[currentTab == index ? 'active' : '']" :data-current="index" @click="switchNav">
          <text>{{ item.value }}</text>
          <image v-show="index === 0" class="hot-image" src="@/static/module/fire.png" mode="heightFix" />
        </view>
      </view>
      <scroll-view scroll-y class="right-box" :style="{ paddingTop: top + 'px' }">
        <view class="page-view">
          <mescroll-body :height="`${height}px`" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
            :up="upOption" @up="getList" @emptyclick="emptyClick">
            <ht-service-card v-for="(s, index) in list" :key="index" :is-service-list="true" :item="s"
              @click-item="clickItem(s)" />
          </mescroll-body>
        </view>
      </scroll-view>
    </view>
    <view v-else>
      <image class="template-image" :src="templateImgSrc" mode="widthFix"></image>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import ListMixin from '@/mixins/listMixin.js';
  import {
    isFormalVersion
  } from '@/common/roles.js';
  import {
    getServiceProductsList,
    getServiceProductCateTree
  } from '@/apis/service.js'
  import {
    getVersionControl
  } from '@/apis/user.js';

  import {
    trim
  } from "@/common/utils";

  export default {
    mixins: [ListMixin],
    data() {
      return {
        height: 0, //scroll-view高度
        top: 0,
        currentTab: 0, //预设当前项的值
        scrollViewId: "id_0",
        key: '',
        descending: -1,
        navMenu: [],
        sort: undefined,
        version: undefined,
        templateImgSrc: 'https://financing-platform-1253330314.cos.ap-shanghai.myqcloud.com/cms/test-homepage.png'
      };
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    onLoad: function(options) {
      if (!this.hasLogin()) {
        uni.redirectTo({
          url: `/packageA/pages/login/index`
        });
      } else {
        this.getVersion()
        this.getCategory()
        this.setScreenInfo()
      }
    },
    methods: {
      hasLogin() {
        return this.token && this.userInfo
      },
      isFormalVersion,
      getVersion() {
        getVersionControl().then(resp => {
          this.version = resp
        });
      },
      setScreenInfo() {
        setTimeout(() => {
          uni.getSystemInfo({
            success: res => {
              let header = 110;
              let top = 0;
              let height = res.windowHeight - uni.upx2px(header);
              this.height = height
              this.top = top + uni.upx2px(header);
            }
          });
        }, 50);
      },
      getCategory() {
        getServiceProductCateTree().then(resp => {
          this.navMenu = [{
            value: '热门推荐'
          }].concat(resp)
        })
      },
      // 点击标题切换当前页时改变样式
      switchNav(e) {
        this.currentTab = e.currentTarget.dataset.current;
        this.search()
      },
      onSearch() {
        uni.navigateTo({
          url: `/packageC/pages/search/service`
        });
      },
      clickSortPrice() {
        // descending 1-降序 0-升序 -1恢复
        if (this.descending === -1) {
          this.descending = 0
          this.sort = 'price'
        } else if (this.descending === 0) {
          this.descending = 1
          this.sort = '-price'
        } else {
          this.descending = -1
          this.sort = undefined
        }
        this.search()
      },
      getSortIcon() {
        let icon;
        if (this.descending === -1) {
          icon = 'sort_bottom_unSelected'
        } else if (this.descending === 1) {
          icon = 'sort_bottom_selected'
        } else {
          icon = 'sort_top_selected'
        }
        return require(`@/static/icon/${icon}.png`);
      },
      getMenuName() {
        let name
        if (this.navMenu && this.navMenu.length > 0) {
          name = this.navMenu[this.currentTab].name
        }
        return name
      },
      getList(page) {
        this.beforeGetList(page);
        this.listQuery.oneCate = this.getMenuName()
        this.listQuery.isRecommend = !this.getMenuName() ? true : undefined
        this.listQuery.sort = this.sort
        getServiceProductsList(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
          })
          .catch(() => this.errorList());
      },
      clickItem(s) {
        if (!this.userInfo) {
          uni.navigateTo({
            url: `/packageA/pages/login/index`
          });
        } else {
          uni.navigateTo({
            url: `/packageA/pages/service/detail?id=${s.id}&showButton=true`
          })
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .business-search-container {
    padding: 0 15px !important;
    position: fixed;
    width: 100%;
    height: 100rpx;
    top: 0;
    z-index: 9999;

    .search-box {
      padding: 10px 0 15px 0 !important;
    }
  }

  .tab-view {
    /* height: 100%; */
    width: 200rpx;
    position: fixed;
    left: 0;
    z-index: 10;
  }

  .tab-bar-item {
    width: 200rpx;
    height: 110rpx;
    background: #f6f6f6;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #444;
    font-weight: 400;
  }

  .active {
    position: relative;
    color: $system-color;
    font-size: 30rpx;
    font-weight: 600;
    background: #fff;
  }

  .active::before {
    content: '';
    position: absolute;
    border-left: 12rpx solid $system-color;
    height: 110rpx;
    left: 0;
  }

  /* 左侧导航布局 end*/

  .right-box {
    width: 100%;
    padding-left: 200rpx;
    box-sizing: border-box;
  }

  .page-view {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .search-sort {
    color: #333;
    font-size: 28rpx;
    padding-left: 30rpx;
    width: 100rpx;
    flex-shrink: 0;
  }

  .active-price {
    color: $system-color;
  }

  .sort-icon {
    width: 28rpx;
    height: 28rpx;
    vertical-align: middle;
    margin-left: 5rpx;
    margin-bottom: 6rpx;
  }

  .hot-image {
    width: 28rpx;
    height: 28rpx;
    margin-left: 14rpx;
  }

  .template-image {
    width: 100%;
  }
</style>
