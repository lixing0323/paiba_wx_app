<template>
  <view>
    <view class="tui-form-container">
      <ht-card-title title="编辑信息" :img="require('@/static/icon/deal.png')">
        <template v-slot:right>
          <ht-camera v-if="!isOwnModify" name="身份证识别" @success="uploadCameraImgSuccess"></ht-camera>
        </template>
      </ht-card-title>
      <view class="userinfo-detail">
        <tui-form-item asterisk label="姓名" padding="26rpx 0" :left="0">
          <template v-slot:right>
            <input :value="customerForm.fullName" class="input-view-value" placeholder="请填写"
              @input="customerForm.fullName = $event.detail.value" />
          </template>
        </tui-form-item>
        <template v-if="!isOwnModify">
          <tui-form-item asterisk label="手机号" padding="26rpx 0" :left="0">
            <template v-slot:right>
              <input :value="customerForm.mobile" class="input-view-value" placeholder="请填写"
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
              <input :value="customerForm.idCard" class="input-view-value" placeholder="请填写"
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
            <input :value="customerForm.workUnit" class="input-view-value" placeholder="请填写"
              @input="customerForm.workUnit = $event.detail.value" />
          </template>
        </tui-form-item>
        <tui-form-item v-if="!isOwnModify" label="所属集群"
          :rightContent="customerForm && customerForm.labelNames.length > 0 ? customerForm.labelNames.join('、') : '-'"
          padding="26rpx 0" :left="0" :bottom-border="false" />
      </view>
    </view>

    <view class="submit-bt-view">
      <button type="primary" @click="submit()" :disabled="loading">提交</button>
    </view>
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>
<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    MARITAL_STATUS_VARS,
    GENDER_VARS
  } from '@/common/enum-vars.js';
  import {
    getAgeFromIdCard,
    getZonesShow
  } from '@/common/filter.js';
  import {
    postCustomers,
    putCustomerWithId
  } from '@/apis/staff/customer.js';
  import {
    putCustomerInfo
  } from '@/apis/user.js';
  import {
    isVerifyIdCard,
    isValidCellPhone
  } from '@/common/regular.js';
  import {
    getIdCardOfOCR
  } from '@/apis/ocr.js';

  export default {
    props: {
      isFirstReg: {
        type: Boolean,
        default: false
      },
      isOwnModify: {
        type: Boolean,
        default: false
      },
      isStaffCreate: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    data() {
      return {
        GENDER_VARS,
        MARITAL_STATUS_VARS,
        zones: [],
        zonesShow: '-',
        customerForm: {
          fullName: undefined,
          mobile: undefined,
          gender: undefined,
          idCard: undefined,
          maritalStatus: undefined,
          workUnit: undefined,
          registeredProvince: {},
          registeredCity: {},
          registeredDistrict: {},
          labelNames: []
        },
        customerId: undefined,
        msgType: 'error',
        messageText: undefined,
        rightTextStyle: {
          fontSize: '26rpx',
          color: 'grey'
        }
      };
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    onLoad() {},
    methods: {
      initForm(customerForm, zonesShow, zones, customerId) {
        this.customerForm = customerForm;
        this.zonesShow = zonesShow;
        this.zones = zones;
        this.customerId = customerId;
      },
      getAgeFromIdCard,
      setGender(e) {
        const index = e.detail.value;
        this.customerForm.gender = GENDER_VARS[index];
      },
      setZones(ev) {
        const data = ev.detail.value;
        this.customerForm.registeredProvince = {
          code: data[0].value,
          name: data[0].text
        };
        this.customerForm.registeredCity = {
          code: data[1].value,
          name: data[1].text
        };
        this.customerForm.registeredDistrict = {
          code: data[2].value,
          name: data[2].text
        };
        this.zonesShow = getZonesShow(this.customerForm.registeredProvince, this.customerForm.registeredCity, this
          .customerForm.registeredDistrict);
      },
      checkMobile() {
        const reg = /[^\d]/g;
        if (this.customerForm && this.customerForm.mobile) {
          return reg.test(this.customerForm.mobile);
        } else if (!this.customerForm || !this.customerForm.mobile) {
          return true;
        } else {
          return true;
        }
      },
      setMarital(e) {
        const index = e.detail.value;
        this.customerForm.maritalStatus = MARITAL_STATUS_VARS[index];
      },
      formValidate() {
        const checkIdCard = isVerifyIdCard(this.customerForm.idCard);
        const checkMobile = isValidCellPhone(this.customerForm.mobile);
        this.messageText = undefined;
        if (this.customerForm.fullName === null || this.customerForm.fullName === '' || this.customerForm.fullName ===
          undefined) {
          this.messageText = `请填写用户姓名`;
        }
        if (this.customerForm.fullName && this.customerForm.fullName.length > 6) {
          this.messageText = `用户姓名最多可输入六个字符`;
        }
        if (!this.isOwnModify && this.customerForm.fullName) {
          if (!this.customerForm.mobile) {
            this.messageText = `请填写手机号`;
          } else if (!checkMobile) {
            this.messageText = `手机号不合规`;
          }
        }
      },
      submit() {
        this.formValidate();
        if (this.messageText) {
          this.msgType = 'error';
          this.$refs.message.open();
        } else {
          let data;
          if (this.isOwnModify) {
            data = {
              fullName: this.customerForm.fullName || undefined,
              workUnit: this.customerForm.workUnit || undefined
            };
          } else {
            data = {
              fullName: this.customerForm.fullName || undefined,
              workUnit: this.customerForm.workUnit || undefined,
              gender: this.customerForm.gender ? this.customerForm.gender.name : undefined,
              mobile: this.customerForm.mobile,
              idCard: this.customerForm.idCard
            };
          }
          this.loading = true;
          let api;
          if (this.isOwnModify) {
            api = putCustomerInfo(data);
          } else if (this.isStaffCreate) {
            api = postCustomers(data);
          } else {
            api = putCustomerWithId(this.customerId, data);
          }
          api.then(() => {
            this.msgType = 'success';
            this.$refs.message.open();
            this.messageText = `保存成功`;
            this.loading = false;
            if (this.isFirstReg) {
              uni.reLaunch({
                url: `/pages/tabBar/homepage/index`
              });
            } else {
              const count = this.isOwnModify ? 3 : 2;
              uni.navigateTo({
                url: `/pages/loadingPage/index?backDelta=${count}`
              });
            }
          });
        }
      },
      // 打开相机/拍照上传成功
      uploadCameraImgSuccess(url) {
        uni.showLoading();
        getIdCardOfOCR({
            imgUrl: url
          })
          .then(res => {
            this.customerForm.fullName = res.fullName.replace(/ /g, '');
            const index = GENDER_VARS.findIndex(item => item.value === res.gender);
            this.customerForm.gender = GENDER_VARS[index];
            this.customerForm.idCard = res.idCard;
            console.log(res, this.customerForm.gender, GENDER_VARS, index, res.gender);
            uni.hideLoading();
          })
          .catch(() => uni.hideLoading());
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  uni-easyinput {
    width: 70%;
  }

  .warning-hint {
    font-size: 24rpx;
    color: #f56c6c;
  }

  .view-value {
    font-weight: normal;
    color: black;
    font-size: $normal-font-size;
    // border-bottom: 1px solid #eeeeee;
  }

  .input-view-value {
    text-align: right;
    font-size: $normal-font-size;
    color: black;
    //font-weight: bold;
    // margin-right: 20rpx;
    vertical-align: middle;
  }
</style>