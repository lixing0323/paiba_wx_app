<template>
  <mescroll-empty :option="option"></mescroll-empty>
</template>

<script>
  import MescrollEmpty from 'mescroll-uni'

  export default {
    components: {
      MescrollEmpty
    },
    props: {
      // empty的配置项: 默认为GlobalOption.up.empty
      option: {
        type: Object,
        default () {
          return {
            icon: require('@/static/module/mescroll-empty.png')
          };
        }
      }
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>

<style lang="scss" scoped></style>