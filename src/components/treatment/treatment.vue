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
      margin 5px
      overflow hidden
      border-radius 5px
    // 皮肤测试
    .skinTest
      border none
      background-color $palaispa-lightorange
      color $white
      text-align center
      margin 5px
      height 50px
      line-height 50px
      font-size 20px
      border-radius 5px
      i
        margin-right 10px
        font-size 25px
        display inline-block
        animation: pulse 1s infinite alternate;


  // 悬浮动画
  @keyframes pulse {
    0% {
        transform: translate3D(0, 0, 0);
    }
    100% {
        transform: translate3D(0, 4px, 0);
    }
  }      
</style>

<template>
  <div class="treatment">
    <section class="treatBanner">
      <img @click="toPromoTreat" :src="banner" alt="">
    </section>
    <section @click="toSkinTest" class="skinTest">
      <i class="icon-color"></i><span>皮肤测试 看看什么护理适合您</span>
    </section>
    <section class="treatList">
      <treatmentlist></treatmentlist>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import treatmentlist from '../treatmentlist/treatmentlist';
import {getTreatmentBanner} from '../../api/treatmentData.js'

export default {
  name: 'treatment',
  created() {
    this.getBannerPic();
  },
  data() {	
    return {
      banner: ""
    }
  },
  methods: {
    // 获取Banner图
    getBannerPic() {
      getTreatmentBanner().then((res) => {
        this.banner = res.treatmentBanner;
      })
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
    treatmentlist
  }
}
</script>

