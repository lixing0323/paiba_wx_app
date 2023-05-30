<template>
  <view>
    <view class="avatar-container">
      <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <view class="avatar">
          <image class="image" :src="avatarUrl"></image>
        </view>
      </button>
    </view>

    <view class="nickname-container">
      <input class="input" type="nickname" placeholder="请输入昵称" v-model="nickName" @blur="onNickName" />
    </view>

    <view class="submit-bt-view">
      <button type="primary" @getphonenumber="getPhone">保存</button>
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
    get_files_and_is_max,
    get_file_data,
  } from '@/components/ht-upload-files/utils.js'

  import {
    getInformation,
    saveAvatar
  } from './var.js'

  export default {
    data() {
      return {
        avatarUrl: '',
        nickName: '',
        messageText: ''
      }
    },
    onLoad() {
      this.getItemData()
    },
    methods: {
      getItemData() {
        this.avatarUrl = getInformation().avatarUrl || require('@/static/icon/avatar.png')
      },
      onNickName(e) {
        this.nickName = e.detail.value
      },
      onChooseAvatar(e) {
        const filePath = e.detail.avatarUrl
        this.avatarUrl = filePath
        console.log(this.avatarUrl, '111')
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
        console.log(images)
        uni.hideLoading();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .avatar-container {
    margin-top: 80rpx;

    ::v-deep button {
      padding-right: 0;
      line-height: 100%;
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
      height: 400rpx;
      width: 400rpx;
      border-radius: 50%;

    }
  }

  .nickname-container {
    margin-top: 80rpx;
    text-align: center;
    display: flex;
    justify-content: center;

    .input {
      width: 300rpx;
    }
  }

  .submit-bt-view {
    margin-top: 80rpx;
  }
</style>