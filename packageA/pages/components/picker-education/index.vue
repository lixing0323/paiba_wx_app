<template>
  <view @touchmove.stop.prevent="stop()">
    <view class="tui-mask-screen" :class="[show?'tui-mask-show':'']" @tap="hide()"></view>
    <view class="tui-picker-box" :class="[show?'tui-pickerbox-show':'']">
      <view class="picker-header tui-list-item">
        <view class="btn-cancle" hover-class="tui-opcity" :hover-stay-time="150" @tap.stop="hide()">取消</view>
        <view class="title">学历</view>
        <view class="btn-sure" hover-class="tui-opcity" :hover-stay-time="150" @tap.stop="submit()">确定</view>
      </view>
      <picker-view v-if="show" indicator-style="height: 50px;" class="picker-view" :value="changeValue"
        @change="change">
        <picker-view-column>
          <view v-for="(item, index) in level1" :key="index" class="item">{{item}}</view>
        </picker-view-column>

        <picker-view-column :style="{visibility: `${hidden?'hidden':''}` }">
          <view v-for="(item, index) in level2" :key="index" class="item">{{item}}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      value: {
        type: Array,
        default: () => {
          return ['本科', '全日制']
        }
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      visible(val) {
        this.show = val

        if (this.value.length > 0) {
          this.setDefaultValue(this.value)
        }
      }
    },
    data() {
      return {
        selected: [],
        changeValue: [],
        show: false,
        hidden: false,
        level1: ['初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士'],
        level2: ['全日制', '非全日制']
      }
    },
    computed: {},
    created() {},
    methods: {
      stop() {},
      setDefaultValue(values) {
        const lv1Idx = this.level1.findIndex(item => item === values[0])
        const lv2Idx = this.level2.findIndex(item => item === values[1])
        this.changeValue = [lv1Idx, lv2Idx]
      },
      change(e) {
        this.changeValue = e.detail.value
        this.hidden = this.changeValue[0] <= 2
      },
      hide() {
        this.show = false
        this.$emit('close')
      },
      submit() {
        const lv1Item = this.level1[this.changeValue[0]]
        const lv2Item = this.level2[this.changeValue[1]]
        this.selected = this.hidden ? [lv1Item] : [lv1Item, lv2Item]
        this.show = false
        this.$emit('change', this.selected)
      }
    }
  };
</script>

<style lang="scss" scoped>
  /* picker start*/

  .tui-mask-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99996;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }

  .tui-mask-show {
    opacity: 1;
    visibility: visible;
  }

  .tui-picker-box {
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
    transform-origin: center;
    transition: all 0.3s ease-in-out;
    min-height: 20rpx;
    background: #fff;
  }

  .tui-pickerbox-show {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  .picker-header {
    width: 100%;
    height: 90rpx;
    padding: 0 46rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    font-size: 32rpx;
    background: #fff;
  }

  .tui-list-item::after {
    left: 0;
  }

  .btn-cancle {
    padding: 20rpx;
    color: #888;
  }

  .btn-sure {
    padding: 20rpx;
    color: #5677fc;
  }

  .picker-view {
    width: 100%;
    height: 200px;
  }

  .item {
    line-height: 50px;
    text-align: center;
  }

  /* picker end*/
</style>