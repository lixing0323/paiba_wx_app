<template>
  <view>
    <view class="bg-img-padding business-content-padding-top-20">
      <ht-loan-product-detail ref="detail" />

      <view class="apply-container">
        <tui-form-item label="申请备注" :rightContent="applyInfo.comment || '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="联系电话" :rightContent="applyInfo.contactPhone || applyInfo.customer.mobile || '-'"
          padding="26rpx 0" :left="0" />
        <tui-form-item label="申请时间" :rightContent="applyInfo.createdAt || '-'" padding="26rpx 0" :left="0"
          :bottom-border="false" />
      </view>

      <view v-if="applyInfo && applyInfo.handled" class="result-container">
        <tui-form-item label="处理结果" :rightContent="changeEnumToValue(applyInfo, 'handleResult')" padding="26rpx 0"
          :left="0" />
        <tui-form-item label="处理备注" :rightContent="applyInfo.handleComment || '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="处理时间" :rightContent="applyInfo.handleAt || '-'" padding="26rpx 0" :left="0"
          :bottom-border="false" />
      </view>

      <view v-if="applyInfo && !applyInfo.handled && isStaff()" class="deal-container">
        <tui-form-item label="处理结果" padding="26rpx 0" :left="0">
          <template v-slot:right>
            <view class="flex">
              <view class="flex" @click="selectedResult('SUCCESS')">
                <image
                  :src="require(`@/static/icon/${form.handleResult === 'SUCCESS' ? 'selected' : 'unSelected'}.png`)"
                  class="icon" />
                <text>办理成功</text>
              </view>
              <view class="flex" @click="selectedResult('IGNORE')">
                <image :src="require(`@/static/icon/${form.handleResult === 'IGNORE' ? 'selected' : 'unSelected'}.png`)"
                  class="icon" />
                <text>不予办理</text>
              </view>
            </view>
          </template>
        </tui-form-item>
        <tui-form-item direction="column" label="处理备注" padding="26rpx 0" :left="0" content-margin-top="8px"
          :bottom-border="false">
          <template>
            <view style="padding-top: 20rpx;height: 100%;">
              <tui-textarea isCounter autoHeight v-model="form.handleComment" textarea-border maxlength="100"
                placeholder="请输入内容" />
            </view>
          </template>
        </tui-form-item>
        <view class="submit-button">
          <button type="primary" @click="submit()" :disabled="loading">确认处理</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getProductApplyWithId,
    postProductApply
  } from '@/apis/product.js'
  import {
    changeEnumToValue,
    getContentPaddingTop
  } from '@/common/filter.js'
  import {
    isStaff
  } from '@/common/roles.js'
  import unSelected from '@/static/icon/unSelected.png'
  export default {
    data() {
      return {
        loading: false,
        id: undefined,
        applyInfo: undefined,
        form: {
          handleResult: 'SUCCESS'
        }
      }
    },
    onLoad(params) {
      this.id = params.id;
      this.getItem()
    },
    methods: {
      getContentPaddingTop,
      changeEnumToValue,
      isStaff,
      getItem() {
        if (this.id) {
          uni.showLoading();
          getProductApplyWithId(this.id)
            .then(res => {
              uni.hideLoading();
              this.applyInfo = res
              this.$refs.detail.product = res.loanProduct
            })
            .catch(() => uni.hideLoading());
        }
      },
      selectedResult(val) {
        this.form.handleResult = val
      },
      submit() {
        this.loading = true
        postProductApply(this.id, this.form).then(() => {
          this.loading = false
          uni.navigateTo({
            url: `/pages/loadingPage/index?backDelta=2`
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .apply-container,
  .result-container,
  .deal-container {
    margin-top: 20rpx;
    background-color: #FFFFFF;
    padding: 0 40rpx;
  }

  .title {
    font-weight: bold;
    color: black;

    .block {
      color: #FF7A39;
      font-size: 16px;
    }

    .text {
      margin-left: 10rpx;
    }

    .content {
      color: #333;
      font-weight: normal;
    }
  }

  .radiobox-size {
    width: 50rpx;
    height: 50rpx;
  }

  .flex {
    display: flex;
    align-items: center;
    margin-left: 20rpx;

    text {
      font-size: 26rpx;
    }
  }

  .icon {
    width: 35rpx;
    height: 35rpx;
    vertical-align: middle;
    margin-right: 5rpx;
  }

  .submit-button {
    position: relative;
    height: 100rpx;
    margin: 20rpx auto;
  }
</style>
