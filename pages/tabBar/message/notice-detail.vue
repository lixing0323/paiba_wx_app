<template>
  <view>
    <view class="business-content-padding-top-20">
      <view class="container">
        <view class="title">{{ desc.title }}</view>

        <mp-html class="content" v-if="desc && desc.content" :content="desc.content" />

        <view v-if="hasAttachments()" class="attachment">
          <span>附件：</span>
          <view class="item" v-for="(a, index) in desc.attachments" :key="index" @click="download(a)">{{ a.filename }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getContentPaddingTop
  } from '@/common/filter.js'
  import {
    getNotice
  } from '@/apis/message.js';
  import DownloadFileMixin from '@/mixins/downloadFileMixin.js'

  // 消息列表
  export default {
    mixins: [DownloadFileMixin],
    data() {
      return {
        id: undefined,
        desc: undefined
      };
    },
    onLoad(params) {
      this.id = params.id;
      this.noticeDetail();
    },
    methods: {
      // 公告
      getContentPaddingTop,
      noticeDetail() {
        getNotice(this.id).then(resp => {
          this.desc = resp;
        });
      },
      // 是否有附件
      hasAttachments() {
        return this.desc && this.desc.attachments && this.desc.attachments.length > 0;
      },
      // 下载附件
      download(item) {
        if (this.hasAttachments()) {
          this.doDownloadFile(item.url)
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .container {
    padding: 0 40rpx;

    //background-color: #FFFFFF;
    .title {
      font-size: 50rpx;
      font-weight: bold;
      text-align: center;
    }

    .content {
      margin: 0 40rpx;
    }

    .attachment {
      .item {
        margin-bottom: 10rpx;
        color: $system-color;
        text-decoration: underline;
      }
    }
  }
</style>
