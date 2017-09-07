<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .store-detail
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 100
    width 100%
    background-color $white
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
  <article class="store-detail">
    <div @click="closeStoreDetail" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>
    <h1>我是门店详情页</h1>
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import animations from 'create-keyframe-animation'
import {mapMutations} from 'vuex'

export default {
  name: 'storeDetail',
  props: {
    storeDetail: {
      type: Object
    }
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  watch: {
    storeDetail() {
      console.log(this.storeDetail);
    }
  },
  updated() {
     
  },
  data() {	
    return {}
  },
  methods: {
    // 关闭门店详情
    closeStoreDetail() {
      this.setShowStoreDetail(false);
    },
    // vuex方法引入
    ...mapMutations({
      setShowStoreDetail: "SET_SHOW_STORE_DETAIL"
    })
  }
}
</script>