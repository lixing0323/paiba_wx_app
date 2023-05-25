<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item asterisk label="联系人姓名">
        <template v-slot:right>
          <input :value="form.name" class="input-view-value" placeholder="请填写"
            @input="form.name = $event.detail.value" />
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="与本人关系">
        <template v-slot:right>
          <input :value="form.relation" class="input-view-value" placeholder="请填写"
            @input="form.relation = $event.detail.value" />
        </template>
      </tui-form-item>

      <tui-form-item asterisk label="联系人电话">
        <template v-slot:right>
          <input :value="form.phone" type="number" class="input-view-value" placeholder="请填写"
            @input="form.phone = $event.detail.value" />
        </template>
      </tui-form-item>

      <tui-form-item asterisk direction="column" label="联系人住址" content-margin-top="8px">
        <tui-textarea isCounter autoHeight v-model="form.address" textarea-border maxlength="200"
          placeholder="填写联系人住址" />
      </tui-form-item>
    </view>

    <view class="submit-bt-view">
      <button type="primary" @click="submit()" :disabled="loading">保存</button>
    </view>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="error" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  import FormMixin from '@/mixins/formMixin.js'
  import {
    saveEmergencyContact,
    getEmergencyContact
  } from './var.js'

  export default {
    mixins: [FormMixin],
    components: {},
    data() {
      return {
        id: undefined,
        form: {
          name: '',
          relation: '',
          phone: '',
          address: ''
        }
      };
    },
    computed: {},
    onLoad() {
      this.getItemData()
    },
    methods: {
      getItemData() {
        this.form = Object.assign({}, getEmergencyContact())
      },
      checkValidate() {
        this.messageText = undefined
        let valid = true
        if (!this.form.name) {
          this.messageText = '请填写联系人姓名'
        } else if (!this.form.relation) {
          this.messageText = '请填写与本人之间的关系'
        } else if (!this.form.phone) {
          this.messageText = '请填写联系人电话'
        } else if (!this.form.address) {
          this.messageText = '请填写联系人住址'
        }

        if (this.messageText) {
          this.$refs.message.open()
          valid = false
        }
        return valid
      },
      submit() {
        if (this.checkValidate()) {
          saveEmergencyContact(this.form)
          uni.navigateBack()
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .input-view-value {
    text-align: right;
    font-size: $normal-font-size;
    color: black;
    vertical-align: middle;
  }
</style>