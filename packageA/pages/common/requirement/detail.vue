<template>
  <view>
    <view class="bg-img-padding business-content-padding-top-20">
      <ht-req-card :d="reqInfo" />

      <view class="business-content-top-20 tui-form-container">
        <tui-form-item v-if="reqInfo.requirementType && reqInfo.requirementType.name !== 'OTHER'" label="指定银行"
          :rightContent="getArrayToString(reqInfo.selectedBanks)" padding="26rpx 0" :left="0" />
        <tui-form-item label="需求描述" direction="column" padding="26rpx 0" :left="0">
          <view class="content-column">{{ reqInfo.desc || '-' }}</view>
        </tui-form-item>
        <tui-form-item v-if="hasImages()" label="图片" direction="column" padding="26rpx 0" :left="0">
          <upload-img :files-list="reqInfo.images" :readonly="true" />
        </tui-form-item>
        <tui-form-item v-else label="图片" rightContent="-" padding="26rpx 0" :left="0" />
        <tui-form-item label="联系人" :rightContent="reqInfo.contactorName || '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="联系电话" :rightContent="reqInfo.contactNumber || '-'" padding="26rpx 0" :left="0"
          :bottom-border="reqInfo.forwardAt" />
        <tui-form-item v-if="reqInfo.forwardAt" label="客户经理"
          :rightContent="reqInfo.staff && reqInfo.staff.fullName || '-'" padding="26rpx 0" :left="0"
          :bottom-border="false" />
      </view>

      <view class="business-content-top-20 tui-form-container">
        <tui-form-item label="处理人"
          :rightContent="reqInfo.handleStaff ? reqInfo.handleStaff.fullName : reqInfo.staff.fullName" padding="26rpx 0"
          :left="0" :bottom-border="isShowHandledInfo()" />
        <tui-form-item v-if="isShowHandledInfo()" label="处理时间" :rightContent="reqInfo.handleAt || '-'" padding="26rpx 0"
          :left="0" />
        <tui-form-item v-if="isShowHandledInfo()" label="处理备注" :direction="reqInfo.handleComment?'column':'row'"
          :rightContent="reqInfo.handleComment || '-' " padding="26rpx 0" :left="0" :bottom-border="false" />
      </view>

      <view v-if="isShowOperation() && isForwardPerson()" class="business-content-top-20 tui-form-container">
        <tui-form-item direction="column" label="处理备注" padding="26rpx 0" :left="0">
          <view style="padding-bottom: 10rpx;font-size: 24rpx;color: red;">注：如无法处理，需要转移需求请在管理端操作</view>
          <tui-textarea isCounter autoHeight textarea-border v-model="handleComment" placeholder="请输入内容"></tui-textarea>
        </tui-form-item>
        <view class="submit-button"><button type="primary" @click="submit()" :disabled="loading">确认处理</button></view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    isCustomer
  } from '@/common/roles.js'
  import {
    getCustomerReqWithId,
    putCustomerReqWithId
  } from '@/apis/staff/requirement.js'
  import {
    getArrayToString,
    getContentPaddingTop
  } from '@/common/filter.js'
  import uploadImg from '@/components/ht-upload-files/upload-image.vue'

  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        loading: false,
        id: undefined,
        reqInfo: {},
        handleComment: undefined,
        type: undefined
      }
    },
    onLoad(params) {
      this.id = params.id;
      this.type = params.type
      this.getItem()
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    created() {},
    methods: {
      getContentPaddingTop,
      getArrayToString,
      hasImages() {
        return this.reqInfo.img && this.reqInfo.img.length > 0
      },
      getItem() {
        if (this.id) {
          uni.showLoading();
          getCustomerReqWithId(this.id)
            .then(res => {
              uni.hideLoading();
              this.reqInfo = res;
              this.reqInfo.images = []
              this.reqInfo.img.forEach(item => {
                this.reqInfo.images.push({
                  url: item
                })
              })

            })
            .catch(() => uni.hideLoading());
        }
      },
      isShowOperation() {
        return this.reqInfo && this.reqInfo.status && this.reqInfo.status.name === 'UN_PROCESSED' && !isCustomer()
      },
      isShowHandledInfo() {
        return this.reqInfo && this.reqInfo.status && this.reqInfo.status.name === 'PROCESSED'
      },
      submit() {
        this.loading = true
        const data = {
          action: 'handle',
          handleComment: this.handleComment
        }
        putCustomerReqWithId(this.id, data).then(() => {
          this.loading = false
          uni.navigateTo({
            url: `/pages/loadingPage/index?backDelta=2`
          })
        })
      },
      isForwardPerson() {
        return ((this.reqInfo.handleStaff && this.reqInfo.handleStaff.id === this.userInfo.id) || !this.reqInfo
          .handleStaff)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .submit-button {
    position: relative;
    height: 100rpx;
    margin: 20rpx auto;
  }
</style>
