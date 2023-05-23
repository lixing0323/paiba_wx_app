<template>
  <view>
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog type="info" cancelText="取消" :beforeClose="true" confirmText="确定" title="产品申请" @close="close" @confirm="confirmApply">
        <view style="margin-bottom: 20rpx;"><uni-easyinput style="width: 100%;" contentHeight="70rpx" v-model="form.contactPhone" placeholder="联系电话" maxlength="15" /></view>
        <uni-easyinput height="100%" type="textarea" autoHeight v-model="form.comment" placeholder="备注" maxlength="50" />
      </uni-popup-dialog>
    </uni-popup>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="success" message="申请成功" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
import { postLoanProductApplies } from '@/apis/product.js';
import WxMessageMixin from '@/mixins/wxMessageMixin.js';

export default {
  props: {
    product: {
      type: Object,
      default: undefined
    }
  },
  mixins: [WxMessageMixin],
  data() {
    return {
      form: {
        contactName: '',
        contactPhone: '',
        comment: ''
      }
    };
  },
  methods: {
    initForm() {
      this.form = { contactName: undefined, contactPhone: '', comment: '' };
    },
    close() {
      this.$refs.alertDialog.close();
    },
    confirmApply() {
      this.form.loanProductId = this.product.id;
      postLoanProductApplies(this.form).then(resp => {
        this.$refs.alertDialog.close();
        uni.showToast({
          title: `提交成功！`,
          icon: 'none',
          duration: 3000
        });
        this.requestMessage('APPLY_PRODUCT');
      });
    }
  }
};
</script>

<style scoped lang="scss">
.tab-box {
  width: 100%;
  margin: 0 auto;
  height: 80rpx;
  font-size: $normal-font-size;
}

.tab-item {
  display: inline-block;
  width: 50%;
  text-align: center;
  line-height: 60rpx;
  color: #333333;
  background-color: #ffffff;
  border-radius: 8rpx;
  letter-spacing: 5rpx;
}

.active {
  color: $system-color;
  background-color: #eadec1;
  font-weight: bold;
  border-radius: 8rpx;
  letter-spacing: 5rpx;
}
</style>
