<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $palaispa-lightgray
        &.active
          width: 20px
          border-radius: 5px
          background: $white
</style>

<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span :key="index" class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  name: 'name',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {	
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  created() {},
  mounted() {
    // 初始化
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();

      if(this.autoplay) {
        this._play()
      }
    }, 20)

    // 处理窗口改变的bug
    window.addEventListener('resize', () => {
      if(!this.slider) {
        return
      }
      // 这个ture是isResize的标志位
      this._setSliderWidth(true);
      this.slider.refresh();
    })
  },
  methods: {
    refresh() {
      this._setSliderWidth(true)
      this.slider.refresh()
    },
    // 首先设置slider宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i=0; i<this.children.length; i++) {
        let child = this.children[i];
        child.classList.add('slider-item');
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
      // 如果是需要循环的话
      if(this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    // 初始化slider
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
      // 当一次滚动事件滚动完毕后，会派发scrollEnd时间爱你
      this.slider.on('scrollEnd', () => {
        // getCurrentPage()
        // 当 snap 为 true 时，获取滚动的当前页，返回的对象结构为 {x, y, pageX, pageY}，
        // 其中 x,y 代表滚动横向和纵向的位置；pageX，pageY 表示横向和纵向的页面索引  
        let pageIndex = this.slider.getCurrentPage().pageX;
        if(this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;

        if(this.autoplay) {
          clearTimeout(this.timer);
          this._play();
        }
      })
    },
    // 初始化轮播图的提示点
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    // 播放方法
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      if(this.loop) {
        pageIndex += 1
      }
      // goToPage(x, y, time, easing)
      // 当 snap 为 true，滚动到对应的页面，x 表示横向页面索引，y 表示纵向页面索引， time 表示动画，easing 表示缓动函数
      // 此外，这里的timer别忘了
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval)
    }
  }
}
</script>

