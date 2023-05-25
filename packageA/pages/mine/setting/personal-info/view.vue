<template>
  <view>
    <view class="tui-form-container">
      <view class="userinfo-detail">
        <tui-form-item label="头像">
          <template v-slot:right>
            <view class="user-pic">
              <image :src="form.avatarUrl || require('@/static/img/user-profile.png')" />
            </view>
          </template>
        </tui-form-item>
        <tui-form-item label="昵称">
          <template v-slot:right>
            可爱的猫咪
          </template>
        </tui-form-item>
        <tui-form-item label="性别">
          <template v-slot:right>
            男
          </template>
        </tui-form-item>
        <tui-form-item label="姓名">
          <template v-slot:right>
            张三
          </template>
        </tui-form-item>
        <tui-form-item label="手机号">
          <template v-slot:right>
            13112345678
          </template>
        </tui-form-item>
        <tui-form-item label="身份证号">
          <template v-slot:right>
            610112202005259810
          </template>
        </tui-form-item>

        <tui-form-item direction="column" label="身份证照片" content-margin-top="8px">
          <template>
            <view class="id-card-upload">
              <image class="image" :src="form.portraitImages[0]" @click.stop="previewImage(form.portraitImages[0])" />
              <image class="image" :src="form.emblemImages[0]" @click.stop="previewImage(form.emblemImages[0])" />
            </view>
          </template>
        </tui-form-item>

        <tui-form-item label="邮箱">
          <template v-slot:right>
            xx@163.com
          </template>
        </tui-form-item>

        <tui-form-item label="通讯地址">
          <template v-slot:right>
            陕西省西安市高新区2号 创业街区1#402室
          </template>
        </tui-form-item>

        <tui-form-item label="紧急联系人">
          <template v-slot:right>
            李四
          </template>
        </tui-form-item>

        <tui-form-item label="工作组别/角色">
          <template v-slot:right>
            摄影组
          </template>
        </tui-form-item>

        <tui-form-item direction="column" label="教育经历" content-margin-top="8px">
          <tui-textarea isCounter disabled autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="教育经历" />
        </tui-form-item>

        <tui-form-item direction="column" label="工作经历" content-margin-top="8px">
          <tui-textarea isCounter disabled autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="工作经历" />
        </tui-form-item>

        <tui-form-item direction="column" label="我的作品" content-margin-top="8px">
          <tui-textarea isCounter disabled autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="我的作品" />
        </tui-form-item>

        <tui-form-item direction="column" label="我的成就" content-margin-top="8px">
          <tui-textarea isCounter disabled autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="我的成就" />
        </tui-form-item>

        <tui-form-item direction="column" label="自我评价" content-margin-top="8px">
          <tui-textarea isCounter disabled autoHeight v-model="form.content" textarea-border maxlength="500"
            placeholder="自我评价" />
        </tui-form-item>
      </view>
    </view>

    <view class="submit-bt-view">
      <button type="primary" @click="submit()">修改</button>
    </view>
  </view>
</template>
<script>
  import {
    mapGetters
  } from 'vuex';

  export default {
    props: {
      isStaff: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    data() {
      return {
        loading: false,
        form: {
          fullName: undefined,
          mobile: undefined,
          gender: '男',
          idCard: undefined,
          portraitImages: [
            require('@/static/temp/id.png')
          ],
          emblemImages: [
            require('@/static/temp/id.png')
          ],
          maritalStatus: undefined,
          workUnit: undefined,
          registeredProvince: {},
          registeredCity: {},
          registeredDistrict: {},
          labelNames: []
        },
        id: undefined
      };
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    onLoad(params) {
      this.id = params.id
    },
    methods: {
      previewImage(url) {
        uni.previewImage({
          urls: [url],
          current: 0
        });
      },
      submit() {
        uni.navigateTo({
          url: `/packageA/pages/mine/setting/personal-info/edit?id=1`
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .userinfo-detail {
    .user-pic {
      width: 42rpx;
      height: 42rpx;

      image {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        border-radius: 50%;
      }
    }

    .id-card-upload {
      display: flex;

      .image {
        flex: 1;
        padding: 0 20rpx;
        height: 160rpx;
        width: 180rpx;
      }
    }
  }
</style>