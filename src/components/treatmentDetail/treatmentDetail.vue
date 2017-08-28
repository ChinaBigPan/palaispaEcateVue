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
        position relative
        width 100%
        height 60%
        background $white
        overflow hidden
        margin-bottom 0
        // 当迷你区块显示时添加该Class
        &.showMini
          height 100%
          margin-bottom 100px
          transition height 100ms linear
        

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
            font-weight bold
            margin-top 20px
            margin-bottom 10px
            font-size 20px
          .effect
            font-size 16px
            line-height 1.5
            height 70px
            overflow hidden
          .detailinfoscroll
            width 100%
            height 150px
            overflow hidden
            .detail
              overflow hidden
              margin-top 10px
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

      // 迷你文字区块
      .mini-info
        width 70%
        height 60px
        position absolute
        bottom 0
        z-index 1000
        background $white
        box-shadow 0 -1px 1px 0 $palaispa-treatgray
        .mini-avatar
          position absolute
          width 80px
          height 80px
          overflow hidden
          border-radius 50%
          background $white
          display flex
          align-items center
          justify-content center
          z-index 1001
          box-shadow 0 0 3px 1px $palaispa-treatgray
          // border 2px solid $palaispa-treatgray
          border-left none
          border-bottom none
          border-right none
          top -45px
          left 20px
          padding 5px
          img 
            display block
            width 80px
            height 80px
            border-radius 50%
            
        .mini-name
          margin 20px auto
          text-align center
          font-size 18px
          font-weight 700
          line-height 1.2
          p 
            display inline-block
            max-width 400px
            overflow hidden
            white-space nowrap 
            text-overflow ellipsis
            text-indent 70px
          .mini-data
            display inline-block
            vertical-align top
            float right
            li
              display inline-block
              text-align center
              margin 0 6px
              i
                color $palaispa-orange
                font-weight bold
                margin-right 10px

    // 右侧区块
    .treat-detail-right
      width 29%
      height 100%
      background $palaispa-lightgray
      float right
      // 您刚刚浏览的护理区块
      // .just-watch
      //   width 100%
      //   height 100px
      //   background $white
      //   margin-bottom 10px
      // 同类护理区块
      .samekind-treat
        width 100%
        height 100%
        background $white
        padding-top 5px
        .title
          text-align center
          position relative
          z-index 300
          background $white
          font-size 16px
          padding 10px 5px
          box-shadow 0 1px 2px $palaispa-gray
          p
            color $white
            background $palaispa-orange
            display block
            padding 10px 5px
            width 50%
            height 100%
            margin 0 auto
            border-radius 5px

        .samekind-scroll
          width 100%
          height 768px
          overflow hidden
          .samekind-list
            padding 0 5px
            overflow hidden
            padding-bottom 50px
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
                  height 60px
                  margin-bottom 5px
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

  // 渐变效果
  .fade-enter-active, .fade-leave-active {
    transition opacity .4s
  }
  .fade-enter, .fade-leave-to {
    opacity 0
  }
</style>

<template>
  <article class="treatment-detail">
    <div @click="closeTreatDetail" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>
    <!-- 左侧护理详情区块开始 -->
    <article class="treat-detail-left">
      <!-- 详情图区块开始 -->
      <scroll ref="detailscroll" class="treat-img-block">
        <ul>
          <li :key="index" v-for="(item, index) in treatmentDetail.detail">
            <img :src="item" :alt="index">
          </li>
        </ul>
      </scroll>
      <!-- 详情图区块结束 -->
      <!-- 文字区块开始 -->
      <transition name="fade"
                  @enter="enter"
                  @after-enter="afterEnter"
                  @leave="leave"
                  @after-leave="afterLeave">
        <section @click="toggleMini" v-show="!showMini" class="treat-info-block">
          <div ref="avatarWrapper" class="avatar-block">
            <img :src="treatmentDetail.avatar" alt="护理头图">
          </div>
          <scroll ref="informationblock" class="information-block">
            <h3 class="name">{{treatmentDetail.treatName}}</h3>
            <hr>
            <scroll ref="informationeffect" class="effect">
              <div>{{treatmentDetail.effect}}</div>
            </scroll>
            <hr>
            <scroll ref="detailinfoscroll" class="detailinfoscroll">
              <ul class="detail">
                <li class="price"><i class="icon-jiage"></i>{{treatmentDetail.price}} 元</li>
                <li class="duration"><i class="icon-time"></i>{{dealDuration(treatmentDetail.duration)}}</li>
                <li class="step"><i class="icon-buzhou"></i>{{treatmentDetail.step}}</li>
                <li class="fit"><i class="icon-shiyongrenqun"></i>{{treatmentDetail.fit}}</li>
              </ul>
            </scroll>
          </scroll>
        </section>
      </transition>
      <!-- 文字区块结束 -->
      <!-- 迷你护理文字区块开始 -->
      <transition name="fade">
        <section @click="toggleMini" v-show="showMini" class="mini-info">
          <div ref="miniavatar" class="mini-avatar">
            <img :src="treatmentDetail.avatar" alt="护理小头图" >
          </div>
          <div class="mini-name">
            <p>{{treatmentDetail.treatName}}</p>
            <ul class="mini-data">
              <li><i class="icon-jiage"></i>{{treatmentDetail.price}} 元</li>
              <li><i class="icon-time"></i>{{dealDuration(treatmentDetail.duration)}}</li>
            </ul>  
          </div>  
        </section>
      </transition>
      <!-- 迷你护理文字区块结束 -->      
    </article>
    <!-- 左侧护理详情区块结束 -->
    <!-- 侧边同类护理列表开始 -->
    <aside class="treat-detail-right">
      <!-- <div class="just-watch"></div> -->
      <section class="samekind-treat">
        <div @click="scrollToTop" class="title">
          <p>{{asideTitle}}</p>
        </div>
        <scroll @scroll="scrollAsideList" :probeType="probeType" :listenScroll="listenScroll" ref="samekindscroll" class="samekind-scroll">
          <ul class="samekind-list">
            <li @click.stop="pickSamekindTreat(item)" :key="item.treatName" v-for="(item, index) in treatmentAside.data">
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
    <!-- 侧边同类护理列表结束 -->
  </article>
