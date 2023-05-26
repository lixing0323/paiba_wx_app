<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item asterisk label="公司">
        <template v-slot:right>
          <view class="click-view" @click="gotoCompany()">
            <text class="content">{{ form.company }}</text> >
          </view>
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="行业">
        <template v-slot:right>
          <view class="click-view" @click="gotoIndustry()">
            <text class="content">{{ form.industry }}</text> >
          </view>
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="在职时间">
        <template v-slot:right>
          <picker-date-input :start="startDate" :end="endDate" @click-start="showStartDate=true"
            @click-end="showEndDate=true" />
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="所属部门">
        <template v-slot:right>
          <input :value="form.department" class="input-view-value" placeholder="请填写"
            @input="form.department = $event.detail.value" />
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="职位名称">
        <template v-slot:right>
          <view class="click-view" @click="gotoJob()">
            <text class="content">{{ form.job }}</text> >
          </view>
        </template>
      </tui-form-item>
      <tui-form-item asterisk direction="column" label="工作内容" content-margin-top="8px">
        <tui-textarea isCounter height="400rpx" v-model="form.content" textarea-border maxlength="500"
          placeholder="填写工作内容" />
      </tui-form-item>
    </view>

    <view class="submit-bt-view">
      <button type="primary" @click="submit()" :disabled="loading">保存</button>
    </view>

    <picker-date-selctor :value="startDate" :visible.sync="showStartDate" @change="onChangeStart" />
    <picker-date-selctor :value="endDate" :visible.sync="showEndDate" @change="onChangeEnd" />

    <uni-popup ref="message" type="message">
      <uni-popup-message type="error" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  import FormMixin from '@/mixins/formMixin.js'
  import PickerEducation from '@/packageA/pages/components/picker-education/index.vue'
  import PickerDateInput from '@/packageA/pages/components/picker-date/index.vue'
  import PickerDateSelctor from '@/packageA/pages/components/picker-date/selector.vue'

  import {
    saveWorkExperience,
    getWorkExperience
  } from './var.js'
  import {
    isValidCellPhone
  } from '@/common/regular.js'


  export default {
    mixins: [FormMixin],
    components: {
      PickerEducation,
      PickerDateInput,
      PickerDateSelctor
    },
    data() {
      return {
        id: undefined,
        showPicker: false,
        pickerValue: undefined,
        startDate: [],
        endDate: [],
        showStartDate: false,
        showEndDate: false,
        form: {
          company: '',
          industry: '',
          date: [],
          department: '',
          job: '',
          content: ''
        }
      }
    },
    computed: {},
    onShow() {
      this.getItemData()
    },
    onLoad() {},
    methods: {
      // 保存
      save() {
        return new Promise((resolve, reject) => {
          saveWorkExperience(this.form)
          resolve()
        })
      },
      getItemData() {
        const info = getWorkExperience()
        Object.keys(this.form).map(key => {
          this.form[key] = info[key]
        })
        if (this.form.date && this.form.date.length === 2) {
          this.startDate = this.form.date[0]
          this.endDate = this.form.date[1]
        }
      },
      gotoCompany() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/company`
          })
        })
      },
      gotoIndustry() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/industry`
          })
        })
      },
      gotoSpeciality() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/speciality`
          })
        })
      },
      gotoJob() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/job`
          })
        })
      },
      onChangeStart(value) {
        this.startDate = value
        const end = this.endDate ? this.endDate : []
        this.form.date = [value, end]
      },
      onChangeEnd(value) {
        this.endDate = value
        const start = this.startDate ? this.startDate : []
        this.form.date = [start, value]
      },
      checkWorkDate() {
        if (this.form.date && this.form.date.length === 2) {
          return this.form.date[0].length === 2 && this.form.date[1].length === 2
        }
        return false
      },
      checkValidate() {
        this.messageText = undefined
        let valid = true
        if (!this.form.company) {
          this.messageText = '请填写公司'
        } else if (!this.form.industry) {
          this.messageText = '请填写行业'
        } else if (!this.checkWorkDate()) {
          this.messageText = '请选择在职时间'
        } else if (!this.form.department) {
          this.messageText = '请填写所属部门'
        } else if (!this.form.job) {
          this.messageText = '请选择职位名称'
        } else if (!this.form.content) {
          this.messageText = '请填写工作内容'
        }

        if (this.messageText) {
          this.$refs.message.open()
          valid = false
        }
        return valid
      },
      submit() {
        if (this.checkValidate()) {
          this.save().then(() => {
            uni.navigateBack()
          })
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .click-view {
    min-width: 300rpx;
    text-align: right;

    .content {
      margin-right: 20rpx;
    }
  }

  .input-view-value {
    text-align: right;
    font-size: $normal-font-size;
    color: black;
    vertical-align: middle;
  }
</style>