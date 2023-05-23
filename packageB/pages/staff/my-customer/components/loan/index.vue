<template>
  <ht-loan-list :customer-id="customerId" :show-statistics="false" />
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        customerId: undefined
      }
    },
    onLoad(params) {
      console.log('onLoad', params.id)
      this.customerId = params.id
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
</style>
