<template>
  <ht-card v-if="info.workCompany">
    <view class="education-container">
      <view class="row">
        <view class="label">公司：</view>
        <view class="value school">{{ info.workCompany }}</view>
      </view>
      <view class="row">
        <view class="label">在职时间：</view>
        <view class="value date">{{ getDate() }}</view>
      </view>
      <template v-if="showMore">
        <view class="row">
          <view class="label">所属部门：</view>
          <view class="value">{{ info.workDepartment }}</view>
        </view>
        <view class="row">
          <view class="label">职位名称：</view>
          <view class="value">{{ info.workJob }}</view>
        </view>
        <view class="row">
          <view class="label">工作内容：</view>
          <view class="value">{{ info.workContent }}</view>
        </view>
      </template>
    </view>
  </ht-card>
</template>

<script>
  export default {
    components: {},
    props: {
      info: {
        type: Object,
        default: () => {}
      },
      showMore: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {};
    },
    computed: {},
    onLoad() {},
    methods: {
      getDate() {
        if (this.info && this.info.workDate && this.info.workDate.length === 2) {
          return `${this.info.workDate[0].join(".")} 至 ${this.info.workDate[1].join(".")}`
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .education-container {
    .row {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 24rpx;
    }

    .lable {
      font-weight: bold;
    }

    .value {
      color: #bbb;
    }
  }
</style>