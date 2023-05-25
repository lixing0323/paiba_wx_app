export default {
  props: {},
  data() {
    return {
      form: {},
      loading: false,
      msgType: '',
      messageText: ''
    }
  },
  computed: {},
  created() {},
  methods: {
    showLoading() {
      uni.showLoading({
        mask: true
      })
    },
    hideLoading() {
      uni.hideLoading()
    }
  }
}