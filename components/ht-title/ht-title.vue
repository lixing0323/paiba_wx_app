<template>
  <view class="title-container" :style="{'width': windowWidth, 'height': titleContainerHeight, 'backgroundColor': backgroundColor}">
    <view v-if="hasBack" class="back-icon-container"
          :style="{
          'marginTop': (capsuleLocation.top + 2) + 'px',
          'height': capsuleLocation.height + 'px',
          'lineHeight': capsuleLocation.height + 'px',
          'border-radius': capsuleLocation.height + 'px'}">
      <view class="back-icon icon">
        <uni-icons type="left" size="23" @click="goBack" />
      </view>
<!--      <view class="divider" :style="{'height': capsuleLocation.height - 15 + 'px'}" />-->
<!--      <view class="home-icon icon">-->
<!--        <uni-icons type="home" size="20" @click="goHome" />-->
<!--      </view>-->
    </view>
    <view>
      <text class="title" :style="{'marginTop': titleMarginTop, 'width': windowWidth, 'height': titleHeight, 'lineHeight': titleHeight, 'fontSize': fontSize}">{{ title }}</text>
    </view>
  </view>
</template>

<script>
	export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      backgroundColor: {
        type: String,
        default: '#ffffff'
      },
      hasBack: {
        type: Boolean,
        default: true
      }
    },
		data() {
			return {
        windowHeight: 0,
        capsuleLocation: {},
        titleMarginTop: '30px',
        windowWidth: '400px',
        titleHeight: '30px',
        titleContainerHeight: '100px',
        capsuleMarginRight: '30px',
        fontSize: '16px'
			}
		},
    created() {
      this.getSystem()
    },
		methods: {
      getSystem() {
        const _this = this
        const windowWidth = uni.getSystemInfoSync().windowWidth
        _this.capsuleLocation = wx.getMenuButtonBoundingClientRect()
        _this.titleMarginTop =  (_this.capsuleLocation.top + 2) + 'px'
        _this.windowWidth = windowWidth + 'px'
        _this.titleHeight =  _this.capsuleLocation.height + 'px'
        _this.titleContainerHeight = ( _this.capsuleLocation.top +  _this.capsuleLocation.height + 10) + 'px'

        _this.capsuleMarginRight = (windowWidth - _this.capsuleLocation.right) + 'px'
        wx.getSystemInfo({
          success: function(res) {
            _this.fontSize = res.fontSizeSetting + 'px'
          }
        })
        this.$emit('capsuleLocation',  _this.capsuleLocation)
        this.$emit('titleContainerHeight',  _this.capsuleLocation.top + _this.capsuleLocation.height + 10)
      },
      goBack() {
        uni.navigateBack()
      },
      goHome() {
        uni.switchTab({
          url: `/pages/tabBar/homepage/index`
        });
      }
		}
	}
</script>

<style lang="scss" scoped>

.title-container{
  position: fixed;
  z-index: 999999;
}

.back-icon-container{
  position: fixed;
  //border: 1rpx solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  //background-color: rgba(255, 255, 255, 0.5);
  margin-left: 3px;

  .icon{
    flex: 1;
    font-weight: bolder;
    text-align: center;
  }

  .divider{
    width: 1rpx;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .back-icon{

  }

  .home-icon{

  }
}

.title{
  display: block;
  text-align: center;
  //font-size: 24rpx;
  font-weight: bold;
  letter-spacing: 2px;
}
</style>
