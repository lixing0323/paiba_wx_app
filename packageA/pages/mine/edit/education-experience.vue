<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item asterisk label="学校">
        <template v-slot:right>
          <view class="click-view" @click="gotoSchool()">
            <text class="content">{{ form.school }}</text> >
          </view>
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="学历">
        <template v-slot:right>
          <view class="click-view" @click="showPicker=true">
            <text class="content">{{ form.education }}</text> >
          </view>
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="专业">
        <template v-slot:right>
          <view class="click-view" @click="gotoSpeciality()">
            <text class="content">{{ form.speciality }}</text> >
          </view>
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="时间段">
        <template v-slot:right>
          <picker-date-input :start="startDate" :end="endDate" @click-start="showStartDate=true"
            @click-end="showEndDate=true" />
        </template>
      </tui-form-item>

      <tui-form-item asterisk direction="column" label="在校经历" content-margin-top="8px">
        <tui-textarea isCounter height="400rpx" v-model="form.experience" textarea-border maxlength="500"
          placeholder="填写在校经历" />
      </tui-form-item>
    </view>

    <view class="submit-bt-view">
      <button type="primary" @click="submit()" :disabled="loading">保存</button>
    </view>

    <picker-date-selctor :value="startDate" :visible.sync="showStartDate" @change="onChangeStart" />
    <picker-date-selctor :value="endDate" :visible.sync="showEndDate" @change="onChangeEnd" />

    <picker-education :visible="showPicker" :value="pickerValue" @close="showPicker=false" @change="onChangePicker" />

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
    getEducationExperience,
    saveEducationExperience
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
          school: '',
          date: [],
          speciality: '',
          education: '',
          experience: ''
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
          saveEducationExperience(this.form)
          resolve()
        })
      },
      getItemData() {
        const info = getEducationExperience()
        Object.keys(this.form).map(key => {
          this.form[key] = info[key]
        })
        if (this.form.date && this.form.date.length === 2) {
          this.startDate = this.form.date[0]
          this.endDate = this.form.date[1]
        }
        if (this.form.education) {
          this.pickerValue = this.form.education.split("/")
        }
      },
      gotoSchool() {
        this.save().then(() => {
          uni.navigateTo({
            url: `/packageA/pages/mine/edit/school`
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
      onChangePicker(value) {
        this.form.education = value.join('/')
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
      checkEducationDate() {
        if (this.form.date && this.form.date.length === 2) {
          return this.form.date[0].length === 2 && this.form.date[1].length === 2
        }
        return false
      },
      checkValidate() {
        this.messageText = undefined
        let valid = true
        if (!this.form.school) {
          this.messageText = '请填写学校'
        } else if (!this.form.education) {
          this.messageText = '请选择学历'
        } else if (!this.form.speciality) {
          this.messageText = '请选择专业'
        } else if (!this.checkEducationDate()) {
          this.messageText = '请选择时间段'
        } else if (!this.form.experience) {
          this.messageText = '请填写在校经历'
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
</style>