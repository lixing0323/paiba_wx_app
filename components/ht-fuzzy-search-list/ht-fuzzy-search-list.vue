<template>
  <view>
    <view class="business-search-container">
      <view class="search-box">
        <view class="search-input">
          <uni-icons type="search" :size="18" color="#333"></uni-icons>
          <input confirm-type="search" :value="value" placeholder="请输入内容" :focus="true" auto-focus
            placeholder-class="search-input-plholder" class="search-input-component" @input="inputKey" />
          <uni-icons type="clear" :size="13" color="#bcbcbc" @tap="onClearKey()" v-show="key"></uni-icons>
        </view>
        <view class="search-save" @tap="submit()">保存</view>
      </view>

      <view v-show="key">
        <view v-if="list.length > 0" class="search-result-box">
          <block v-for="(item, index) in list" :key="index">
            <view class="search-result-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="gotoDetail(item)">
              <view class="search-result-item-left search_content">
                <span class="search-search-item-name"> {{ item.name }}</span>
              </view>
            </view>
          </block>
        </view>
        <view v-else>
          <ht-mescroll-empty v-if="isLoading===false" />
        </view>
      </view>
    </view>

    <uni-popup ref="message" type="message">
      <uni-popup-message type="error" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  import FormMixin from '@/mixins/formMixin.js'
  import {
    trim
  } from '@/common/utils.js';

  export default {
    props: {
      list: {
        type: Array,
        default: () => []
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        id: undefined,
        key: '',
        form: {
          name: ''
        },
        messageText: ''
      };
    },
    watch: {
      value: {
        handler(val) {
          this.key = val
          this.$emit('search')
        },
        immediate: true
      }
    },
    created() {},
    methods: {
      onClearKey() {
        this.key = ''
      },
      inputKey(e) {
        console.log('inputkey', this.key)
        this.key = trim(e.detail.value)
        if (!this.key) {
          this.$emit('clear')
        } else {
          this.$emit('search')
        }
      },
      checkValidate() {
        this.messageText = undefined
        let valid = true
        console.log(this.key, 'key')
        if (!this.key) {
          this.messageText = '请填写内容'
        }

        if (this.messageText) {
          this.$refs.message.open()
          valid = false
        }
        return valid
      },
      submit() {
        if (this.checkValidate()) {
          this.$emit('submit', this.key)
        }
      },
      gotoDetail(item) {
        this.$emit('click-item', item)
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>