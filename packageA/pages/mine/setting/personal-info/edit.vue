<template>
  <view>
    <view class="tui-form-container">
      <view class="userinfo-detail">
        <tui-form-item asterisk label="头像">
          <template v-slot:right>
            <view class="user-pic">
              <image :src="form.avatarUrl || require('@/static/img/user-profile.png')" />
            </view>
          </template>
        </tui-form-item>
        <tui-form-item asterisk label="昵称">
          <template v-slot:right>
            <input :value="form.fullName" :disabled="true" class="input-view-value" placeholder="请输入"
              @input="form.fullName = $event.detail.value" />
          </template>
        </tui-form-item>
        <tui-form-item asterisk label="性别">
          <template v-slot:right>
            <view class="gender-view">
              <view v-for="(item, index) in genderOptions" :key="index">
                <uni-tag class="gender-tag" :inverted="form.gender !== item" :text="item" type="primary"
                  @click="onChangeGenderTag(item, index)" />
              </view>
            </view>
          </template>
        </tui-form-item>
        <tui-form-item asterisk label="姓名">
          <template v-slot:right>
            <input :value="form.fullName" :disabled="true" class="input-view-value" placeholder="请输入"
              @input="form.fullName = $event.detail.value" />
          </template>
        </tui-form-item>
        <tui-form-item asterisk label="手机号">
          <template v-slot:right>
            <input :value="form.mobile" class="input-view-value" placeholder="请输入"
              @input="form.mobile = $event.detail.value" />
          </template>
        </tui-form-item>
        <tui-form-item asterisk label="身份证号">
          <template v-slot:right>
            <input :value="form.idCard" class="input-view-value" placeholder="请输入"
              @input="form.idCard = $event.detail.value" />
          </template>
        </tui-form-item>

        <tui-form-item asterisk direction="column" label="身份证照片上传" content-margin-top="8px">
          <template>
            <view class="id-card-upload">
              <ht-upload-files ref="portraitImage" :limit="1" @selection-change="onChangePortraitImages">
                <view class="portrait-image">
                  身份证人像图
                </view>
              </ht-upload-files>
              <ht-upload-files ref="emblemImage" :limit="1" @selection-change="onChangeEmblemImages">
                <view class="emblem-image">
                  身份证国徽图
                </view>
              </ht-upload-files>
            </view>
          </template>
        </tui-form-item>

        <tui-form-item asterisk label="邮箱">
          <template v-slot:right>
            <input :value="form.idCard" class="input-view-value" placeholder="请输入"
              @input="form.idCard = $event.detail.value" />
          </template>
        </tui-form-item>

        <tui-form-item asterisk label="通讯地址">
          <template v-slot:right>
            <input :value="form.idCard" class="input-view-value" placeholder="请输入"
              @input="form.idCard = $event.detail.value" />
          </template>
        </tui-form-item>

        <tui-form-item asterisk label="紧急联系人">
          <template v-slot:right>
            <input :value="form.idCard" class="input-view-value" placeholder="请输入"
              @input="form.idCard = $event.detail.value" />
          </template>
        </tui-form-item>

        <tui-form-item asterisk label="工作组别/角色">
          <template v-slot:right>
            <input :value="form.idCard" class="input-view-value" placeholder="请输入"
              @input="form.idCard = $event.detail.value" />
          </template>
        </tui-form-item>

        <tui-form-item direction="column" label="教育经历" content-margin-top="8px">
          <tui-textarea isCounter autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="教育经历" />
        </tui-form-item>

        <tui-form-item direction="column" label="工作经历" content-margin-top="8px">
          <tui-textarea isCounter autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="工作经历" />
        </tui-form-item>

        <tui-form-item direction="column" label="我的作品" content-margin-top="8px">
          <tui-textarea isCounter autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="我的作品" />
        </tui-form-item>

        <tui-form-item direction="column" label="我的成就" content-margin-top="8px">
          <tui-textarea isCounter autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="我的成就" />
        </tui-form-item>

        <tui-form-item direction="column" label="自我评价" content-margin-top="8px">
          <tui-textarea isCounter autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="自我评价" />
        </tui-form-item>
      </view>
    </view>

    <view class="submit-bt-view">
      <button type="primary" @click="submit()" :disabled="loading">确定</button>
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
      isStaff: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    data() {
      return {
        loading: false,
        genderOptions: ['男', '女'],
        zones: [],
        form: {
          fullName: undefined,
          mobile: undefined,
          gender: '男',
          idCard: undefined,
          portraitImages: [],
          emblemImages: [],
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
      onChangePortraitImages(urls) {
        this.form.portraitImages = urls[0]
      },
      onChangeEmblemImages(urls) {
        this.form.emblemImages = urls[0]
      },
      onChangeGenderTag(item) {
        this.form.gender = item
      },

      initForm(form, zonesShow, zones, customerId) {
        this.form = form;
        this.zonesShow = zonesShow;
        this.zones = zones;
        this.customerId = customerId;
      },
      getAgeFromIdCard,
      setGender(e) {
        const index = e.detail.value;
        this.form.gender = GENDER_VARS[index];
      },
      setZones(ev) {
        const data = ev.detail.value;
        this.form.registeredProvince = {
          code: data[0].value,
          name: data[0].text
        };
        this.form.registeredCity = {
          code: data[1].value,
          name: data[1].text
        };
        this.form.registeredDistrict = {
          code: data[2].value,
          name: data[2].text
        };
        this.zonesShow = getZonesShow(this.form.registeredProvince, this.form.registeredCity, this
          .form.registeredDistrict);
      },
      checkMobile() {
        const reg = /[^\d]/g;
        if (this.form && this.form.mobile) {
          return reg.test(this.form.mobile);
        } else if (!this.form || !this.form.mobile) {
          return true;
        } else {
          return true;
        }
      },
      formValidate() {
        const checkIdCard = isVerifyIdCard(this.form.idCard);
        const checkMobile = isValidCellPhone(this.form.mobile);
        this.messageText = undefined;
        if (this.form.fullName === null || this.form.fullName === '' || this.form.fullName ===
          undefined) {
          this.messageText = `请填写用户姓名`;
        }
        if (this.form.fullName && this.form.fullName.length > 6) {
          this.messageText = `用户姓名最多可输入六个字符`;
        }
        if (!this.isOwnModify && this.form.fullName) {
          if (!this.form.mobile) {
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
            this.form.fullName = res.fullName.replace(/ /g, '');
            const index = GENDER_VARS.findIndex(item => item.value === res.gender);
            this.form.gender = GENDER_VARS[index];
            this.form.idCard = res.idCard;
            uni.hideLoading();
          })
          .catch(() => uni.hideLoading());
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .userinfo-detail {
    .user-pic {
      width: 42rpx;
      height: 42rpx;

      image {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        border-radius: 50%;
      }
    }

    .gender-view {
      display: flex;

      .gender-tag {
        margin-left: 40rpx;
      }
    }

    .id-card-upload {
      display: flex;

      ::v-deep .uni-file-picker .file-picker__box {
        height: 100px !important;
        width: 170px !important;
      }

      ::v-deep .uni-file-picker .file-picker__box-content {
        background-color: #efefef !important;
        border-radius: 20rpx !important;
      }

      .portrait-image {}

      .emblem-image {}
    }
  }

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
  }

  .input-view-value {
    text-align: right;
    font-size: $normal-font-size;
    color: black;
    vertical-align: middle;
  }
</style>