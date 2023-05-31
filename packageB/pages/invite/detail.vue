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

      <ht-edit-work-group-role :work-group.sync="form.workGroup" />

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

    <view v-if="isMyInvited()" class="submit-bt-view">
      <view class="btns">
        <tui-form-button class="item" type="primary" @click="onReject()">拒绝</tui-form-button>
        <tui-form-button plain class="item right" @click="onAgreement()">同意</tui-form-button>
      </view>
    </view>
    <view v-if="isInviteMe()" class="submit-bt-view">
      <button type="primary" @click="submit()" :disabled="loading">申请</button>
    </view>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="success" :message="messageText" :duration="1500" />
    </uni-popup>

    <ht-dialog :visible.sync="dialogVisible" title="拒绝" @click-right="onClickDialogOK()">
      <view v-if="dialogVisible">
        <tui-textarea isCounter autoHeight v-model="comment" textarea-border maxlength="100" placeholder="请填写拒绝的原因" />
      </view>
    </ht-dialog>
  </view>
</template>

<script>
  import {
    ORDER_TYPE_INVITE_ME,
    ORDER_TYPE_MY_INVETED
  } from '@/common/enum-vars.js'

  export default {
    components: {},
    data() {
      return {
        id: undefined,
        loading: false,
        messageText: '',
        comment: '',
        dialogVisible: false,
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
      this.type = Number(params.type)
    },
    methods: {
      // 邀请我的
      isInviteMe() {
        return this.type === ORDER_TYPE_INVITE_ME
      },
      // 我邀请的
      isMyInvited() {
        return this.type === ORDER_TYPE_MY_INVETED
      },
      onAgreement() {

      },
      onReject() {
        this.dialogVisible = true
        this.comment = ''
      },
      onClickDialogOK() {
        this.dialogVisible = false
      },
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