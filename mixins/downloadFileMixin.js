export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    // 下载文件
    doDownloadFile(url) {
      // 是否是图片
      if (this.isImage(url)) {
        this.openImage(url);
      } else {
        this.openDocument(url);
      }
    },
    // 是否是图片
    isImage(url) {
      const dotIdx = url.lastIndexOf('.');
      const suffix = url.substring(dotIdx);
      const filters = ['.png', '.jpeg', '.jpg', '.bmp', '.gif', '.svg', '.webp'];
      const index = filters.findIndex(item => (item.toUpperCase() === suffix.toUpperCase()))
      return index !== -1;
    },
    // 预览图片
    openImage(imgUrl) {
      uni.previewImage({
        urls: [imgUrl],
        longPressActions: {
          success: data => {},
          fail: err => {
            uni.showToast({
              title: '暂不支持此类型',
              icon: 'error',
              duration: 2000
            });
          }
        }
      });
    },
    // 打开文档
    openDocument(docUrl) {
      uni.downloadFile({
        url: docUrl,
        success: function(res) {
          var filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            showMenu: true,
            success: data => {},
            fail: err => {
              uni.showToast({
                title: '暂不支持此类型',
                icon: 'error',
                duration: 2000
              });
            }
          });
        }
      });
    }
  }
}
