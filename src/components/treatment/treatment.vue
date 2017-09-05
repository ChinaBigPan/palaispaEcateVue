<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .treatment
    position fixed
    top 0
    bottom 0
    right 0
    left 60px
    .treat-top-block
      display flex
      // 顶部banner图
      .treatBanner
        flex 0 0 800px
        width 100%
        height 64px
        margin 5px 0 5px 5px
        overflow hidden
        border-radius 5px
        img
          width 100%
          height 100%

      // 皮肤测试
      .skinTest
        flex 1
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

  // 渐变效果
  .fade-enter-active, .fade-leave-active {
    transition opacity .3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity 0
  }

  // 滑动效果
  .slide-enter-active, .slide-leave-active 
    transition all 0.3s
    opacity 1

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)  
    opacity 0   
</style>

<template>
  <article class="treatment">
    <article class="treat-top-block">
      <section class="treatBanner">
        <img @click="toPromoTreat" v-lazy="banner" alt="">
      </section>
      <section @click="toSkinTest" class="skinTest">
        <i class="icon-text"></i><span>皮肤测试</span>
      </section>
    </article>
    <clear-float></clear-float>
    <section @treatSuccess="loadTreatSuccess" class="treatList">
      <treatmentlist></treatmentlist>
    </section>
    <transition name="slide">
      <skintest @closeSkintest="closeSkintest" :showSkintest="showSkintest" v-show="showSkintest"></skintest>
    </transition>
    <transition name="slide">
      <treat-bannerpage ref="treatbannerpage" :showTreatbannerPage="showTreatbannerPage" v-show="showTreatbannerPage" :bannerImage="bannerGenerize" @closeTreatbannerPage="closeTreatbannerPage"></treat-bannerpage>
    </transition>
    <loading title="正在加载护理数据..." v-show="isTreatLoad"></loading>
  </article>
</template>

<script type="text/ecmascript-6">
import clearFloat from '../../base/clearfloat/clearfloat'
import Loading from '../../base/loading/loading'
import treatmentlist from '../treatmentlist/treatmentlist'
import Skintest from '../skintest/skintest'
import TreatBannerpage from '../../components/treatBannerpage/treatBannerpage'
import {getTreatmentBanner} from '../../api/treatmentData.js'

export default {
  name: 'treatment',
  created() {
    this.getBannerPic();
  },
  data() {	
    return {
      banner: "",
      bannerGenerize: [],
      isTreatLoad: false,
      // 是否打开皮肤测试
      showSkintest: false,
      // 是否打开Banner推广
      showTreatbannerPage: false
    }
  },
  methods: {
    // 获取Banner图
    getBannerPic() {
      getTreatmentBanner().then((res) => {
        this.banner = res.treatmentBanner;
        this.bannerGenerize = res.bannerGenerize;
      })
    },
    // 护理读取成功
    loadTreatSuccess() {
      this.isTreatLoad = true;
    },
    // 前往推荐护理页
    toPromoTreat() {
      this.$refs.treatbannerpage._initScroll();
      this.showTreatbannerPage = true;
    },
    // 关闭护理推广页
    closeTreatbannerPage() {
      this.showTreatbannerPage = false;
    },
    // 前往皮肤测试
    toSkinTest() {
      this.showSkintest = true;
    },
    // 关闭皮肤测试
    closeSkintest() {
      this.showSkintest = false;
    }
  },
  components: {
    treatmentlist,
    Loading,
    clearFloat,
    Skintest,
    TreatBannerpage
  }
}
</script>

