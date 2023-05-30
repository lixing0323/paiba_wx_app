<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item asterisk label="手机号码">
        <template v-slot:right>
          <input :value="phone" class="input-view-value" placeholder="请输入" @input="phone = $event.detail.value" />
        </template>
      </tui-form-item>
    </view>

    <view class="submit-bt-view">
      <button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhone">重新修改</button>
    </view>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="error" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        phone: '',
        messageText: ''
      }
    },
    methods: {
      getPhone(e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .submit-bt-view {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
  }
</style>