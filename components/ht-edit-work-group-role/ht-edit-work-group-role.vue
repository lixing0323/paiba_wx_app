<template>
  <view>
    <view>
      <tui-form-item asterisk label="工作组别/角色">
        <template v-slot:right>
          <view class="click-view group-role" @click="showPicker=true">
            <view class="group">{{ group }}</view>
            <uni-tag class="role" circle size="mini" :text="role" type="primary" />
            <view class="symbol"> ></view>
          </view>
        </template>
      </tui-form-item>
    </view>

    <tui-picker :show="showPicker" :layer="2" :pickerData="items__2" :params="1" @hide="showPicker=false"
      @change="onChangeWorkPicker">
    </tui-picker>

    <ht-dialog :visible.sync="dialogVisible" :z-index="1001" title="自定义角色" @click-right="onAdd()">
      <view v-if="dialogVisible">
        <tui-input v-model="role" required label="角色名" placeholder="请输入角色名" maxlength="10" />
      </view>
    </ht-dialog>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
      workGroup: {
        type: String,
        default: ''
      }
    },
    computed: {},
    data() {
      return {
        showPicker: false,
        dialogVisible: false,
        group: '',
        role: '',
        items__2: [{
          text: '摄影组',
          value: '100',
          children: [{
            text: '摄影师',
            value: '10001'
          }, {
            text: '照相师',
            value: '10002'
          }]
        }, {
          text: '灯光组',
          value: '200',
          children: [{
            text: '灯光师',
            value: '20001'
          }, {
            text: '照明师',
            value: '20002'
          }]
        }, {
          text: '其他组',
          value: '300',
          children: [{
            text: '自定义',
            value: '20001'
          }]
        }],
      };
    },
    watch: {
      workGroup: {
        handler(val) {
          if (val) {
            const arr = val.split('/')
            this.group = arr[0]
            this.role = arr[1]
          }
        },
        immediate: true
      }
    },
    created() {},
    methods: {
      onChangeWorkPicker(e) {
        if (e.text && e.text[1] === '自定义') {
          this.group = e.text[0]
          this.dialogVisible = true
          this.role = ''
        } else {
          this.group = e.text[0]
          this.role = e.text[1]
          this.doEvent()
        }
      },
      // 新增角色名
      onAdd() {
        if (!this.role) {
          uni.showToast({
            icon: 'none',
            title: '请填写角色名称！'
          })
        } else {
          this.dialogVisible = false
          this.doEvent()
        }
      },
      doEvent() {
        this.$emit('update:workGroup', `${this.group}/${this.role}`)
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '@/common/business.scss';

  .click-view {
    min-width: 300rpx;
    text-align: right;

    .content {
      margin-right: 20rpx;
    }
  }

  .group-role {
    display: flex;
    justify-items: center;
    justify-content: flex-end;

    .group {
      margin-right: 40rpx;
    }

    .role {
      margin-right: 20rpx;
    }
  }
</style>