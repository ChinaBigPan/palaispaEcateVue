<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .treatbanner-page
    position fixed
    top 0
    left 60px
    bottom 0
    right 0
    z-index 100
    width 100%
    background $white
    // 回退按钮
    .close-btn
      position absolute
      top 25px
      left 25px
      font-size 30px
      font-weight bolder
      text-align center
      color $white
      border-radius 50%
      padding 10px
      background rgba(0,0,0,.3)
      z-index 200
      i
        display block
        animation waggle 1s infinite alternate

  // 左右晃动动画
  @keyframes waggle {
    from {
      transfrom translate3d(0, 0, 0)
    }
    to {
      transform translate3d(-3px, 0, 0)
    }
  }

  // 渐变效果
  .fade-enter-active, .fade-leave-active {
    transition opacity .3s
  }
  .fade-enter, .fade-leave-to {
    opacity 0
  }
</style>

<template>
  <article class="treatbanner-page">
    <div @click="closeTreatbannerPage" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>
    <h1>我是护理Banner推广图</h1>
  </article>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'treatbanner-page',
  props: {
    bannerImage: {
      type: String,
      default: ''
    }
  },
  data() {	
    return {}
  },
  methods: {
    // 关闭首页推广页
    closeTreatbannerPage() {
      this.$emit('closeTreatbannerPage');
    }
  }
}
</script>

