<template>
  <view>
    <view class="list-view">
      <uni-list>
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="personalIcon" title="个人信息"
          @click="gotoPersonalInfo" />
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="joinUsIcon" title="加入我们"
          @click="gotoJoinUs()" />
        <uni-list-item :show-extra-icon="true" link showArrow :extra-icon="applyIcon" title="成为商户/入驻申请"
          @click="gotoSettledIn()" />
      </uni-list>
    </view>
  </view>
</template>
<script>
  import {
    mapGetters
  } from 'vuex';

  export default {
    components: {},
    props: {},
    data() {
      return {
        emptyImg: require('@/static/icon/avatar.png'),
        personalIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'person'
        },
        joinUsIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'plus-filled'
        },
        applyIcon: {
          color: '#bbbbbb',
          size: '22',
          type: 'auth-filled'
        }
      };
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created() {},
    methods: {
      gotoPersonalInfo() {
        uni.navigateTo({
          url: `/packageA/pages/mine/setting/personal-info/view`
        });
      },
      gotoJoinUs() {
        uni.navigateTo({
          url: `/packageA/pages/mine/setting/join-us/index`
        });
      },
      gotoSettledIn() {
        uni.navigateTo({
          url: `/packageA/pages/mine/setting/settled-in/index`
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>