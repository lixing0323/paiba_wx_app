<template>
  <customer-company-form :is-edit="false" :customer-id="customerId"></customer-company-form>
</template>

<script>
import CustomerCompanyForm from './edit.vue';

export default {
  components: { CustomerCompanyForm },
  data() {
    return {
      customerId: undefined
    };
  },
  onLoad(params) {
    this.customerId = params.id;
  }
};
</script>

<style lang="scss" scoped></style>
