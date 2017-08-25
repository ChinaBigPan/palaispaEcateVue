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
        display flex
        .avatar-block
          flex 0 0 200px
          width 200px
          background $white
          img
            display block
            width 170px
            height 170px
            border-radius 50%
            margin 20px auto

        .information-block
          flex 1
          background $white
          padding 5px
          hr
            margin 5px auto
            border none
            border-bottom 1px dashed $palaispa-gray
          .name
            margin-top 20px
            margin-bottom 10px
            font-size 20px
          .effect
            font-size 16px
            line-height 1.5
            height 70px
            overflow hidden
          .detail
            overflow hidden
            margin-top 20px
            li
              width 100%
              float left
              font-size 16px
              line-height 1.5
              margin 5px 0
              i
                font-size 20px
                vertical-align top
                color $palaispa-orange
                font-weight 700
                margin-right 10px
              &.price,&.duration
                width 50%
          
    // 右侧区块
    .treat-detail-right
      width 29%
      height 100%
      background $palaispa-lightgray
      float right
      // 您刚刚浏览的护理区块
      .just-watch
        width 100%
        height 100px
        background $white
        margin-bottom 10px
      // 同类护理区块
      .samekind-treat
        width 100%
        height 100%
        background $white
        padding-top 5px
        .title
          text-align center
          background $palaispa-orange
          width 50%
          margin 5px auto
          color $white
          border-radius 5px
          font-size 16px
          padding 10px 5px
        .samekind-scroll
          width 100%
          height 768px
          overflow hidden
          .samekind-list
            padding 0 5px
            overflow hidden
            padding-bottom 160px
            li
              display flex
              height 120px
              border-radius 5px
              margin 5px auto 15px
              box-shadow 0 1px 1px 0 $palaispa-gray
              .avatar
                flex 0 0 100px
                width 100px
                display flex
                align-items center
                justify-content center
                img
                  display block
                  width 90px
                  height 90px
                  border-radius 50%
              .treat-brief
                flex 1
                overflow hidden
                padding-left 5px
                .treatName
                  display block
                  white-space nowrap 
                  overflow hidden
                  text-overflow ellipsis
                  padding-right 5px
                  margin 5px 0
                  font-size 16px
                .fit
                  display block
                  font-size 15px
                  height 70px
                  line-height 1.4
                  padding-right 5px
                  color $palaispa-treatgray
                  overflow hidden
                  text-overflow ellipsis
                .price
                  font-size 15px
                  color $palaispa-orange
  
  // 左右晃动动画
  @keyframes waggle {
    from {
      transfrom translate3d(0, 0, 0)
    }
    to {
      transform translate3d(-3px, 0, 0)
    }
  }
</style>

<template>
  <article class="treatment-detail">
    <div @click="closeTreatDetail" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>
    <section class="treat-detail-left">
      <scroll ref="detailscroll" class="treat-img-block">
        <ul>
          <li :key="index" v-for="(item, index) in treatmentDetail.detail">
            <img :src="item" :alt="index">
          </li>
        </ul>
      </scroll>
      <section class="treat-info-block">
        <div class="avatar-block">
          <img :src="treatmentDetail.avatar" alt="护理头图">
        </div>
        <scroll ref="informationblock" class="information-block">
          <h3 class="name">{{treatmentDetail.treatName}}</h3>
          <hr>
          <scroll ref="informationeffect" class="effect">
            <div>{{treatmentDetail.effect}}</div>
          </scroll>
          <hr>
          <ul class="detail">
            <li class="price"><i class="icon-jiage"></i>{{treatmentDetail.price}} 元</li>
            <li class="duration"><i class="icon-time"></i>{{dealDuration(treatmentDetail.duration)}}</li>
            <li class="step"><i class="icon-buzhou"></i>{{treatmentDetail.step}}</li>
            <li class="fit"><i class="icon-shiyongrenqun"></i>{{treatmentDetail.fit}}</li>
          </ul>
        </scroll>
      </section>
    </section>
    <aside class="treat-detail-right">
      <div class="just-watch">

      </div>
      <section class="samekind-treat">
        <p class="title">同类护理</p>
        <scroll ref="samekindscroll" class="samekind-scroll">
          <ul class="samekind-list">
            <li :key="item.treatName" v-for="(item, index) in treatmentAside.data">
              <div class="avatar">
                <img :src="item.avatar" :alt="item.treatName">
              </div>
              <div class="treat-brief">
                <p class="treatName">{{item.treatName}}</p>
                <p class="fit">{{item.fit}}</p>
                <p class="price">&yen; {{item.price}}</p>
              </div>  
            </li>
          </ul>
        </scroll>  
      </section>
    </aside>
  </article>
</template>

<script type="text/ecmascript-6">
import {judgeDuration} from '../../common/js/util'
import Scroll from '../../base/scroll/scroll'
import {mapMutations} from 'vuex'

export default {
  name: 'treatmentDetail',
  props: {
    treatmentDetail: {
      type: Object
    },
    treatmentAside: {
      type: Object
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
      this._showSamekind();
    }, 400)
  },
  data() {	
    return {}
  },
  computed: {},
  updated() {
    setTimeout(() => {
      this._initScroll();
    }, 440)
  },
  methods: {
    dealDuration(duration) {
      return judgeDuration(duration);
    },
    // 刷新Scroll组件
    _initScroll() {
      this.$refs.detailscroll && this.$refs.detailscroll.refresh();
      this.$refs.informationblock && this.$refs.informationblock.refresh();
      this.$refs.informationeffect && this.$refs.informationeffect.refresh();
      this.$refs.samekindscroll && this.$refs.samekindscroll.refresh(); 
    },
    // 关闭详情页
    closeTreatDetail() {
      this.setShowTreatmentDetail(false);
    },
    // 同类护理
    _showSamekind() {
      console.log(this.treatmentAside);
    },
    // vuex方法引入
    ...mapMutations({
      setSelectedTreatment: "SET_SELECTED_TREATMENT",
      setShowTreatmentDetail: "SET_SHOW_TREATMENT_DETAIL"
    })
  },
  components: {
    Scroll
  }
}
</script>

