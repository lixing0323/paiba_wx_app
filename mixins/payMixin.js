import {
  postOrderPrepay
} from '@/apis/order.js'

export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    payment(orderNo) {
      return new Promise((resolve, reject) => {
        uni.showLoading({
          mask: true
        })

        postOrderPrepay({
          orderNo: orderNo
        }).then((resp) => {
          uni.requestPayment({
            orderInfo: 'orderInfo',
            timeStamp: resp.payinfo.timeStamp,
            nonceStr: resp.payinfo.nonceStr,
            package: resp.payinfo.package,
            signType: resp.payinfo.signType,
            paySign: resp.payinfo.paySign,
            success: function(res) {
              uni.hideLoading();
              resolve(res)
            },
            fail: function(err) {
              uni.hideLoading();
              reject('fail')
            }
          });
        }).catch(() => {
          setTimeout(() => {
            uni.hideLoading();
          }, 3000);
          reject('err')
        })
      })
    }
  }
}
