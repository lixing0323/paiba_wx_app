<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item label="创建人">
        <template v-slot:right>
          <uni-tag class="role" circle size="mini" text="摄影师" type="primary" /> 张三
        </template>
      </tui-form-item>
      <tui-form-item label="联系电话">
        <template v-slot:right>
          13212345678
        </template>
      </tui-form-item>
      <tui-form-item label="被邀请人">
        <template v-slot:right>
          <uni-tag class="role" circle size="mini" text="灯光师" type="primary" /> 李四
        </template>
      </tui-form-item>
      <tui-form-item label="被邀请组别">
        <template v-slot:right>
          灯光组
        </template>
      </tui-form-item>
      <tui-form-item label="联系电话">
        <template v-slot:right>
          13087654321
        </template>
      </tui-form-item>
      <tui-form-item label="工作时间">
        <template v-slot:right>
          2023年5月24日 17:37
        </template>
      </tui-form-item>
      <tui-form-item label="集合地点">
        <template v-slot:right>
          陕西省西安市高新路22号 创业街区3楼306
        </template>
      </tui-form-item>
      <tui-form-item direction="column" label="工作内容与备注" content-margin-top="8px">
        <tui-textarea isCounter autoHeight v-model="a" textarea-border maxlength="200" placeholder="工作内容与备注" />
      </tui-form-item>
      <tui-form-item direction="column" label="特别备注" content-margin-top="8px">
        <tui-textarea isCounter autoHeight v-model="a" textarea-border maxlength="200" placeholder="工作内容与备注" />
      </tui-form-item>
    </view>

    <view class="submit-button"><button type="primary" @click="submit()" :disabled="loading">确定</button></view>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="success" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        id: undefined,
        loading: false,
        messageText: '',
        a: ''
      }
    },
    computed: {

    },
    onLoad(params) {
      this.id = params.id
    },
    methods: {
      submit() {
        uni.navigateBack()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .tui-form-container {
    .role {
      margin-right: 40rpx;
    }
  }

  .submit-button {
    position: relative;
    height: 100rpx;
    margin: 40rpx;
  }
</style>