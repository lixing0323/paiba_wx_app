<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item asterisk label="头像">
        <template v-slot:right>
          <view class="avatar-container">
            <button class="avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
              <image class="image" :src="form.avatarUrl || require('@/static/icon/avatar.png')" />
              <view class="symbol"> > </view>
            </button>
          </view>
        </template>
      </tui-form-item>
      <tui-form-item asterisk label="昵称">
        <template v-slot:right>
          <input :value="form.nickName" class="input-view-value" type="nickname" placeholder="请填写" @blur="onNickName" />
        </template>
      </tui-form-item>
    </view>

    <view class="submit-bt-view">
      <button type="primary" @click="onSubmit">保存</button>
    </view>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="error" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  import {
    getCosFileUrl,
    sliceUploadFileOnCOS,
    filenameWithTimestamp
  } from '@/common/cos.js';
  import {
    getValidValue
  } from '@/common/utils.js'

  import {
    mapGetters
  } from 'vuex';

  export default {
    data() {
      return {
        form: {
          avatarUrl: '',
          nickName: '',
        },
        messageText: ''
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    onLoad() {
      this.getItemData()
    },
    methods: {
      getItemData() {
        this.form.nickName = this.userInfo.nickName
        this.form.avatarUrl = this.userInfo.avatarUrl
      },
      onNickName(e) {
        this.form.nickName = e.detail.value
      },
      onChooseAvatar(e) {
        const filePath = e.detail.avatarUrl
        this.form.avatarUrl = filePath
        console.log(e.detail, '111')
        wx.getFileSystemManager().readFile({
          filePath: filePath,
          encoding: 'base64',
          position: 0,
          success: (res) => {
            const base64 = `data:image/png;base64,${res.data}`
            // this.avatarUrl = base64
            // const file = this.base64UrlToFile(base64, filenameWithTimestamp('1.png'))
          }
        })
      },
      base64UrlToFile(base64Url, filename) {
        // 1.先将base64转换成blob
        const arr = base64Url.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        // 2.再将blob转换成file文件
        return new File([u8arr], filename, {
          type: mime
        });
      },
      uploadCurrentFilesToCOS(files) {
        uni.showLoading();
        const selects = Object.assign([], files);
        selects.forEach(item => {
          item.name = `template/${filenameWithTimestamp(item.path)}`;
        });
        sliceUploadFileOnCOS(selects)
          .then(data => {
            this.uploadSuccess(data);
          })
          .catch(err => {
            uni.hideLoading();
            uni.showToast({
              title: `上传腾讯服务器失败: ${err}`,
              icon: 'none'
            });
          });
      },
      // 上传成功
      uploadSuccess(data) {
        const images = [];
        data.files.forEach(item => {
          images.push(getCosFileUrl(item.data));
        });
        uni.hideLoading();
      },
      checkValidate() {
        this.messageText = undefined
        let valid = true
        if (!this.form.avatarUrl) {
          this.messageText = '请选择头像'
        } else if (!getValidValue(this.form.nickName)) {
          this.messageText = '请填写昵称'
        }

        if (this.messageText) {
          this.$refs.message.open()
          valid = false
        }
        return valid
      },
      onSubmit() {
        if (this.checkValidate()) {
          this.$store.dispatch('user/saveUserInfo', {
            avatarUrl: this.form.avatarUrl,
            nickName: this.form.nickName
          });
          uni.navigateBack()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .avatar-container {
    ::v-deep button {
      padding-right: 0;
      line-height: 80rpx;
      background-color: transparent;
    }

    ::v-deep button::after {
      border: 0;
    }
  }

  .avatar {
    text-align: center;
    display: flex;
    justify-content: center;

    .image {
      height: 80rpx;
      width: 80rpx;
      border-radius: 50%;
      margin-right: 10rpx;
    }

    .symbol {}
  }


  .submit-bt-view {
    margin-top: 80rpx;
  }
</style>