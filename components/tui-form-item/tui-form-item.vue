<template>
  <view class="tui-form__item-wrap" :class="{'tui-form__highlight':highlight, 'tui-form-flex': direction === 'row' }"
    :style="{padding:padding,background:background,marginTop:marginTop+'rpx',marginBottom:marginBottom+'rpx',borderRadius:radius}"
    @tap="handleClick">
    <view class="row-content">
      <view class="left-content">
        <span class="tui-form__asterisk" v-if="asterisk" :style="{color:asteriskColor}">*</span>
        <text :style="{fontWeight:'bold', fontSize:labelSize+'rpx',color:labelColor,paddingRight:labelRight+'rpx'}"
          v-if="label">{{label}}</text>
        <slot name="label"></slot>
        <slot name="left"></slot>
      </view>
      <view class="right-content">
        <view class="tui-form__item-right" @click="clickRightContent()">
          <view v-if="rightContent" :style="{'color': rightContentColor}">
            {{ rightContent }}
          </view>
          <slot v-else name="right"></slot>
        </view>
        <view v-if="bottomBorder" :style="{background:borderColor,left:left+'rpx',right:right+'rpx'}"
          class="tui-form__item-bottom"></view>
        <view class="tui-form__item-arrow" v-if="arrow" :style="{'border-color':arrowColor}">
        </view>
      </view>
    </view>

    <view class="tui-form__item-content" :style="{'marginTop': contentMarginTop}">
      <slot></slot>
    </view>

  </view>
</template>

<script>
  export default {
    name: 'tui-form-item',
    emits: ['click'],
    props: {
      padding: {
        type: String,
        default: '26rpx 0'
      },
      marginTop: {
        type: [Number, String],
        default: 0
      },
      marginBottom: {
        type: [Number, String],
        default: 0
      },
      label: {
        type: String,
        default: ''
      },
      labelSize: {
        type: [Number, String],
        default: 28
      },
      labelColor: {
        type: String,
        default: '#333'
      },
      labelRight: {
        type: [Number, String],
        default: 16
      },
      rightContent: {
        type: String,
        default: undefined
      },
      asterisk: {
        type: Boolean,
        default: false
      },
      asteriskColor: {
        type: String,
        default: '#EB0909'
      },
      background: {
        type: String,
        default: '#fff'
      },
      highlight: {
        type: Boolean,
        default: false
      },
      arrow: {
        type: Boolean,
        default: false
      },
      arrowColor: {
        type: String,
        default: '#E5E5E5'
      },
      bottomBorder: {
        type: Boolean,
        default: true
      },
      borderColor: {
        type: String,
        default: '#eaeef1'
      },
      left: {
        type: [Number, String],
        default: 0
      },
      right: {
        type: [Number, String],
        default: 0
      },
      radius: {
        type: String,
        default: '0'
      },
      index: {
        type: [Number, String],
        default: 0
      },
      direction: {
        type: String,
        default: 'row'
      },
      contentMarginTop: {
        type: String,
        default: '14px'
      },
      rightContentColor: {
        type: String,
        default: '#333;'
      }
    },
    methods: {
      handleClick() {
        this.$emit('click', {
          index: this.index
        });
      },
      clickRightContent() {
        this.$emit('click-right')
      }
    }
  }
</script>

<style scoped>
  .tui-form__item-wrap {
    /* #ifndef APP-NVUE */
    width: 100%;
    box-sizing: border-box;
    /* #endif */
    flex-direction: row;
    flex: 1;
    align-items: center;
    position: relative;
  }

  .tui-form-flex {
    display: flex;
  }

  .tui-form__highlight:active {
    background-color: #f1f1f1 !important;
  }

  .tui-form__asterisk {
    margin-right: 12rpx;
    transform: translateY(-50%);
  }

  .tui-form__item-label {
    padding-right: 12rpx;
    /* #ifndef APP-NVUE */
    display: inline-block;
    flex-shrink: 0;
    /* #endif */
  }

  .tui-form__item-content {
    flex: 1;
    margin-top: 14px;
    color: #333;
  }

  .tui-form__item-right {
    float: right;
    min-width: 300rpx;
    text-align: right;
    display: flex;
    justify-content: right;
  }

  .tui-form__item-bottom {
    position: absolute;
    bottom: 0;
    /* #ifdef APP-NVUE */
    height: 0.5px;
    z-index: -1;
    /* #endif */
    /* #ifndef APP-NVUE */
    height: 1px;
    -webkit-transform: scaleY(0.5) translateZ(0);
    transform: scaleY(0.5) translateZ(0);
    transform-origin: 0 100%;
    z-index: 1;
    /* #endif */
  }

  .tui-form__item-arrow {
    height: 40rpx;
    width: 40rpx;
    border-width: 3px 3px 0 0;
    border-style: solid;
    transform: rotate(45deg) scale(0.5);
    /* #ifndef APP-NVUE */
    border-radius: 4rpx;
    flex-shrink: 0;
    margin-left: auto;
    box-sizing: border-box;
    /* #endif */
    /* #ifdef APP-NVUE */
    border-top-right-radius: 3rpx;
    /* #endif */
    transform-origin: center center;
    margin-right: -5.8579rpx;
  }

  .row-content {
    display: flex;
    align-content: space-between;
    width: 100%;
    align-items: center;
  }

  .left-content {
    min-width: 100px;
  }

  .right-content {
    flex: 1;
  }
</style>