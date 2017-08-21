<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/variable.styl"
  
  .maintab
    position relative
    background $white
    margin 5px 0
    ul
      display flex
      li
        flex 1
        display flex
        height 40px
        margin 6px 10px
        justify-content center
        align-items center
        border 1px solid $palaispa-blue
        border-radius 2px
        color $palaispa-blue
        span
          display flex
          justify-content center
          align-items center
          width 100%
          height 100%
          // background red
        &.router-link-active
            transition 100ms all linear 
            color $white
            background $palaispa-blue 
</style>

<template>
  <div class="maintab">
    <ul>
      <router-link tag="li" to="/main/BrandSpirit">
        <span>精神荣誉</span>
      </router-link>
      <router-link tag="li" to="/main/BrandHistory">
        <span>历史积淀</span>
      </router-link>
      <router-link tag="li" to="/main/PromotionVideo">
        <span>宣传视频</span>
      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'maintab',
  data() {	
    return {}
  },
  methods: {
    // 切换路由事件，方便重新计算Scroll的高度
    switchRouter() {
      // this.$emit('subRouterSwitch');
      if(!this.switchSubRoute) {
        this.$emit('subRouterSwitch');
        this.switchSubRoute = true;
      }
      setTimeout(() => {
        this.switchSubRoute = false;
      }, 20)
    }
  }
}
</script>

