<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/mixin.styl"
    @import "./common/stylus/variable.styl"

    #app 
      width 100%;
      height 100%;

</style>

<template>
  <div id="app" @touchmove.prevent>
    <tab-nav></tab-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script  type="text/ecmascript-6">
import tabNav from './components/tabNav/tabNav'

export default {
  name: 'app',
  components: {
    tabNav
  }
}
</script>
