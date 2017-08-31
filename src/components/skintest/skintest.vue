<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .skin-test  
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 60px;
    overflow: hidden;
    width 100%
    background $palaispa-lightgray
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

</style>

<template>
  <article class="skin-test">
    <div @click="closeSkintest" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>  
    我是皮肤测试页
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'

export default {
  name: 'skintest',
  data() {	
    return {}
  },
  methods: {
    // 关闭皮肤测试
    closeSkintest() {
      this.$emit('closeSkintest')
    }
  }
}
</script>

