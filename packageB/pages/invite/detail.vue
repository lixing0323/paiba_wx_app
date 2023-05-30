<template>
  <view>
    <view class="avatar">
      <image class="image" :src="require('@/static/icon/avatar.png')" />
    </view>

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
    </view>

    <view class="tui-form-container margin-top-20">
      <tui-form-item label="被邀请人" @click-right="">
        <template v-slot:right>
          李四
        </template>
      </tui-form-item>

      <work-group-role :work-group.sync="form.workGroup" />

      <tui-form-item label="日薪资">
        <template v-slot:right>
          ¥1222
        </template>
      </tui-form-item>
      <tui-form-item label="工作时间">
        <template v-slot:right>
          2023年5月24日 - 2023年5月26日
        </template>
      </tui-form-item>
      <tui-form-item label="总薪资">
        <template v-slot:right>
          ¥21212
        </template>
      </tui-form-item>
      <tui-form-item label="联系电话">
        <template v-slot:right>
          13087654321
        </template>
      </tui-form-item>
      <tui-form-item label="集合地点">
        <template v-slot:right>
          陕西省西安市高新路22号 创业街区3楼306
        </template>
      </tui-form-item>
    </view>

    <view class="tui-form-container margin-top-20">
      <tui-form-item direction="column" label="工作内容与备注" content-margin-top="8px">
        <tui-textarea isCounter autoHeight v-model="a" textarea-border maxlength="200" placeholder="工作内容与备注" />
      </tui-form-item>
    </view>

    <view class="tui-form-container margin-top-20">
      <tui-form-item direction="column" label="特别备注" content-margin-top="8px">
        <tui-textarea isCounter autoHeight v-model="a" textarea-border maxlength="200" placeholder="工作内容与备注" />
      </tui-form-item>
    </view>

    <view class="submit-bt-view"><button type="primary" @click="submit()" :disabled="loading">申请</button></view>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="success" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  import WorkGroupRole from '@/packageA/pages/components/picker-work-role/index.vue'

  export default {
    components: {
      WorkGroupRole
    },
    data() {
      return {
        id: undefined,
        loading: false,
        messageText: '',
        a: '',
        form: {
          workGroup: ''
        }
      }
    },
    computed: {

    },
    onLoad(params) {
      this.id = params.id
      // type = true 被邀请, false为我邀请
      this.type = Boolean(params.invited)
      console.log(this.type)
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

  .avatar {
    text-align: center;

    .image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 160rpx;
    }
  }

  .role {
    margin-right: 40rpx;
  }
</style>