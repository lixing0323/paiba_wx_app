<template>
  <view>
    <ht-fuzzy-search-list :value="value" :list="list" :is-loading="isLoading" @clear="onClear()" @search="onSearch()"
      @submit="onSubmit" />
  </view>
</template>

<script>
  import {
    getTestList
  } from '@/apis/test.js'
  import {
    getInformation,
    saveEducationExperienceJson
  } from './var.js'

  export default {
    mixins: [],
    components: {},
    data() {
      return {
        id: undefined,
        list: [],
        isLoading: false,
        value: ''
      };
    },
    computed: {},
    onLoad() {
      this.getItemData()
    },
    methods: {
      getItemData() {
        this.value = getInformation().eduSpeciality
      },
      onClear() {
        this.list = []
      },
      onSearch() {
        this.isLoading = true
        getTestList().then(response => {
          this.isLoading = false
          this.list = response.items
        }).catch(() => (this.isLoading = false))
      },
      onSubmit(key) {
        saveEducationExperienceJson({
          speciality: key
        })
        uni.navigateBack()
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>