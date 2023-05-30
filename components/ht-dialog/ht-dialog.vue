<template>
  <tui-dialog :buttons="buttons" :z-index="zIndex" :show="visible" :title="title" @close="close()"
    @click="clickButtons">
    <template v-slot:content>
      <slot></slot>
    </template>
  </tui-dialog>
</template>

<script>
  export default {
    name: "ht-dialog",
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: ''
      },
      showLeftText: {
        type: Boolean,
        default: true,
      },
      leftBtText: {
        type: String,
        default: '取消'
      },
      rightBtText: {
        type: String,
        default: '确定'
      },
      closeOnHttp: {
        type: Boolean,
        default: false,
      },
      leftBtColor: {
        type: String,
        default: undefined
      },
      rightBtColor: {
        type: String,
        default: '#2E5AFF'
      },
      zIndex: {
        type: Number,
        default: undefined
      }
    },
    computed: {
      buttons() {
        const bts = []
        if (this.showLeftText) {
          bts.push({
            text: this.leftBtText,
            color: this.leftBtColor
          })
        }
        bts.push({
          text: this.rightBtText,
          color: this.rightBtColor
        })
        return bts
      }
    },
    data() {
      return {};
    },
    created() {},
    methods: {
      changeVisible() {
        this.$emit('update:visible', false)
        this.$emit('change', false)
      },
      close() {
        this.changeVisible()
      },
      clickButtons(val) {
        if (val.index === 0) {
          this.$emit('click-left')
          this.changeVisible()
        } else {
          this.$emit('click-right')
          if (this.closeOnHttp) {
            this.changeVisible()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>