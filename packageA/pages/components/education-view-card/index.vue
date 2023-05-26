<template>
  <ht-card v-if="info.eduSchool">
    <view class="education-container">
      <view class="row">
        <view class="label">学校：</view>
        <view class="value school">{{ info.eduSchool }}</view>
      </view>
      <view class="row">
        <view class="label">时间段：</view>
        <view class="value date">{{ getDate() }}</view>
      </view>
      <template v-if="showMore">
        <view class="row">
          <view class="label">学历：</view>
          <view class="value">{{ info.eduEducation }}</view>
        </view>
        <view class="row">
          <view class="label">专业：</view>
          <view class="value">{{ info.eduSpeciality }}</view>
        </view>
        <view class="row">
          <view class="label">在校经历：</view>
          <view class="value">{{ info.eduExperience }}</view>
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
        if (this.info && this.info.eduDate && this.info.eduDate.length === 2) {
          return `${this.info.eduDate[0].join(".")} 至 ${this.info.eduDate[1].join(".")}`
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