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
    overflow hidden
    background-color $white
    box-shadow 0 0 4px 0 $black
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
    // 背景图片区块
    .background-block
      position fixed
      top 0 
      left 0
      right 0
      bottom 0
      img
        display block
        width 100%
        height 100%
        filter blur(10px)
    // 护理详情区块
    .shin-store-detail
      position absolute
      top 15%
      left 10%
      bottom 15%
      right 10%
      z-index 150
      border-radius 5px
      overflow hidden
      background $white
      animation floatup 1.5s infinite alternate
      // 轮播图组件
      .slider-wrapper
        position relative
        width 60%
        height 60%
        overflow hidden
        border-right 1px solid $palaispa-gray
        border-bottom 1px solid $palaispa-gray
        .slider-content
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          width 100%
          .slider-block
            width 100%
            height 100%
      // 门店信息
      .store-information
        // background aqua
        position absolute
        top 0
        left 60%
        right 0
        bottom 40%
        line-height 1.5
        border-left 1px solid $palaispa-lightgray
        box-shadow 0 1px 2px 0 $palaispa-gray
        li
          margin 6px 0
          padding-left 10px
          padding-right 10px
          &:first-child
            margin-top 0
            padding-top 6px
          i
            display inline-block
            color $palaispa-blue
            font-size 22px
            font-weight bold
            vertical-align top
            margin 0 10px
          &.store-name
            font-size 20px
            font-weight 700
          &.store-address
            // height 30%
            overflow hidden
            line-height 1.5
            // background lightgreen
          &.store-phone, &.store-time
            font-size 17px
          &.store-treatment
            line-height 1.5

      // 门店描述
      .store-description
        // background lightyellow
        overflow hidden
        position relative
        width 100%
        height 40%
        text-indent 35px
        text-align justify
        line-height 1.5
        font-size 16px
        p
          padding 15px

@keyframes floatup {
  from {
    transform translate3d(0, 0, 0)
  }
  to {
    transform translate3d(0, 4px, 0)
  }
}

</style>

<template>
  <article class="store-detail">
    <div @click="closeStoreDetail" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>
    <!-- 背景撸多了区块 -->
    <div class="background-block">
      <img v-if="storeDetail != ''" :src="storeDetail.picture[0]" :alt="storeDetail.name">
    </div>
    <!-- 真·护理详情区块开始 -->
    <section class="shin-store-detail">
      <!-- 门店轮播图区块开始 -->
      <div class="slider-wrapper">
        <div class="slider-content">
          <slider ref="slider" v-if="storeDetail.picture.length" class="slider-block">
            <div :key="index" v-for="(item, index) in storeDetail.picture">
              <img :src="item"></img>
            </div>
          </slider>
        </div>
      </div>
      <!-- 门店轮播图区块结束 -->
      <!-- 门店信息列表开始 -->
      <ul class="store-information">
        <li class="store-name"><i class="icon-zhekou"></i>{{ storeDetail.name }}</li>
        <li class="store-address"><i class="icon-jianyuede"></i>{{ storeDetail.address }}</li>
        <li class="store-time"><i class="icon-time"></i>{{ storeDetail.businessHours }}</li>
        <li class="store-phone"><i class="icon-phone"></i>{{ storeDetail.phone }}</li>
        <li class="store-treatment"><i class="icon-iconfontxingxing"></i>{{ storeDetail.treatment }}</li>
      </ul>
      <!-- 门店信息列表结束 -->
      <scroll ref="storedescription" class="store-description">
        <p>{{ storeDetail.description }}</p>
      </scroll>
    </section>
    <!-- 真·护理详情区块结束 -->
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import Slider from '../../base/slider/slider'
import {mapMutations} from 'vuex'

export default {
  name: 'storeDetail',
  props: {
    storeDetail: {
      type: Object
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 200)
  },
  watch: {
    storeDetail() {
      this.$nextTick(() => {
       this._initScroll()
     })
    }
  },
  updated() {
     this.$nextTick(() => {
       this._initScroll()
     })
  },
  data() {	
    return {}
  },
  methods: {
    // 关闭门店详情
    closeStoreDetail() {
      this.setShowStoreDetail(false);
    },
    // 刷新轮播图
    _initScroll() {
      this.$refs.slider && this.$refs.slider.refresh();
      this.$refs.storedescription && this.$refs.storedescription.refresh();
    },
    // vuex方法引入
    ...mapMutations({
      setShowStoreDetail: "SET_SHOW_STORE_DETAIL"
    })
  },
  components: {
    Slider,
    Scroll
  }
}
</script>