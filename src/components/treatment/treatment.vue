<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .treatment
    position fixed
    top 0
    bottom 0
    right 0
    left 60px
    // 顶部banner图
    .treatBanner
      width 800px
      height 64px
      margin 5px 0 5px 5px
      overflow hidden
      border-radius 5px
      float left
      img
        width 100%

    // 皮肤测试
    .skinTest
      float right
      border none
      background-color $palaispa-lightorange
      color $white
      text-align center
      margin 5px
      height 64px
      padding 0 15px
      line-height 64px
      font-size 20px
      border-radius 5px
      i
        margin-right 10px
        font-size 25px
        display inline-block
        animation: pulse 1s infinite alternate

  // 悬浮动画
  @keyframes pulse {
    0% {
        transform: translate3D(0, 0, 0);
    }
    100% {
        transform: translate3D(0, 4px, 0);
    }
  }

  // 滑动效果
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)     
</style>

<template>
  <article class="treatment">
    <section class="treatBanner">
      <img @click="toPromoTreat" v-lazy="banner" alt="">
    </section>
    <section @click="toSkinTest" class="skinTest">
      <i class="icon-text"></i><span>皮肤测试</span>
    </section>
    <clear-float></clear-float>
    <section @treatSuccess="loadTreatSuccess" class="treatList">
      <treatmentlist></treatmentlist>
    </section>
    <loading title="正在加载护理数据..." v-show="isTreatLoad"></loading>
  </article>
</template>

<script type="text/ecmascript-6">
import clearFloat from '../../base/clearfloat/clearfloat';
import Loading from '../../base/loading/loading'
import treatmentlist from '../treatmentlist/treatmentlist';
import {getTreatmentBanner} from '../../api/treatmentData.js'

export default {
  name: 'treatment',
  created() {
    this.getBannerPic();
  },
  data() {	
    return {
      banner: "",
      isTreatLoad: false
    }
  },
  methods: {
    // 获取Banner图
    getBannerPic() {
      getTreatmentBanner().then((res) => {
        this.banner = res.treatmentBanner;
      })
    },
    // 护理读取成功
    loadTreatSuccess() {
      this.isTreatLoad = true;
    },
    // 前往推荐护理页
    toPromoTreat() {
      console.log('点击了护理Banner');
    },
    // 前往皮肤测试
    toSkinTest() {
      console.log('前往皮肤测试页');
    }
  },
  components: {
    treatmentlist,
    Loading,
    clearFloat
  }
}
</script>

