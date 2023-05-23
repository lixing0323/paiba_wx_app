<template>
  <view>
    <ht-pure-color-tabs v-if="isStaff()" @clickTab="clickTab" :tabs="tabs" />
    <ht-title v-else title="消息" :has-back="false" />
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick" class="mescroll-container" :top="getContentPaddingTop()">
      <message-list v-if="tab === '业务提醒'" :list="list" @alreadyRead="resetList" class="list" />
      <notice-list v-else :list="list" @alreadyRead="resetList" />
      <uni-load-more color="#007AFF" :status="status" />
    </mescroll-body>
    <!--    <mescroll-empty v-else-if="isUnLoginUser()" class="mescroll-container" :style="{'top': getContentPaddingTop()}"></mescroll-empty>-->
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    mapGetters
  } from 'vuex';
  import {
    isUnLoginUser,
    isStaff
  } from '@/common/roles.js'
  import {
    getMyMessages,
    getMyMessagesCount,
    getNotices
  } from '@/apis/message.js'
  import MessageList from '@/pages/tabBar/message/message-list.vue'
  import noticeList from '@/pages/tabBar/message/notice-list.vue'
  import {
    getContentPaddingTop
  } from '@/common/filter.js'

  import {
    getVersionControl
  } from '@/apis/user.js';

  export default {
    components: {
      MessageList,
      noticeList
    },
    mixins: [ListMixin],
    data() {
      return {
        tabs: [{
            name: '业务提醒'
          },
          {
            name: '系统公告'
          },
        ],
        tab: '业务提醒',
      }
    },
    onShow() {
      if (this.token && this.userInfo) {
        this.canReset = true
        this.resetList()
        this.messageCount()
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    methods: {
      getContentPaddingTop,
      isUnLoginUser,
      isStaff,
      getList(page) {
        if (!this.isUnLoginUser()) {
          this.beforeGetList(page);
          let api
          if (this.tab === '业务提醒') {
            this.listQuery.published = undefined
            this.listQuery.isBox = undefined
            api = getMyMessages(this.listQuery)
          } else {
            this.listQuery.published = true
            this.listQuery.isBox = true
            api = getNotices(this.listQuery)
          }
          api.then(res => {
              this.afterGetList(res, page);
            })
            .catch(() => this.errorList());
        } else {
          this.afterGetList({
            items: [],
            page: {
              totalPages: 0
            }
          });
        }
      },
      messageCount() {
        const msgIndex = 3
        getVersionControl().then(versionControlResp => {
          if (versionControlResp.versionStatus !== 'Publishing') {
            getMyMessagesCount().then((res) => {
              if (res.unreadTotalCount === 0) {
                uni.removeTabBarBadge({
                  index: msgIndex
                })
                this.tabs = [{
                  name: '业务提醒',
                  unReadCount: res.unreadMessageCount
                }, {
                  name: '系统公告',
                  unReadCount: res.unreadNoticeCount
                }]
              } else {
                const showCount = res.unreadTotalCount <= 99 ? `${res.unreadTotalCount}` : '99+'
                uni.setTabBarBadge({
                  index: msgIndex,
                  text: showCount
                })
                this.tabs = [{
                  name: '业务提醒',
                  unReadCount: res.unreadMessageCount
                }, {
                  name: '系统公告',
                  unReadCount: res.unreadNoticeCount
                }]
              }
            })
          }
        })
      },
      clickTab(e) {
        this.tab = e.name
        this.resetList()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mescroll-container {
    position: relative;

    ::v-deep .mescroll-body {
      //background-color: antiquewhite !important;
    }

    ::v-deep .mescroll-empty {
      //background-color: antiquewhite !important;
    }
  }

  .list {
    margin-top: 10px;
  }
</style>
