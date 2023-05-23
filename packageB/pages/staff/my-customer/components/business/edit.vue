<template>
  <view>
    <ht-module-card :title="`${isEdit ? '编辑' : '新建'}`" :open="false">
      <template v-slot:right>
        <ht-camera name="营业执照识别" @success="uploadCameraImgSuccess"></ht-camera>
      </template>
      <uni-list>
        <uni-list-item direction="column" title="公司名称：" showRequired>
          <template v-slot:footer>
            <input :value="companyForm.name" class="input-view-value" placeholder="请输入" @input="companyForm.name = $event.detail.value" />
          </template>
        </uni-list-item>
        <uni-list-item direction="column" title="统一社会信用代码：" showRequired>
          <template v-slot:footer>
            <input :value="companyForm.unifyCode" class="input-view-value" placeholder="请输入" @input="companyForm.unifyCode = $event.detail.value" />
          </template>
        </uni-list-item>
        <uni-list-item class="business-datetime" listItemHeight="50rpx" title="注册日期：" showRequired>
          <template v-slot:footer>
            <uni-datetime-picker type="date" :end="Date.now()" v-model="companyForm.registeredDate" @change="changeDate">{{ registeredDateShowing }}</uni-datetime-picker>
          </template>
        </uni-list-item>
        <uni-list-item listItemHeight="50rpx" title="法人代表：">
          <template v-slot:footer>
            <input :value="companyForm.legalRepresentative" class="input-view-value" placeholder="请输入" @input="companyForm.legalRepresentative = $event.detail.value" />
          </template>
        </uni-list-item>
        <uni-list-item title="经营范围：" direction="column">
          <template v-slot:footer>
            <uni-easyinput class="input-text-area" type="textarea" autoHeight v-model="companyForm.businessScope" maxlength="1000" />
          </template>
        </uni-list-item>
      </uni-list>
    </ht-module-card>
    <view class="submit-bt-view"><button type="primary" @click="submit()" :disabled="loading">提交</button></view>
    <uni-popup ref="message" type="message"><uni-popup-message :type="msgType" :message="messageText" :duration="1500"></uni-popup-message></uni-popup>
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
import { getCustomerCompanyWithId, putCustomerCompanyWithId, postCustomerCompany } from '@/apis/staff/company.js';
import { isUnifyCode } from '@/common/regular.js';
import { getLicenseOfOCR } from '@/apis/ocr.js';

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },
    customerId: {
      type: Number,
      default: undefined
    }
  },
  components: {},
  data() {
    return {
      registeredDateShowing: '请选择日期',
      companyForm: {
        name: undefined,
        unifyCode: undefined,
        businessScope: '',
        registeredDate: '',
        legalRepresentative: undefined
      },
      companyId: undefined,
      msgType: 'error',
      messageText: undefined
    };
  },
  onLoad(params) {
    this.companyId = params.id;
    this.getItem();
  },
  methods: {
    getItem() {
      if (this.isEdit) {
        getCustomerCompanyWithId(this.companyId).then(res => {
          this.companyForm.name = res.name;
          this.companyForm.unifyCode = res.unifyCode;
          this.companyForm.businessScope = res.businessScope;
          this.companyForm.registeredDate = res.registeredDate;
          this.companyForm.legalRepresentative = res.legalRepresentative;
          this.registeredDateShowing = res.registeredDate;
        });
      }
    },
    checkFormValidate() {
      const checkUnifyCode = isUnifyCode(this.companyForm.unifyCode);
      this.messageText = undefined;
      if (!this.companyForm.name) {
        this.messageText = `请填写公司名称`;
      } else if (!this.companyForm.unifyCode) {
        this.messageText = `请填写统一社会信用代码`;
      } else if (!checkUnifyCode) {
        this.messageText = `统一社会信用代码不合规`;
      } else if (!this.companyForm.registeredDate) {
        this.messageText = `请选择注册日期`;
      }
      return !this.messageText;
    },
    changeDate(val) {
      this.companyForm.registeredDate = val;
      this.registeredDateShowing = val;
    },
    getApis() {
      let data = Object.assign(this.companyForm);
      // 新建的时候，需要传customerId
      data.customerId = this.isEdit ? undefined : this.customerId;
      return this.isEdit ? putCustomerCompanyWithId(this.companyId, data) : postCustomerCompany(data);
    },
    submit() {
      if (this.checkFormValidate()) {
        this.loading = true;
        this.getApis()
          .then(() => {
            this.msgType = 'success';
            this.$refs.message.open();
            this.messageText = `保存成功`;
            this.loading = false;
            uni.navigateTo({
              url: `/pages/loadingPage/index?backDelta=2`
            });
          })
          .catch(() => (this.loading = false));
      } else {
        this.msgType = 'error';
        this.$refs.message.open();
      }
    },
    // 打开相机/拍照上传成功
    uploadCameraImgSuccess(url) {
      uni.showLoading();
      getLicenseOfOCR({ imgUrl: url })
        .then(res => {
          // 年月日改成-
          let date = res.registeredDate;
          date = date.replace('年', '-');
          date = date.replace('月', '-');
          date = date.replace('日', '');

          this.companyForm.businessScope = res.businessScope ? res.businessScope : '';
          this.companyForm.legalRepresentative = res.legalRepresentative;
          this.companyForm.name = res.name;
          this.registeredDateShowing = date;
          this.companyForm.unifyCode = res.unifyCode;
          this.companyForm.registeredDate = date;
          uni.hideLoading();
        })
        .catch(() => uni.hideLoading());
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/common/business.scss';
.input-text-area {
  margin-top: 20rpx;
  z-index: 20;
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
