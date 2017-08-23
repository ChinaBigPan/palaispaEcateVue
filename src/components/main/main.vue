<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .mainscroll
    position fixed
    top 0
    bottom 0
    right 0
    left 60px  
    background $white
    .main
      position relative
      top 0
      bottom 0
      right 0
      left 0  
      background $palaispa-lightgray
      // 顶部宣传语框
      .top-banner
        height 40px
        line-height 40px
        text-align center
        background $white
        border-radius 2%
        margin 5px
      // 轮播图组件
      .slider-wrapper
        position relative
        width 100%
        // height 0
        padding-top 26%
        overflow hidden
        .slider-content 
          position absolute
          top 0
          left 0
          width 100%
          // height 100%
</style>

<template>
  <scroll class="mainscroll" ref="mainscroll">
    <div @touchmove="mainPageScroll()" ref="mainpage" class="main">
      <!-- 顶部的宣传语框开始 -->
      <div class="top-banner">
        <h4>{{ bannerSlogan }}</h4>
      </div>
      <!-- 顶部的宣传语框结束 -->   
      <!-- 轮播图组件开始 -->
      <div v-if="sliderImages.length" class="slider-wrapper">
        <div class="slider-content">
          <slider ref="slider">
            <div :key="index" v-for="(item, index) in sliderImages">
              <a href="javascript:void(0)">
                <img @load="loadImage()" :src="item"></img>
              </a>
            </div>
          </slider>
        </div>
      </div>
      <!-- 轮播图组件结束 -->
      <!-- 子轮播切换栏开始 -->
      <div ref="maintab">
        <maintab></maintab>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive> 
      <!-- 子轮播切换栏结束 -->
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import Slider from '../../base/slider/slider'
import maintab from '../maintab/maintab'
import {getMainSlider} from '../../api/mainData.js'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'main',
  created() {
    this._getSliderPic(); 
  },
  data() {
    return {
      // 滚动高度
      scrollHeight: 0
    }
  },
  computed: {
    // vuex的getters就放到计算属性里
    ...mapGetters([
      'shouldMainScrollRefresh'
    ])
  },
  activated() {
    setTimeout(() => {
      this.$refs.slider && this.$refs.slider.refresh();
      this.refreshMainScroll();
    }, 20);
  },
  updated() {},
  mounted() {  
    setTimeout(() => {
      this.refreshMainScroll();
    }, 100)
  },
  watch: {
    'shouldMainScrollRefresh'(oldShouldMainScrollRefresh, newShouldMainScrollRefresh) {
      if(newShouldMainScrollRefresh) {
        setTimeout(() => {
          this.refreshMainScroll();
        }, 100)
      } 
    }
  },
  data() {	
    return {
      bannerSlogan: "Make A Better Life",
      sliderImages: [],
      notCruise: true
    }
  },
  methods: {
    // 获取首页轮播图数据(内部方法)
    _getSliderPic() {
      getMainSlider().then((res) => {
        this.sliderImages = res.mainBanner;
      })
    },
    // 根据路由切换,刷新main的大滚动条组件
    refreshMainScroll() {
      this.$refs.mainscroll && this.$refs.mainscroll.refresh();     
    },
    // 横向轮播图的图片读取事件
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
        setTimeout(() => {
          this.refreshMainScroll()
        }, 20)
      }
    },
    // 页面上下滚动的事件
    mainPageScroll() {
      // 获得子路由切换maintab，距离屏幕上方的距离
      let maintabTop = this.$refs.maintab.offsetTop;
      // 获取y方向滚动的距离
      let scrollY = Math.abs(this.$refs.mainscroll.scroll.y);
      if (scrollY >= maintabTop) {
        console.log('滚动距离大于导航栏');
      } else {
        console.log('滚动距离小于导航栏');
      }
    },
    // 引入vuex方法
    ...mapMutations({
      setShouldMainScrollRefresh: 'SET_SHOULD_MAIN_SCROLL_REFRESH'
    })
  },
  components: {
    Slider,
    maintab,
    Scroll
  }
}
</script>

