<template>
  <view>
    <view class="tab-box">
      <view style="display: flex; position: relative;padding-bottom: 10px;"
            :style="{'marginTop': needMarginTop ? marginTop : 0, 'marginLeft': marginLeft, 'height': tabsHeight}"
            :class="{'center-item': isCenter}"
      >
        <view v-for="(i, index) in tabs" :key="index" :class="{'tab-item': true, 'center': isCenter}" style="position: relative;"
          :style="{'height': tabsHeight, 'lineHeight': tabsHeight}" :data-index="index" @click="onClickItem(i)">
          <view class="name" :class="{'active': isSelected === i.name}"
            :style="{'height': tabsHeight, 'lineHeight': tabsHeight}">{{ i.name }}</view>
          <view v-if="i.unReadCount && i.unReadCount > 0" class="count">{{ i.unReadCount }}</view>
        </view>
        <view class="slot" :style="{'right': slotRight, 'height': tabsHeight, 'lineHeight': tabsHeight}">
          <slot></slot>
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
      },
      needMarginTop: {
        type: Boolean,
        default: true
      },
      needMarginRight: {
        type: Boolean,
        default: true
      },
      isSecondLevelPage: {
        type: Boolean,
        default: false
      },
      initIndex: {
        type: Number,
        default: 0
      },
      isCenter: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isSelected: undefined,
        marginTop: '30px',
        marginLeft: '30px',
        tabsHeight: '40px',
        tabBoxHeight: '100px',
        slotRight: '100px'
      };
    },
    created() {
      this.getSystem()
    },
    mounted() {
      this.isSelected = this.tabs[this.initIndex].name
    },
    methods: {
      onClickItem(e) {
        this.isSelected = e.name
        this.$nextTick(() => {
          this.$emit('clickTab', e)
        })
      },
      getSystem() {
        const _this = this
        const windowWidth = uni.getSystemInfoSync().windowWidth
        const capsuleLocation = wx.getMenuButtonBoundingClientRect()
        _this.marginTop = _this.isSecondLevelPage ? `${capsuleLocation.top + capsuleLocation.height + 10}px` :
          `${capsuleLocation.top}px`
        _this.marginLeft = (windowWidth - capsuleLocation.right + 10) + 'px'
        _this.tabsHeight = capsuleLocation.height + 'px'
        _this.tabBoxHeight = (capsuleLocation.top + capsuleLocation.height + 10) + 'px'
        _this.slotRight = this.needMarginRight ? (windowWidth - capsuleLocation.left) + 'px' : 0
        this.$emit('capsuleLocation', capsuleLocation)
      }
    }
  }
</script>

<style scoped lang="scss">
  .tab-box {
    display: block;
    width: 100%;
    position: fixed;
    background-color: #ffffff;
    z-index: 999;

    .tab-item {
      font-size: 35rpx;
      display: inline-block;
      margin-right: 40rpx;

      .name {
        display: inline-block;
      }

      .count {
        display: inline-block;
        position: relative;
        top: -4rpx;
        margin-left: 10rpx;
        color: white;
        font-size: 22rpx;
        font-weight: bolder;
        letter-spacing: 0;
        height: 30rpx;
        line-height: 30rpx;
        border-radius: 18rpx;
        text-align: center;
        padding: 2rpx 13rpx;
        background-color: #F56C6C;
        align-items: center;
      }
    }

    .center-item{
      justify-content: center;
    }

    .active {
      font-weight: bold;
      color: $system-color;
      border-bottom: 5rpx solid $system-color;
    }

    .center{
      text-align: center;
      flex: 1;
    }

    .slot {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-right: 20rpx;
    }
  }
</style>
