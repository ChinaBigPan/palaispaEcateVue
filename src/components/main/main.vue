<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .main
    position fixed
    top 0
    bottom 0
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
  <div class="main">
    <!-- 顶部的宣传语框 -->
    <div class="top-banner">
      <h4>{{ bannerSlogan }}</h4>
    </div>
    <!-- 轮播图组件 -->
    <div v-if="sliderImages.length" class="slider-wrapper">
      <div class="slider-content">
        <slider ref="slider">
          <div v-for="item in sliderImages">
            <a href="#">
              <img :src="item"></img>
            </a>  
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from '../../base/slider'
import {getMainSlider} from '../../api/mainData.js'

export default {
  name: 'main',
  created() {
    this._getSliderPic();
  },
  activated() {
    // setTimeout(() => {
    //   this.$refs.slider && this.$refs.slider.refresh();
    // }, 20);
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
    }

  },
  components: {
    Slider
  }
}
</script>

