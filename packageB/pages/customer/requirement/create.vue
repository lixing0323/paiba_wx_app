<template>
  <view class="business-content-top-20 tui-form-container">
    <tui-form-item asterisk label="需求类型" padding="26rpx 0" :left="0">
      <view slot="right">
        <picker class="picker" :range="reqTypeOptions" range-key="value" @change="bindReqType">
          <view class="view-value">{{ requirementTypeName }}
            <tui-icon class="dropdown-icon" name="arrowdown" :size="18" color="#333" />
          </view>
        </picker>
      </view>
    </tui-form-item>

    <view v-if="!isOthersType()">
      <tui-form-item asterisk :label="moneyName" padding="26rpx 0" :left="0">
        <view slot="right" class="row-item">
          <uni-easyinput width="200rpx" height="30px" v-model="form.quotaMin" placeholder="最低(万元)"
            @blur="setFloatTwo('quotaMin', 'moneyName')" />
          <text style="padding: 0 10rpx;">-</text>
          <uni-easyinput width="200rpx" height="30px" v-model="form.quotaMax" placeholder="最高(万元)"
            @blur="setFloatTwo('quotaMax', 'moneyName')" />
        </view>
      </tui-form-item>
      <tui-form-item asterisk :label="rateName" padding="26rpx 0" :left="0">
        <view slot="right" class="row-item">
          <uni-easyinput width="200rpx" height="30px" v-model="form.interestRateMin" placeholder="最低(%)"
            @blur="setFloatTwo('interestRateMin', 'rateName')" />
          <text style="padding: 0 10rpx;">-</text>
          <uni-easyinput width="200rpx" height="30px" v-model="form.interestRateMax" placeholder="最高(%)"
            @blur="setFloatTwo('interestRateMax', 'rateName')" />
        </view>
      </tui-form-item>
      <tui-form-item label="是否有指定银行？" padding="26rpx 0" :left="0">
        <view slot="right" class="flex">
          <view class="flex" @click="selectedResult('true')">
            <image :src="require(`@/static/icon/${isAssign === 'true' ? 'selected' : 'unSelected'}.png`)" class="icon">
            </image>
            <text>是</text>
          </view>
          <view class="flex" @click="selectedResult('false')">
            <image :src="require(`@/static/icon/${isAssign === 'false' ? 'selected' : 'unSelected'}.png`)" class="icon">
            </image>
            <text>否</text>
          </view>
        </view>
      </tui-form-item>
      <tui-form-item label="指定银行" v-if="isAssign === 'true'" padding="26rpx 0" :left="0">
        <view slot="right">
          <picker class="picker" :value="form.selectedBanks" :range="bankList" range-key="name" @change="bindBank">
            <view class="view-value">{{ selectedBanksName }}
              <tui-icon class="dropdown-icon" name="arrowdown" :size="18" color="#999" />
            </view>
          </picker>
        </view>
      </tui-form-item>
    </view>

    <tui-form-item label="需求描述" direction="column" padding="26rpx 0" :left="0">
      <tui-textarea isCounter autoHeight v-model="form.desc" textarea-border maxlength="200" placeholder="请您填写相关的问题描述以便于我们提供更好的服务" />
    </tui-form-item>
    <tui-form-item label="联系人" padding="26rpx 0" :left="0">
      <uni-easyinput slot="right" contentHeight="70rpx" v-model="form.contactorName" placeholder="请填写联系人" maxlength="15" />
    </tui-form-item>
    <tui-form-item label="联系电话" padding="26rpx 0" :left="0">
      <uni-easyinput slot="right" contentHeight="70rpx" v-model="form.contactNumber" placeholder="请填写联系电话"
        maxlength="15" />
    </tui-form-item>
    <tui-form-item label="上传图片" direction="column" padding="26rpx 0" :left="0" :bottom-border="false">
      <text slot="left" style="color: #999;font-size: 28rpx;">上传图片（选填，最多3张）</text>
      <ht-upload-files style="width: 100%;" ref="images" :cosKey="'feedback'" :limit="3"
        @selection-change="onChangeImages" />
    </tui-form-item>

    <view class="submit-button" style="padding-bottom: 80rpx">
      <button type="primary" @click="submit()" :disabled="loading">提交</button>
    </view>

    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="1500"></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script>
  // 需求反馈
  import {
    changeToYuan
  } from '@/common/filter.js';
  import {
    isFloatForTwo,
    isValidCellPhone,
    isFloatTowMoreThanZero,
    compareSize,
    isNumber
  } from '@/common/regular.js';
  import {
    getBank,
    postReq
  } from '@/apis/requirement.js';
  import WxMessageMixin from '@/mixins/wxMessageMixin.js';

  export default {
    mixins: [WxMessageMixin],
    data() {
      return {
        reqTypeShow: false,
        moneyName: '需求金额',
        rateName: '期望利率',
        form: {
          quotaMin: undefined,
          quotaMax: undefined,
          requirementType: undefined,
          img: [],
          selectedBanks: undefined,
          contactNumber: '',
          contactorName: '',
          interestRateMin: undefined,
          interestRateMax: undefined,
          desc: ''
        },
        isAssign: 'false',
        reqTypeOptions: [{
            value: '贷款',
            name: 'LOAN'
          },
          {
            value: '理财',
            name: 'FINANCIAL'
          },
          {
            value: '其他',
            name: 'OTHER'
          }
        ],
        selectedColor: '#22C495',
        msgType: 'error',
        messageText: '',
        extraIcon: {
          color: 'red',
          size: '22',
          type: 'gear-filled'
        },
        bankList: undefined,
        selectedBanksName: '请选择指定银行',
        requirementTypeName: '请选择需求类型',
        isShowBankList: false,
        msgType: 'error',
        messageText: undefined,
        loading: false
      };
    },
    created() {
      this.bankFilter();
    },
    methods: {
      isOthersType() {
        return this.requirementTypeName !== '贷款' && this.requirementTypeName !== '理财'
      },
      bindReqType(e) {
        this.form.requirementType = this.reqTypeOptions[e.detail.value].name;
        this.requirementTypeName = this.reqTypeOptions[e.detail.value].value;
        this.rateName = this.form.requirementType === 'LOAN' ? '期望利率' : '预期收益率';
        this.moneyName = this.form.requirementType === 'LOAN' ? '需求金额' : '预算金额';
      },
      bindBank(e) {
        this.form.selectedBanks = [{
          name: this.bankList[e.detail.value].name,
          id: this.bankList[e.detail.value].id
        }];
        this.selectedBanksName = this.bankList[e.detail.value].name;
      },
      // 已上传的图片
      onChangeImages(images) {
        this.form.img = images;
      },
      bankFilter(ev) {
        getBank({
          name: ev
        }).then(resp => {
          this.bankList = resp.items;
          // this.isShowBankList = true
        });
      },
      selectBank(i) {
        // i.switch = 'true'
        // let isExit = false
        // let data = this.form.selectedBanks
        // console.log(data, this.form.selectedBanks)
        // if (data.length == 0) {
        //   data.push({
        //     id: i.id,
        //     name: i.name
        //   })
        // } else {
        //   // 判断是否反选
        //   isExit = data.some(d => (d.id === i.id))
        //   if (!isExit) {
        //     data.push({
        //       id: i.id,
        //       name: i.name
        //     })
        //   } else {
        //     data = data.filter((o) => {
        //       return o.id !== i.id
        //     })
        //     this.form.selectedBanks = data
        //   }
        // }
        // this.selectedBanksName = data.map(s => s.name).join('/')
      },
      moreThanZero(min, max) {
        return isFloatTowMoreThanZero(min) && isFloatTowMoreThanZero(max);
      },
      floatForTwo(min, max) {
        return isFloatForTwo(min) && isFloatForTwo(max);
      },
      setFloatTwo(val, text) {
        if (this['form'][val] && !isFloatTowMoreThanZero(this['form'][val])) {
          this.messageText = `${this[text]}应为非零数字(保留两位小数)`;
          this.msgType = 'error';
          this.$refs.message.open();
        }
        this['form'][val] = Math.floor(parseFloat(this['form'][val]) * 100) / 100;
      },
      formValidate() {
        this.messageText = undefined;
        if (!this.form.requirementType) {
          this.messageText = `请选择需求类型`;
        }
        if (this.form.requirementType === 'LOAN' || this.form.requirementType === 'FINANCIAL') {
          if (!this.form.quotaMin || !this.form.quotaMax) {
            this.messageText = `请填写${this.moneyName}`;
          } else if (!this.moreThanZero(this.form.quotaMin, this.form.quotaMax)) {
            this.messageText = `${this.moneyName}应为非零数字(保留两位小数)`;
          } else if (compareSize(this.form.quotaMin, this.form.quotaMax)) {
            this.messageText = `${this.moneyName}上限值必须大于下限值`;
          } else if (!this.form.interestRateMin || !this.form.interestRateMax) {
            this.messageText = `请填写${this.rateName}`;
          } else if (!this.moreThanZero(this.form.interestRateMin, this.form.interestRateMax) || !this.floatForTwo(this
              .form.quotaMin, this.form.interestRateMax)) {
            this.messageText = `${this.rateName}应为非零数字(保留两位小数)`;
          } else if (compareSize(this.form.interestRateMin, this.form.interestRateMax)) {
            this.messageText = `期望利率上限值必须大于下限值`;
          }
        }
        if (this.form.contactNumber && !isNumber(this.form.contactNumber)) {
          this.messageText = `请填写正确的联系电话`;
        }
      },
      selectedResult(val) {
        this.isAssign = val;
      },
      // 提交
      submit() {
        this.formValidate();
        if (this.messageText) {
          this.msgType = 'error';
          this.$refs.message.open();
        } else {
          if (!this.isAssign) {
            this.form.selectedBanks = undefined;
          } else {
            if (this.form.selectedBanks === '请选择指定银行') {
              this.form.selectedBanks = undefined;
            }
          }
          const data = Object.assign({}, this.form);
          data.quotaMin = data.quotaMin ? changeToYuan(data.quotaMin) : undefined;
          data.quotaMax = data.quotaMax ? changeToYuan(data.quotaMax) : undefined;
          this.loading = true;
          postReq(data)
            .then(() => {
              this.msgType = 'success';
              this.$refs.message.open();
              this.messageText = `提交成功`;
              this.loading = false;
              this.requestMessage('REQ');
            })
            .catch(() => (this.loading = false));
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .view-value {
    font-size: 28rpx;
    font-weight: normal;
    color: grey;
  }

  .textarea {
    padding: 0 10rpx;
  }

  .number {
    color: #999;
    font-size: 12px;
  }

  .reqStyle {
    uni-data-select {
      width: 75%;
    }
  }

  .row-item {
    display: flex;
    //width: 70%;
    align-items: center;
    float: right;
  }

  .radiobox-size {
    transform: scale(0.6);
    color: $system-color;
  }

  .scroll-view {
    width: calc(100% -2px);
    border: 1px solid #e5e5e5;
    margin-top: 1rpx;
    border-top: none;
    max-height: 300rpx;
    overflow: scroll;
    z-index: 9999;
    border: 0.5px solid #ebebeb;
    box-shadow: 0 2px 12px 0 #ebebeb;

    text {
      display: block;
      padding: 10rpx 0rpx 10rpx 20rpx;
      border-bottom: 1px solid #e5e5e5;
    }

    .selector {
      color: $system-color;
    }
  }

  .flex {
    display: flex;
    align-items: center;
    margin-left: 25rpx;

    text {
      font-size: 26rpx;
    }
  }

  .icon {
    width: 30rpx;
    height: 30rpx;
    vertical-align: middle;
    margin-right: 10rpx;
  }

  .warning-hint {
    font-size: 24rpx;
    color: red;
  }

  .dropdown-icon {
    margin-left: 10rpx;
  }

  .submit-button {
    position: relative;
    height: 100rpx;
    margin: 20rpx auto;
  }
</style>
