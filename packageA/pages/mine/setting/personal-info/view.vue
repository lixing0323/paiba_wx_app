<template>
  <view>
    <view class="tui-form-container">
      <view>
        <tui-form-item label="头像">
          <template v-slot:right>
            <view class="avatar">
              <image class="image" :src="form.avatarUrl || require('@/static/icon/avatar.png')" />
            </view>
          </template>
        </tui-form-item>
        <tui-form-item label="昵称">
          <template v-slot:right> {{ getContent(form.nickName) }} </template>
        </tui-form-item>
        <tui-form-item label="性别">
          <template v-slot:right>{{ getContent(form.gender) }} </template>
        </tui-form-item>
        <tui-form-item label="姓名">
          <template v-slot:right> {{ getContent(form.fullName) }} </template>
        </tui-form-item>
        <tui-form-item label="手机号">
          <template v-slot:right> {{ getContent(form.phone) }} </template>
        </tui-form-item>
        <tui-form-item label="身份证号">
          <template v-slot:right> {{ getContent(form.idCard) }} </template>
        </tui-form-item>

        <tui-form-item direction="column" label="身份证照片" content-margin-top="8px">
          <template>
            <view class="id-card-upload">
              <ht-upload-files class="image" :readonly="true" :value="[form.portraitUrl]">
                <view class="portrait-image"> 身份证人像图 </view>
              </ht-upload-files>
              <ht-upload-files class="image" :readonly="true" :value="[form.emblemUrl]">
                <view class="emblem-image"> 身份证国徽图 </view>
              </ht-upload-files>
            </view>
          </template>
        </tui-form-item>

        <tui-form-item label="邮箱">
          <template v-slot:right> {{ getContent(form.email) }} </template>
        </tui-form-item>

        <tui-form-item label="通讯地址" :rightContent="getContent(form.mailRegion)">
          <template v-slot:right>
            <address-view-card :info="form" />
          </template>
        </tui-form-item>

        <tui-form-item label="紧急联系人" direction="column">
          <contact-view-card :info="form" />
        </tui-form-item>

        <tui-form-item label="工作组别/角色">
          <template v-slot:right> {{ getContent(form.workGroup) }} </template>
        </tui-form-item>

        <tui-form-item direction="column" label="教育经历" :rightContent="getContent(form.eduSchool)">
          <education-view-card :info="form" />
        </tui-form-item>

        <tui-form-item direction="column" label="工作经历" :rightContent="getContent(form.workCompany)">
          <work-view-card :info="form" />
        </tui-form-item>

        <tui-form-item direction="column" label="我的作品"
          :rightContent="getContent(getCreationDescription(form.myCreationImages, form.myCreationVideos))">
          <my-creation-view-card :info="form" />
        </tui-form-item>

        <tui-form-item direction="column" label="我的成就" :rightContent="form.myAchievementContent?'':'-'"
          content-margin-top="8px">
          <tui-textarea v-if="form.myAchievementContent" isCounter disabled autoHeight
            v-model="form.myAchievementContent" textarea-border placeholder="我的成就" maxlength="500" />
        </tui-form-item>

        <tui-form-item direction="column" label="自我评价" :rightContent="form.selfEvaluationContent?'':'-'"
          content-margin-top="8px">
          <tui-textarea v-if="form.selfEvaluationContent" isCounter disabled autoHeight
            v-model="form.selfEvaluationContent" textarea-border placeholder="自我评价" maxlength="500" />
        </tui-form-item>
      </view>
    </view>

    <view class="submit-bt-view">
      <view class="btns">
        <tui-form-button class="item" type="primary" @click="onSubmit()" :loading="updateBtLoading">修改</tui-form-button>
        <tui-form-button plain class="item right" @click="onCreateQrCode()">生成二维码</tui-form-button>
      </view>
    </view>

    <ht-personal-qr-code :show.sync="dialogVisible" />
  </view>
</template>
<script>
  import AddressViewCard from '@/packageA/pages/components/address-view-card/index.vue'
  import ContactViewCard from '@/packageA/pages/components/contact-view-card/index.vue'
  import EducationViewCard from '@/packageA/pages/components/education-view-card/index.vue'
  import WorkViewCard from '@/packageA/pages/components/work-view-card/index.vue'
  import MyCreationViewCard from '@/packageA/pages/components/my-creation-view-card/index.vue'

  import {
    mapGetters
  } from 'vuex';

  import {
    getInformation,
    getCreationDescription
  } from '@/packageA/pages/mine/edit/var.js'

  export default {
    components: {
      AddressViewCard,
      ContactViewCard,
      EducationViewCard,
      WorkViewCard,
      MyCreationViewCard
    },
    props: {},
    data() {
      return {
        updateBtLoading: false,
        form: {
          // 紧急联系人信息
          contactName: '',
          contactRelation: '',
          contactPhone: '',
          contactAddress: '',
          // 通讯地址信息
          mailName: '',
          mailRegion: '',
          mailPhone: '',
          mailAddress: '',
          // 工作组别/角色
          workGroup: '',
          // 教育经历
          eduSchool: '',
          eduDate: [],
          eduSpeciality: '',
          eduEducation: '',
          eduExperience: '',
          // 工作经历
          workCompany: '',
          workIndustry: '',
          workDate: [],
          workDepartment: '',
          workJob: '',
          workContent: '',
          // 我的作品
          myCreationImages: [],
          myCreationVideos: [],
          // 我的成就
          myAchievementContent: '',
          // 自我评价
          selfEvaluationContent: '',

          avatarUrl: '',
          nickName: '',
          phone: '',
          gender: '',
          fullName: '',
          idCard: '',
          email: '',
          portraitUrl: '',
          emblemUrl: ''
        },
        id: undefined,
        dialogVisible: false
      };
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    onLoad(params) {
      this.id = params.id
    },
    onShow() {
      this.getItemData()
    },
    methods: {
      getCreationDescription,
      getItemData() {
        const info = getInformation()
        Object.keys(this.form).map(key => {
          this.form[key] = info[key]
        })
      },
      getContent(content) {
        return content || '-'
      },
      onSubmit() {
        uni.navigateTo({
          url: `/packageA/pages/mine/setting/personal-info/edit?id=1`
        })
      },
      onCreateQrCode() {
        this.dialogVisible = true
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

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
  }

  .id-card-upload {
    display: flex;

    .image {
      flex: 1;
      padding: 0 20rpx;
    }

    ::v-deep .uni-file-picker .file-picker__box {
      height: 100px !important;
      width: 170px !important;
    }

    ::v-deep .uni-file-picker .file-picker__box-content {
      background-color: #efefef !important;
      border-radius: 20rpx !important;
    }

    .portrait-image {}

    .emblem-image {}
  }
</style>