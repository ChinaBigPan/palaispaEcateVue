<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .member-remarks
    position fixed
    overflow hidden
    top 0
    left 60px
    right 0
    bottom 0  
    z-index 1500
    background $white
    display flex
    padding 30px
    .remark-wrapper
      // width 100%
      // height 100%
      border-radius 5px
      padding 20px
      position relative
      box-shadow 0 0 4px $palaispa-treatgray
      // 回退按钮
      .close-btn
        position absolute
        top 15px
        left 20px
        font-size 25px
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
      .list-title
        text-align center
        color $palaispa-blue
        margin 30px auto
      .remark-list
        font-size 18px
        width 80%
        margin 10px auto
        list-style-type decimal
        line-height 2
        // &.appear-start
        //   background red
        li
          line-height 1.5

  [v-cloak] {
    display: none;
  }

  // 左右晃动动画
  @keyframes waggle {
    from {
      transfrom translate3d(0, 0, 0)
    }
    to {
      transform translate3d(-3px, 0, 0)
    }
  }

  // 列表的初始渲染动画
  .slide-fade-move {
    transition transform 0.4s
  }
</style>

<template>
  <scroll ref="remarkscroll" v-if="transferedRemarks != ''" class="member-remarks">
    <section v-if="isShowRemarkPad" class="remark-wrapper">
      <div @click="hideRemarks" class="close-btn">
        <i class="icon-arrowleft"></i>
      </div>
      <h3 class="list-title">- 备注 -</h3>
      <transition-group
        @before-enter="beforeEnter"
        @enter="enter" 
        @leave="leave" tag="ol" 
        appear 
        name="slide-fade" class="remark-list">
        <li :key="index" :data-index="index" v-for="(item, index) in transferedRemarks">
          {{ item }}
        </li>
      </transition-group>
      </section>
    </scroll>
</template>

<script type="text/ecmascript-6">
import Velocity from 'velocity-animate'
import Scroll from '../../base/scroll/scroll'

export default {
  name: 'memberRemarks',
  props: {
    transferedRemarks: {
      type: Array,
      default: []
    },
    isShowRemarkPad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 200)
  },
  data() {	
    return {}
  },
  methods: {
    // 刷新滚动条
    _initScroll() {
      this.$refs.remarkscroll && this.$refs.remarkscroll.refresh();
    },
    // 隐藏备注
    hideRemarks() {
      this.$emit('hideMemberRemarks')
    },
    // 列表动画相关
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter(el, done) {
      let delay = el.dataset.index * 150
      setTimeout(() => {
        Velocity(el,
          { opacity: 1, height: '65px'},
          { complete: done }
        )
      }, delay)
    },
    leave(el, done) {
      let delay = el.dataset.index * 150
      setTimeout(() => {
        Velocity(el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  },
  components: {
    Scroll
  }
}
</script>