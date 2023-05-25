<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item direction="column" label="请上传《商场入驻申请表》" content-margin-top="8px">
        <template>
          <view class="input-view">
            <ht-upload-files ref="files" file-mediatype="doc" :limit="9" @selection-change="onChangeFiles" />
          </view>
        </template>
      </tui-form-item>
    </view>

    <view class="submit-bt-view">
      <button type="primary" @click="submit()" :disabled="loading">申请加入</button>
    </view>
  </view>
</template>
<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        loading: false,
        form: {
          files: []
        }
      };
    },
    computed: {},
    created() {},
    methods: {
      onChangeFiles(files) {
        this.form.files = files;
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>