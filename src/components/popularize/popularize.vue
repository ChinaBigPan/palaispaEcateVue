<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .popularize
    position fixed
    top 0
    left 0
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
    .generize-scroll
      width 100%
      height 100%

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
    transition opacity .4s
  }
  .fade-enter, .fade-leave-to {
    opacity 0
  }
</style>

<template>
  <article class="popularize">
    <div @click="closePopularize" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>
    <scroll ref="generizescroll" class="generize-scroll">
      <ul>
        <li :key="index" v-for="(item, index) in popularizeImage">
          <img :src="item" :alt="index">
        </li>
      </ul>
    </scroll>
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import {mapMutations} from 'vuex'

export default {
  name: 'popularize',
  props: {
    popularizeImage: {
      type: Array,
      default: []
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 300)
  },
  watch: {
    popularizeImage() {
      setTimeout(() => {
        this._initScroll();
      }, 300)
    }
  },
  data() {	
    return {}
  },
  methods: {
    // 关闭首页推广页
    closePopularize() {
      this.setShowPopularize(false);
    },
    // 初始化滚动组件
    _initScroll() {
      this.$refs.generizescroll && this.$refs.generizescroll.refresh();
    },
    // vuex方法引入
    ...mapMutations({
      setShowPopularize: "SET_SHOW_POPULARIZE"
    })
  },
  components: {
    Scroll
  }
}
</script>

