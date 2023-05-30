<template>
  <view>
    <view class="tui-form-container">
      <tui-form-item label="订单时间">
        <template v-slot:right>
          2023年5月24日
        </template>
      </tui-form-item>
      <tui-form-item label="订单编号">
        <template v-slot:right>
          212121212121212
        </template>
      </tui-form-item>
      <tui-form-item label="创建人">
        <template v-slot:right>
          <uni-tag class="role" circle size="mini" text="摄影师" type="primary" /> 张三
        </template>
      </tui-form-item>
      <tui-form-item label="联系电话">
        <template v-slot:right>
          13212345678
        </template>
      </tui-form-item>
    </view>

    <view class="tui-form-container margin-top-20">
      <tui-form-item label="服务时间">
        <template v-slot:right>
          2023年5月30日 至 2023年6月2日
        </template>
      </tui-form-item>
      <tui-form-item label="服务地点">
        <template v-slot:right>
          陕西省西安市高新路1号
        </template>
      </tui-form-item>
      <tui-form-item label="供应商">
        <template v-slot:right>
          ***有限公司
        </template>
      </tui-form-item>
      <tui-form-item label="出库地点">
        <template v-slot:right>
          西安北库
        </template>
      </tui-form-item>
      <tui-form-item label="总费用">
        <template v-slot:right>
          12112 元
        </template>
      </tui-form-item>
    </view>

    <view class="tui-form-container margin-top-20">
      <block v-for="(item,index) in dataList" :key="index">
        <tui-collapse :index="index" :current="item.current" @click="onChangeCollapse">
          <template v-slot:title>
            <tui-list-cell>{{item.title}}</tui-list-cell>
          </template>
          <template v-slot:content>
            <view class="content">{{item.content}}</view>
          </template>
        </tui-collapse>
      </block>
    </view>

    <view class="tui-form-container margin-top-20">
      <tui-form-item direction="column" label="工作内容与备注" content-margin-top="8px">
        <tui-textarea isCounter autoHeight v-model="a" textarea-border maxlength="200" placeholder="工作内容与备注" />
      </tui-form-item>
    </view>

    <view class="tui-form-container margin-top-20">
      <tui-form-item direction="column" label="特别备注" content-margin-top="8px">
        <tui-textarea isCounter autoHeight v-model="a" textarea-border maxlength="200" placeholder="工作内容与备注" />
      </tui-form-item>
    </view>

    <view class="submit-bt-view">
      <tui-form-button class="item" type="primary" @click="onSubmit()" :loading="updateBtLoading">修改</tui-form-button>
      <tui-form-button plain class="item share" @click="onShare()">分享订单详情</tui-form-button>
    </view>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="success" :message="messageText" :duration="1500" />
    </uni-popup>

    <ht-order-qr-code :show.sync="dialogVisible" />
  </view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        id: undefined,
        updateBtLoading: false,
        dialogVisible: false,
        messageText: '',
        a: '',
        dataList: [{
            title: "器材明细",
            content: "后台生成表单",
            current: -1
          },
          {
            title: "人员明细",
            content: "后台生成表单",
            current: -1
          },
          {
            title: "车辆明细",
            content: "后台生成表单",
            current: -1
          },
          {
            title: "其他明细",
            content: "后台生成表单",
            current: -1
          },
        ]
      }
    },
    computed: {

    },
    onLoad(params) {
      this.id = params.id
    },
    methods: {
      onChangeCollapse(e) {
        let index = e.index;
        let item = this.dataList[index];
        item.current = item.current === index ? -1 : index
        console.log(e, item)
      },
      onShare() {
        this.dialogVisible = true
      },
      onSubmit() {
        uni.navigateTo({
          url: `/packageB/pages/staff/order/expense`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .tui-form-container {
    .role {
      margin-right: 40rpx;
    }

    ::v-deep .tui-collapse-head .tui-list-cell {
      padding: 26rpx 0 !important;
      font-size: 28rpx !important;
      font-weight: bold !important;
      color: #333 !important;
    }

    .content {
      padding: 10rpx 20rpx;
    }
  }

  .submit-bt-view {
    display: flex;

    .item {
      flex: 1;
    }

    .share {
      margin-left: 40rpx !important;
    }
  }
</style>