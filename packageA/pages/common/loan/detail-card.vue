<template>
  <view>
    <view class="bg-img-padding business-content-padding-top-20">
      <view v-if="isStaff()" class="tui-form-container" style="margin-bottom: 10px">
        <ht-card-title title="客户信息" :img="require('@/static/icon/customer-small.png')" />
        <tui-form-item label="姓名" :rightContent="loanInfo.customer.fullName" padding="26rpx 0" :left="0" />
        <tui-form-item label="联系电话" :rightContent="loanInfo.customer.mobile" padding="26rpx 0" :left="0" :bottom-border="false" />
      </view>

      <view class="tui-form-container" style="margin-bottom: 10px">
        <ht-card-title :title="`${loanInfo.borrowerType.value || '-'}贷款信息`">
          <template v-slot:right>
            <view class="tag" :class="{'no-due': loanInfo.status && loanInfo.status.name === 'NOT_OVERDUE', 'due': loanInfo.status && loanInfo.status.name !== 'NOT_OVERDUE'}">{{ loanInfo.status.value }}</view>
          </template>
        </ht-card-title>
        <tui-form-item v-if="!isOwnLoan()" label="关联公司名称" :rightContent="loanInfo.companyName" padding="26rpx 0" :left="0" />
        <tui-form-item label="授信银行名称" :rightContent="loanInfo.bankName" padding="26rpx 0" :left="0" />
        <tui-form-item label="发放日" :rightContent="loanInfo.loanDate || '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="发放金额" :rightContent="`${changeToWan(loanInfo.loanAmount)}万元`" padding="26rpx 0" :left="0" />
        <tui-form-item label="授信余额" :rightContent="`${changeToWan(loanInfo.creditBalance)}万元`" padding="26rpx 0" :left="0" />
        <tui-form-item label="每月还款金额" :rightContent="`${loanInfo.monthlyRepayment ? changeToWan(loanInfo.monthlyRepayment) + '万元' : '-'}`" padding="26rpx 0" :left="0" />
        <tui-form-item label="到期日" :rightContent="loanInfo.isLongTerm ? '长期' : (loanInfo.dueDate || '-')" padding="26rpx 0" :left="0" />
        <tui-form-item label="还款日" :rightContent="`每月${loanInfo.repaymentDay}日`" padding="26rpx 0" :left="0" />
        <tui-form-item label="担保方式" :rightContent="loanInfo.guaranteeType ? loanInfo.guaranteeType.value : '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="授信种类" :rightContent="lloanInfo.creditType.value || '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="是否为本笔抵押物" :rightContent="loanInfo.isPawn ? '是' : '否'" padding="26rpx 0" :left="0" />
        <tui-form-item label="是否循环贷款" :rightContent="loanInfo.isLoop ? '是' : loanInfo.isLoop === false ? '否' : '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="实际贷款用途" :rightContent="loanInfo.usedFor || '-'" padding="26rpx 0" :left="0" :bottom-border="false" />
      </view>

      <view v-for="(i, index) in loanInfo.overdueRecords" :key="index" class="tui-form-container" style="margin-bottom: 10px">
        <ht-card-title :title="`逾期记录${index + 1}`" />
        <tui-form-item label="逾期月份" :rightContent="i.overdueDate" padding="26rpx 0" :left="0" />
        <tui-form-item label="逾期金额" :rightContent="`${i.amount}元`" padding="26rpx 0" :left="0" :bottom-border="false" />
      </view>
    </view>
  </view>
</template>

<script>
  import {
    changeToWan
  } from '@/common/filter.js'
  import {
    getLoanWithId
  } from '@/apis/my-loan.js'
  import { isStaff } from '@/common/roles.js'
  export default {
    data() {
      return {
        id: undefined,
        loanInfo: {}
      }
    },
    onLoad(params) {
      this.id = params.id
      this.getItem()
    },
    methods: {
      changeToWan,
      isStaff,
      getItem() {
        if (this.id) {
          uni.showLoading();
          getLoanWithId(this.id)
            .then(res => {
              uni.hideLoading();
              this.loanInfo = res
            })
            .catch(() => uni.hideLoading());
        }
      },
      isOwnLoan() {
        return this.loanInfo && this.loanInfo.borrowerType && this.loanInfo.borrowerType.name === 'PERSONAL'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .tag{
    height: 30rpx;
    line-height: 30rpx;
    min-width: 100rpx;
    text-align: center;
    padding: 6rpx 10rpx;
    border-radius: 5rpx;
    font-size: 22rpx;
  }

  .no-due{
    color: #7dc892;
    background-color: #ebf6e7;
  }

  .due{
    color: #F56C6C;
    background-color: #FEF0F0;
  }
</style>
