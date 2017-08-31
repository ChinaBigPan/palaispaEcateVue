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
      .remark-list
        font-size 18px
        width 80%
        margin 10px auto
        list-style-type decimal
        line-height 2
        li
          margin-top 10px

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
  .slide-up-move {
    transition transform 0.5s
  }
</style>

<template>
  <scroll ref="remarkscroll" v-if="transferedRemarks != ''" class="member-remarks">
    <section class="remark-wrapper">
      <div @click="hideRemarks()" class="close-btn">
        <i class="icon-arrowleft"></i>
      </div>
      <h3 class="list-title">- 备注 -</h3>
      <ol class="remark-list">
        <transition-group appear name="slide-up">
          <li :key="index" v-for="(item, index) in transferedRemarks">
            {{ item }}
          </li>
        </transition-group>
      </ol>
      </section>
    </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'

export default {
  name: 'memberRemarks',
  props: {
    transferedRemarks: {
      type: Array,
      default: []
    },
    showMembership: {
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
    }
  },
  components: {
    Scroll
  }
}
</script>