<template>
  <view class="tui-form-container">
    <ht-card-title title="编辑信息" :img="require('@/static/icon/deal.png')">
      <template v-slot:right>
        <ht-camera v-if="!isOwnModify" name="身份证识别" @success="uploadCameraImgSuccess"></ht-camera>
      </template>
    </ht-card-title>
    <view class="userinfo-detail">
      <tui-form-item asterisk label="姓名" padding="26rpx 0" :left="0">
        <template v-slot:right>
          <input :value="customerForm.fullName" class="input-view-value" placeholder="请输入"
            @input="customerForm.fullName = $event.detail.value" />
        </template>
      </tui-form-item>
      <template v-if="!isOwnModify">
        <tui-form-item asterisk label="手机号" padding="26rpx 0" :left="0">
          <template v-slot:right>
            <input :value="customerForm.mobile" class="input-view-value" placeholder="请输入"
              @input="customerForm.mobile = $event.detail.value" />
          </template>
        </tui-form-item>
        <tui-form-item label="性别" padding="26rpx 0" :left="0">
          <template v-slot:right>
            <picker v-if="!isOwnModify" class="picker" :value="customerForm.gender" :range="GENDER_VARS"
              range-key="value" @change="setGender">
              <view class="view-value">{{ customerForm.gender.value || '请选择' }}</view>
            </picker>
          </template>
        </tui-form-item>
        <tui-form-item label="身份证号" padding="26rpx 0" :left="0">
          <template v-slot:right>
            <input :value="customerForm.idCard" class="input-view-value" placeholder="请输入"
              @input="customerForm.idCard = $event.detail.value" />
          </template>
        </tui-form-item>
        <tui-form-item label="年龄"
          :rightContent="customerForm && customerForm.idCard ? getAgeFromIdCard(customerForm.idCard) : '-'"
          padding="26rpx 0" :left="0" />
        <tui-form-item label="户口所在地" :rightContent="zonesShow" padding="26rpx 0" :left="0" />
        <tui-form-item label="婚姻状况" :rightContent="customerForm.maritalStatus.value || '-'" padding="26rpx 0"
          :left="0" />
      </template>
      <tui-form-item label="工作单位" padding="26rpx 0" :left="0" :bottom-border="!isOwnModify">
        <template v-slot:right>
          <input :value="customerForm.workUnit" class="input-view-value" placeholder="请输入"
            @input="customerForm.workUnit = $event.detail.value" />
        </template>
      </tui-form-item>
      <tui-form-item v-if="!isOwnModify" label="所属集群"
        :rightContent="customerForm && customerForm.labelNames.length > 0 ? customerForm.labelNames.join('、') : '-'"
        padding="26rpx 0" :left="0" :bottom-border="false" />
    </view>
  </view>
</template>

<script>
</script>

<style lang="scss">
</style>