import {
  getWeixinAppMessageId
} from '@/apis/message.js';

export default {
  methods: {
    // 消息推送订阅
    requestMessage(type) {
      const that = this;
      getWeixinAppMessageId({
        templateType: type
      }).then(res => {
        if (res && res.templateId) {
          uni.requestSubscribeMessage({
            tmplIds: [res.templateId],
            success(success) {
              // 允许推送
              if (success.templateId === 'accept') {}
              that.gotoNextPage();
            },
            fail(fail) {
              console.log('订阅消息错误=', fail);
            }
          });
        }
      });
    },
    gotoNextPage() {
      uni.navigateTo({
        url: `/pages/loadingPage/index?backDelta=2`
      });
    }
  }
}
