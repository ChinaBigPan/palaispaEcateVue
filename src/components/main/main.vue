<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .main
    position fixed
    top 0
    // bottom 0
    right 0
    left 60px  
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
  <scroll ref="mainscroll">
    <div class="main">
      <!-- 顶部的宣传语框开始 -->
      <div class="top-banner">
        <h4>{{ bannerSlogan }}</h4>
      </div>
      <!-- 顶部的宣传语框结束 -->   
      <!-- 轮播图组件开始 -->
      <div v-if="sliderImages.length" class="slider-wrapper">
        <div class="slider-content">
          <slider ref="slider">
            <div v-for="item in sliderImages">
              <a href="javascript:void(0)">
                <img :src="item"></img>
              </a>
            </div>
          </slider>
        </div>
      </div>
      <!-- 轮播图组件结束 -->
      <!-- 子轮播切换栏开始 -->
      <maintab></maintab>
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
  activated() {
    setTimeout(() => {
      this.$refs.slider && this.$refs.slider.refresh();
      // this.refreshScroll();
    }, 20);
  },
  updated() {},
  mounted() {
    this.getScrollHeight();
  },
  watch: {
    // 观察路由的变化
    '$route': {
      handler() {
        setTimeout(() => {
          this.refreshScroll();
        }, 20)
      }
    }
  },
  data() {	
    return {
      bannerSlogan: "Make A Better Life",
      sliderImages: []
    }
  },
  methods: {
    // 获取首页轮播图数据(内部方法)
    _getSliderPic() {
      getMainSlider().then((res) => {
        this.sliderImages = res.mainBanner;
      })
    },
    // 根据路由切换,刷新滚动条组件
    refreshScroll() {
      this.$refs.mainscroll && this.$refs.mainscroll.refresh();
      console.log("刷新Scroll");
    },
    // 获取scroll的高度
    getScrollHeight() {
      let height = this.$refs.mainscroll.clientHeight;
      console.log(`scroll的高度是：${height}`);
    }
  },
  components: {
    Slider,
    maintab,
    Scroll
  }
}
</script>

