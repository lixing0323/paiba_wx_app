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
          <view class="click-view" @click="showPicker=true">
            <text class="content">{{ form.region }}</text> >
          </view>
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="时间段">
        <template v-slot:right>
          <uni-datetime-picker :border="false" :clear-icon="false" v-model="form.date" type="daterange"
            rangeSeparator="至" />
        </template>
      </tui-form-item>

      <tui-form-item asterisk direction="column" label="在校经历" content-margin-top="8px">
        <tui-textarea isCounter autoHeight v-model="form.address" textarea-border maxlength="200"
          placeholder="填写在校经历" />
      </tui-form-item>
    </view>

    <view class="submit-bt-view">
      <button type="primary" @click="submit()" :disabled="loading">保存</button>
    </view>

    <tui-picker :value="pickerValue" :show="showPicker" :layer="3" :pickerData="items__3" :params="2"
      @hide="showPicker=false" @change="changePicker">
    </tui-picker>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="error" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  import FormMixin from '@/mixins/formMixin.js'
  import {
    getEducationExperience,
    saveEducationExperience
  } from './var.js'
  import {
    isValidCellPhone
  } from '@/common/regular.js'


  export default {
    mixins: [FormMixin],
    components: {},
    data() {
      return {
        id: undefined,
        showPicker: false,
        pickerValue: [],
        form: {
          school: '',
          date: '',
          speciality: '',
          education: '',
          experience: ''
        },
        items__3: [{
          text: '广东省',
          value: '100',
          children: [{
            text: '广州市',
            value: '10001',
            children: [{
              text: '天河区',
              value: '1000101'
            }, {
              text: '黄埔区',
              value: '1000102'
            }, {
              text: '从化区',
              value: '1000103'
            }]
          }, {
            text: '深圳市',
            value: '10002',
            children: [{
              text: '福田区',
              value: '1000201'
            }, {
              text: '南山区',
              value: '1000202'
            }]
          }]
        }, {
          text: '安徽省',
          value: '200',
          children: [{
            text: '合肥市',
            value: '20001',
            children: [{
              text: '包河区',
              value: '2000101'
            }, {
              text: '滨湖区',
              value: '2000102'
            }]
          }, {
            text: '安庆市',
            value: '20002',
            children: [{
              text: '桐城市',
              value: '2000201'
            }, {
              text: '怀宁县',
              value: '2000202'
            }]
          }]
        }]
      };
    },
    computed: {},
    onShow() {
      this.getItemData()
    },
    methods: {
      getItemData() {
        this.form = Object.assign({}, getEducationExperience())
      },
      gotoSchool() {
        uni.navigateTo({
          url: `/packageA/pages/mine/edit/school`
        })
      },
      changePicker(e) {
        this.form.region = e.text.join('/')
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
        } else if (!this.form.date) {
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
          saveEducationExperience(this.form)
          uni.navigateBack()
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