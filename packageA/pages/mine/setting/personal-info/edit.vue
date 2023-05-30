<template>
  <view>
    <view class="tui-form-container">
      <view>
        <tui-form-item asterisk label="头像">
          <template v-slot:right>
            <view class="avatar-container">
              <button class="avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <image class="image" :src="form.avatarUrl || require('@/static/icon/avatar.png')" />
                <view class="symbol"> > </view>
              </button>
            </view>
          </template>
        </tui-form-item>
        <tui-form-item asterisk label="昵称">
          <template v-slot:right>
            <input :value="form.nickName" type="nickName" class="input-view-value" placeholder="请填写"
              @input="form.nickName = $event.detail.value" />
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
            <input :value="form.fullName" class="input-view-value" placeholder="请填写"
              @input="form.fullName = $event.detail.value" />
          </template>
        </tui-form-item>
        <tui-form-item asterisk label="手机号">
          <template v-slot:right>
            <input :value="form.phone" :maxlength="11" class="input-view-value" placeholder="请填写"
              @input="form.phone = $event.detail.value" />
          </template>
        </tui-form-item>
        <tui-form-item asterisk label="身份证号">
          <template v-slot:right>
            <input :value="form.idCard" :maxlength="18" class="input-view-value" placeholder="请填写"
              @input="form.idCard = $event.detail.value" />
          </template>
        </tui-form-item>

        <tui-form-item asterisk direction="column" label="身份证照片上传" content-margin-top="8px">
          <template>
            <view class="id-card-upload">
              <ht-upload-files class="image" ref="portraitImage" :limit="1" @selection-change="onChangePortraitImages">
                <view class="portrait-image">
                  身份证人像图
                </view>
              </ht-upload-files>
              <ht-upload-files class="image" ref="emblemImage" :limit="1" @selection-change="onChangeEmblemImages">
                <view class="emblem-image">
                  身份证国徽图
                </view>
              </ht-upload-files>
            </view>
          </template>
        </tui-form-item>

        <tui-form-item asterisk label="邮箱">
          <template v-slot:right>
            <input :value="form.email" class="input-view-value" placeholder="请填写"
              @input="form.email = $event.detail.value" />
          </template>
        </tui-form-item>

        <tui-form-item asterisk label="通讯地址">
          <template v-slot:right>
            <view class="click-view address" @click="gotoEditMailAddress()">
              <text class="content">{{ form.mailRegion }}</text> >
            </view>
          </template>
        </tui-form-item>

        <tui-form-item asterisk label="紧急联系人">
          <template v-slot:right>
            <view class="click-view contact" @click="gotoEditEmergencyContact()">
              <text class="contact-name">{{ form.contactName }}</text>
              <text class="contact-phone content">{{ form.contactPhone }}</text> >
            </view>
          </template>
        </tui-form-item>

        <tui-form-item asterisk label="工作组别/角色">
          <template v-slot:right>
            <view class="click-view address" @click="showWorkPicker=true">
              <text class="content">{{ form.workGroup }}</text> >
            </view>
          </template>
        </tui-form-item>

        <tui-form-item direction="column" label="教育经历" rightContent=">" content-margin-top="8px"
          @click-right="gotoEducationExperience()">
          <education-view-card :info="form" :show-more="false" />
        </tui-form-item>

        <tui-form-item direction="column" label="工作经历" rightContent=">" content-margin-top="8px"
          @click-right="gotoWorkExperience()">
          <work-view-card :info="form" :show-more="false" />
        </tui-form-item>

        <tui-form-item direction="column" label="我的作品"
          :rightContent="`${getCreationDescription(form.myCreationImages, form.myCreationVideos)} >`"
          content-margin-top="8px" @click-right="gotoMyCreation()">
          <my-creation-view-card :info="form" :show-more="false" />
        </tui-form-item>

        <tui-form-item direction="column" label="我的成就" rightContent=">" content-margin-top="8px"
          @click-right="gotoMyAchievement()">
          <ht-card v-if="form.myAchievementContent">
            <view class="one-lines-ellipsis">{{ form.myAchievementContent }}</view>
          </ht-card>
        </tui-form-item>

        <tui-form-item direction="column" label="自我评价" rightContent=">" content-margin-top="8px"
          @click-right="gotoSelfEvaluation()">
          <ht-card v-if="form.selfEvaluationContent">
            <view class="one-lines-ellipsis">{{ form.selfEvaluationContent }}</view>
          </ht-card>
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
  import FormMixin from '@/mixins/formMixin.js'
  import EducationViewCard from '@/packageA/pages/components/education-view-card/index.vue'
  import WorkViewCard from '@/packageA/pages/components/work-view-card/index.vue'
  import MyCreationViewCard from '@/packageA/pages/components/my-creation-view-card/index.vue'

  import {
    getInformation,
    saveInformation,
    clearInfomation,
    getCreationDescription
  } from '@/packageA/pages/mine/edit/var.js'
  import {
    getValidValue
  } from '@/common/utils.js'
  import {
    getTestList
  } from '@/apis/test.js'
  import {
    isVerifyIdCard,
    isValidCellPhone,
    isValidEmail
  } from '@/common/regular.js';

  export default {
    components: {
      EducationViewCard,
      WorkViewCard,
      MyCreationViewCard
    },
    props: {
      isStaff: {
        type: Boolean,
        default: false
      }
    },
    mixins: [FormMixin],
    data() {
      return {
        loading: false,
        genderOptions: ['男', '女'],
        form: {
          // 紧急联系人信息
          contactName: '',
          contactRelation: '',
          contactPhone: '',
          contactAddress: '',
          // 通讯地址信息
          mailName: '',
          mailRegion: '',
          mailPhone: '',
          mailAddress: '',
          // 工作组别/角色
          workGroup: '',
          // 教育经历
          eduSchool: '',
          eduDate: [],
          eduSpeciality: '',
          eduEducation: '',
          eduExperience: '',
          // 工作经历
          workCompany: '',
          workIndustry: '',
          workDate: [],
          workDepartment: '',
          workJob: '',
          workContent: '',
          // 我的作品
          myCreationImages: [],
          myCreationVideos: [],
          // 我的成就
          myAchievementContent: '',
          // 自我评价
          selfEvaluationContent: '',

          avatarUrl: '',
          nickName: '',
          phone: '',
          gender: '男',
          fullName: '',
          idCard: '',
          email: '',
          portraitUrl: '',
          emblemUrl: ''
        },
        id: undefined,
        msgType: 'error',
        messageText: undefined
      };
    },
    computed: {
      ...mapGetters(['userInfo']),
    },
    onLoad(params) {
      this.id = params.id
      this.getItemData()
    },
    onUnload() {
      this.clearLocalStorageData()
    },
    onShow() {
      this.getLocalStorageData()
    },
    methods: {
      getCreationDescription,
      getItemData() {
        getTestList().then(() => {
          console.log('getItemData')
        })
      },
      // 保存
      save() {
        return new Promise((resolve, reject) => {
          saveInformation(this.form)
          resolve()
        })
      },
      clearLocalStorageData() {
        console.log('clearLocalStorageData')
        // clearInfomation()
      },
      getLocalStorageData() {
        const info = getInformation()
        Object.keys(this.form).map(key => {
          this.form[key] = info[key]
        })
        // 初始化性别
        this.form.gender = this.form.gender || '男'
        // 身份证照片
        this.$nextTick(() => {
          if (this.form.portraitUrl) {
            this.$refs.portraitImage.initData([this.form.portraitUrl])
          }
          if (this.form.emblemUrl) {
            this.$refs.emblemImage.initData([this.form.emblemUrl])
          }
        })
        console.log('local=', this.form)
      },
      // 身份证人像图
      onChangePortraitImages(urls) {
        this.form.portraitUrl = urls[0]
      },
      // 身份证国徽图
      onChangeEmblemImages(urls) {
        this.form.emblemUrl = urls[0]
      },
      // 性别
      onChangeGenderTag(item) {
        this.form.gender = item
      },
      // 紧急联系人
      gotoEditEmergencyContact() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/emergency-contact`
          })
        })
      },
      // 通讯地址
      gotoEditMailAddress() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/mail-address`
          })
        })
      },
      // 工作组别/角色
      onChangeWorkPicker(value) {
        this.form.workGroup = value
      },
      // 新增教育经历
      gotoEducationExperience() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/education-experience`
          })
        })
      },
      // 新增工作经历
      gotoWorkExperience() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/work-experience`
          })
        })
      },
      // 新增我的作品
      gotoMyCreation() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/my-creation`
          })
        })
      },
      // 我的成就
      gotoMyAchievement() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/my-achievement`
          })
        })
      },
      // 自我评价
      gotoSelfEvaluation() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/self-evaluation`
          })
        })
      },
      // 检查身份证号码
      checkIdCardNumber() {
        const id = getValidValue(this.form.idCard)
        const valid = isVerifyIdCard(id)
        return valid && valid.msg ? false : true
      },
      // 检查身份证照片
      checkIdCardImage() {
        return this.form.portraitUrl && this.form.emblemUrl
      },
      checkValidate() {
        this.messageText = undefined
        let valid = true
        if (!getValidValue(this.form.nickName)) {
          this.messageText = '请填写昵称'
        } else if (!getValidValue(this.form.gender)) {
          this.messageText = '请选择性别'
        } else if (!getValidValue(this.form.fullName)) {
          this.messageText = '请填写姓名'
        } else if (!getValidValue(this.form.phone)) {
          this.messageText = '请填写手机号码'
        } else if (!isValidCellPhone(this.form.phone)) {
          this.messageText = '手机号码格式不正确'
        } else if (!getValidValue(this.form.idCard)) {
          this.messageText = '请填写身份证号'
        } else if (!this.checkIdCardNumber()) {
          this.messageText = '身份证号码格式不正确'
        } else if (!this.checkIdCardImage()) {
          this.messageText = '请上传身份证正反两张照片'
        } else if (!getValidValue(this.form.email)) {
          this.messageText = '请填写邮箱'
        } else if (!isValidEmail(this.form.email)) {
          this.messageText = '邮箱格式不正确'
        } else if (!this.form.mailName) {
          this.messageText = '请填写通讯地址信息'
        } else if (!this.form.contactName) {
          this.messageText = '请填写紧急联系人信息'
        } else if (!getValidValue(this.form.workGroup)) {
          this.messageText = '请选择工作组别/角色'
        }

        if (this.messageText) {
          this.$refs.message.open()
          valid = false
        }
        return valid
      },
      submit() {
        if (this.checkValidate()) {
          // this.loading = true;
          // this.showLoading()
          // api.then(() => {
          //   this.msgType = 'success';
          //   this.$refs.message.open();
          //   this.messageText = `保存成功`;
          //   this.hideLoading()
          // }).catch(() => (this.hideLoading()));
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .avatar-container {
    ::v-deep button {
      padding-right: 0;
      line-height: 80rpx;
      background-color: transparent;
    }

    ::v-deep button::after {
      border: 0;
    }
  }

  .avatar {
    text-align: center;
    display: flex;
    justify-content: center;

    .image {
      height: 80rpx;
      width: 80rpx;
      border-radius: 50%;
      margin-right: 10rpx;
    }

    .symbol {}
  }

  .gender-view {
    display: flex;

    .gender-tag {
      margin-left: 40rpx;
    }
  }

  .id-card-upload {
    display: flex;

    .image {
      flex: 1;
      padding: 0 20rpx;
    }

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

  .click-view {
    min-width: 300rpx;
    text-align: right;

    .content {
      margin-right: 20rpx;
    }
  }

  .contact {
    .contact-name {}

    .contact-phone {
      font-size: 24rpx;
      margin-left: 20rpx;
    }
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