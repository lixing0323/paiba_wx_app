<template>
  <view>
    <view class="tab-box">
      <view style="display: flex;">
        <view v-for="(i, index) in tabs" :key="index" :class="{'active': isSelected === i.name, 'tab-item': true}"
          style="position: relative;" @click="onClickItem(i)">
          {{ i.name }}
          <view v-if="i.unReadCount && i.unReadCount > 0" class="count">{{ i.unReadCount }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      tabs: {
        type: Array,
        default () {
          return [{
            name: '待处理',
            value: false
          }, {
            name: '已处理',
            value: true
          }]
        }
      }
    },
    data() {
      return {
        isSelected: undefined
      }
    },
    created() {
      this.isSelected = this.tabs[0].name
    },
    methods: {
      onClickItem(e) {
        this.isSelected = e.name
        this.$nextTick(() => {
          this.$emit('clickTab', e)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .search-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-bar {
      width: calc(100% - 80px);
    }

    .view-value {
      font-size: 28rpx;
    }
  }

  .tab-box {
    // width: 94%;
    margin: 0 auto;
    height: 80rpx;
    font-size: $normal-font-size;
  }

  .tab-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    text-align: center;
    line-height: 60rpx;
    color: #999999;
    background-color: #ffffff;
    border-radius: 5rpx;
    border-radius: 5rpx;
    letter-spacing: 5rpx;
  }
  .count {
    display: flex;
    align-items: center;
    margin-top: -10rpx;
    margin-left: -4rpx;
    height: 28rpx;
    background-color: #F56C6C;
    border-radius: 15rpx;
    padding: 2rpx 8rpx;
    font-size: 22rpx;
    line-height: 28rpx;
    color: white;
    font-weight: bolder;
    letter-spacing: 0;
  }

  .active {
    color: white;
    background-color: $system-color;
    font-weight: bolder;
    border-radius: 5rpx;
    letter-spacing: 5rpx;
  }
</style>
