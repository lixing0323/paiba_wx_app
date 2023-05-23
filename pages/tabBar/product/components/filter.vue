<template>
  <view>
    <view class="tui-header-screen" :style="{ top: top + 'px' }">
      <view class="tui-screen-top" :style="{ height: height + 'px' }">
        <view v-for="(tab, index) in tabs" :key="index" class="tui-top-item tui-icon-ml"
          :class="[selectedIndex === index ? 'tui-active tui-bold' : '']" :data-index="index"
          @tap="onSelectedCurrentFilter">
          <view>{{ getCurrentFilterName(index) }}</view>
          <image :src="getCurrentFilterIcon(tab, index)" class="filter-icon"></image>
        </view>

        <!--下拉选择列表--综合-->
        <view class="tui-dropdownlist" :class="[dropdownHeight > 0 ? 'tui-dropdownlist-show' : '']"
          :style="{ height: dropdownHeight + 'rpx' }">
          <view class="tui-dropdownlist-item tui-icon-middle" :class="[item.selected ? 'tui-active tui-bold' : '']"
            v-for="(item, index) in dropdownList" :key="index" @tap.stop="dropdownItem" :data-index="index">
            <text class="tui-ml tui-middle">{{ item.value }}</text>
            <tui-icon name="check" :size="16" :color="activeColor" :bold="true" v-if="item.selected"></tui-icon>
          </view>
        </view>
        <view class="tui-dropdownlist-mask" :class="[dropdownHeight > 0 ? 'tui-mask-show' : '']"
          @tap.stop="hideDropdown"></view>
        <!--下拉选择列表--综合-->
      </view>
    </view>
  </view>
</template>

<script>
  import {
    deepClone
  } from '@/common/utils';

  export default {
    props: {
      top: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      tabs: {
        type: Array,
        default: () => []
      },
      dropdown: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        selectedIndex: 0,
        selectedName: '',
        dropdownHeight: 0,
        dropdownList: [],
        activeColor: '#9A8457'
      };
    },
    created() {
      if (this.tabs && this.tabs.length > 0) {
        if (this.hasDropdown()) {
          this.selectedName = this.tabs[0].name
        } else {
          this.selectedName = ''
          this.selectedIndex = -1
        }
      }

      // 下拉列表
      if (this.dropdown && this.dropdown.length > 0) {
        this.dropdownList = deepClone(this.dropdown);
      }
    },
    methods: {
      hasDropdown() {
        return this.dropdown && this.dropdown.length > 0
      },
      onSelectedCurrentFilter(e) {
        // 更新tabs
        this.selectedIndex = this.changeDescending(e.currentTarget.dataset.index);
        this.$emit("update:tabs", this.tabs)

        this.hideDropdown();
        if (this.selectedIndex == 0 && this.hasDropdown()) {
          this.showDropdown();
        } else {
          // 排序
          const obj = {}
          let value = undefined
          if (this.selectedIndex !== -1) {
            const item = this.tabs[this.selectedIndex]
            const key = item.key
            // 降序
            if (item.descending === true) {
              value = `-${key}`
            } else if (item.descending === false) {
              value = key
            }
          }
          this.$emit('sort', value)
        }
      },
      changeDescending(index) {
        let focus = index
        const change = this.selectedIndex !== index
        const item = this.tabs[index];

        if (index === 0 && this.hasDropdown()) {
          // 有下拉列表，并且选中第一个，什么都不做
        } else {
          if (item.descending) {
            // 降序点一下变成升序
            item.descending = false
          } else if (item.descending === false) {
            // 升序序点一下变成默认排序
            item.descending = undefined
            focus = -1
          } else {
            // 默认排序序点一下变成降序
            item.descending = true
          }

          if (change) {
            if (this.selectedIndex !== -1) {
              const lastItem = this.tabs[this.selectedIndex]
              lastItem.descending = undefined
            }
          }
        }
        return focus
      },
      dropdownItem(e) {
        let index = Number(e.currentTarget.dataset.index);
        for (let i = 0; i < this.dropdownList.length; i++) {
          if (i === index) {
            this.dropdownList[i].selected = true;
            this.selectedName = this.dropdownList[i].value;
          } else {
            this.dropdownList[i].selected = false;
          }
        }
        this.dropdownHeight = 0;
        this.$emit('query', this.dropdownList[index].name)
      },
      // 当前过滤tab的标签名
      getCurrentFilterName(index) {
        let name;
        if (index === 0 && this.hasDropdown()) {
          name = this.selectedName;
        } else {
          name = this.tabs[index].name
        }
        return name;
      },
      // 当前过滤tab的图标
      getCurrentFilterIcon(item, index) {
        let icon;
        if (index === 0 && this.hasDropdown()) {
          icon = this.selectedIndex === index ? 'filter_selected' : 'filter_unSelected';
        } else {
          if (item.descending === undefined) {
            icon = 'sort_bottom_unSelected'
          } else if (item.descending === true) {
            icon = 'sort_bottom_selected'
          } else {
            icon = 'sort_top_selected'
          }
        }
        return require(`@/static/icon/${icon}.png`);
      },
      showDropdown() {
        this.dropdownHeight = this.dropdown.length * 75;
      },
      hideDropdown() {
        this.dropdownHeight = 0;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .tui-header-screen {
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    position: fixed;
    z-index: 888;
  }

  .tui-screen-top,
  .tui-screen-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #333;
  }

  .tui-screen-top {
    position: relative;
    background: #fff;
  }

  .tui-top-item {
    height: 28rpx;
    line-height: 28rpx;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tui-screen-bottom {
    height: 100rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    align-items: center;
    overflow: hidden;
  }

  .tui-bold {
    font-weight: bold;
  }

  .tui-active {
    color: $system-color !important;
  }

  /*screen*/
  .tui-dropdownlist {
    width: 100%;
    position: absolute;
    background-color: #fff;
    border-bottom-left-radius: 24rpx;
    border-bottom-right-radius: 24rpx;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 10rpx;
    padding-bottom: 26rpx;
    left: 0;
    top: 88rpx;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
    z-index: 777;
  }

  .tui-dropdownlist-show {
    visibility: visible;
  }

  .tui-dropdownlist-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: -1;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }

  .tui-mask-show {
    opacity: 1;
    visibility: visible;
  }

  .tui-dropdownlist-item {
    color: #333;
    height: 70rpx;
    font-size: 28rpx;
    padding: 0 40rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filter-icon {
    width: 28rpx;
    height: 28rpx;
    vertical-align: middle;
    margin-left: 5rpx;
  }
</style>
