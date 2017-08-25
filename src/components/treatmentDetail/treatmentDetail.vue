<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .treatment-detail
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 100
    width 100%
    background $palaispa-lightgray
    // 左侧区块
    .treat-detail-left
      width 70%
      height 100%
      background $palaispa-lightgray
      float left
      // 护理详情图区块
      .treat-img-block
        width 100%
        height 60%
        background $white
        overflow hidden

      // 护理详情信息区块
      .treat-info-block
        width 100%
        height 39%
        margin-top 1%
        background $white
    // 右侧区块
    .treat-detail-right
      width 29%
      height 100%
      background $white
      float right
</style>

<template>
  <article class="treatment-detail">
    <section class="treat-detail-left">
      <scroll ref="detailscroll" class="treat-img-block">
        <ul>
          <li :key="index" v-for="(item, index) in treatmentDetail.detail">
            <img :src="item" :alt="index">
          </li>
        </ul>
      </scroll>
      <div class="treat-info-block">

      </div>
    </section>
    <aside class="treat-detail-right">

    </aside>
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'

export default {
  name: 'treatmentDetail',
  props: {
    treatmentDetail: {
      type: Object
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20)
  },
  data() {	
    return {}
  },
  updated() {

  },
  methods: {
    // 刷新Scroll组件
    _initScroll() {
      this.$refs.detailscroll && this.$refs.detailscroll.refresh();
    }
  },
  components: {
    Scroll
  }
}
</script>

