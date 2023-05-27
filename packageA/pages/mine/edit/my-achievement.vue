<template>
  <view class="tui-form-container">
    <tui-form-item direction="column" content-margin-top="8px">
      <tui-textarea isCounter height="500rpx" v-model="form.content" textarea-border maxlength="500"
        placeholder="获取的证书或者奖项" />
    </tui-form-item>
    <view class="submit-bt-view"><button type="primary" @click="submit()">保存</button></view>
  </view>
</template>

<script>
  import {
    saveMyAchievement,
    getMyAchievement
  } from './var.js'

  export default {
    data() {
      return {
        form: {
          content: ''
        }
      };
    },
    onLoad() {
      this.getItemData()
    },
    methods: {
      getItemData() {
        this.form = getMyAchievement()
      },
      // 提交
      submit() {
        saveMyAchievement(this.form)
        uni.navigateBack()
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>