</template>

<script type="text/ecmascript-6">
import {judgeDuration} from '../../common/js/util'
import Scroll from '../../base/scroll/scroll'
import animations from 'create-keyframe-animation'
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
    }, 400)
  },
  data() {	
    return {
      // 是否显示迷你区块
      showMini: false,
      // 侧边栏标题文字
      asideTitle: "同类护理",
      // 护理详情图滚动距离
      picScrollY: 0,
      // 侧边栏滚动距离
      asideScrollY: 0,
      // 向Scroll组件传入的属性
      probeType: 3,
      listenScroll: true
    }
  },
  computed: {},
  updated() {
    setTimeout(() => {
      this._initScroll();
    }, 440)
  },
  // watch: {
  //   picScrollY(newPicScrollY) {
  //     console.log(newPicScrollY);
  //   }
  // },
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
      this.$refs.detailinfoscroll && this.$refs.detailinfoscroll.refresh();
    },
    // 关闭详情页
    closeTreatDetail() {
      this.setShowTreatmentDetail(false);
    },
    // 同类护理
    pickSamekindTreat(item) {
      this.setSelectedTreatment(item);
    },
    // 同类护理滚动到最上方
    scrollToTop() {
      this.$refs.samekindscroll.scrollTo(0,0,300);
    },
    // 点击切换文字区域和迷你文字区域
    toggleMini() {
      this.showMini = !this.showMini;
      let picClasslist = this.$refs.detailscroll.$el.classList;
      picClasslist.toggle("showMini");
      this.$nextTick(() => {
        this.$refs.detailscroll.refresh()
      })
    },
    // 监听侧边栏滚动
    scrollAsideList(pos) {
      let scrollAsideY = Math.round(pos.y);
      if(scrollAsideY < 0) {
        this.asideTitle = "点击回顶部"
      } else {
        this.asideTitle = "同类护理"
      }
    },
    // 动画相关的函数
    enter(el, done) {
      let {x,y,scale} = this._getPosAndScale();
      
      // 定义动画属性
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.02)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }

      // 应用create-keyframe-animation
      animations.registerAnimation({
        name: 'avatarMove',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      let bigAvatar = this.$refs.avatarWrapper;
      // 运行动画
      animations.runAnimation(bigAvatar, 'avatarMove', done);
    },
    afterEnter() {
      animations.unregisterAnimation('avatarMove');
      this.$refs.avatarWrapper.style.animation = "";
    },
    leave(el, done) {
      this.$refs.avatarWrapper.style.transition = "all 400ms";
      const {x,y,scale} = this._getPosAndScale();
      this.$refs.avatarWrapper.style['transform'] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      const timer = setTimeout(done, 400);
      this.$refs.avatarWrapper.addEventListener("transitionend", () => {
        clearTimeout(timer);
        done()
      });
    },
    afterLeave() {
      this.$refs.avatarWrapper.style.transition = "";
      this.$refs.avatarWrapper.style['transform'] = "";
    },
    // 获取位置方法
    _getPosAndScale() {
      // 目标头图的数据
      let targetWidth = 90
      let paddingLeft = 65
      let paddingBottom = 60
      // 大头像的数据
      const paddingTop = 488
      const width = 170
      // 缩放比例
      const scale = targetWidth / width
      // 位置
      const x = -(window.innerWidth / 7.5 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {x, y, scale}
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

