<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .skin-test  
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 60px;
    overflow: hidden;
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
    
    // 测试部分
    .test-wrapper
      width 100%
      height 100%
      // overflow hidden
      .banner
        width 100%
        height 171px
        box-shadow 0 1px 2px $black
        position relative
        overflow hidden
        z-index 100
        img 
          width 100%
          height 100%
          display block
          margin 0 auto

      .skintest-scroll
        top 171px
        left 0
        right 0
        bottom 0
        position absolute
        overflow hidden
        .skintest-list
          display flex
          width 100%
          // height 100%
          flex-wrap wrap
          padding-bottom 80px
          // overflow hidden
          // justify-content space-between
          li
            flex 0 0 270px
            min-width 270px
            height 250px
            margin-left 30px
            margin-top 20px
            background white
            border-radius 5px
            box-shadow 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset
            padding 5px
            position relative
            &:before
              transform skew(-15deg) rotate(-6deg)
              left 15px
            &:after
              transform skew(15deg) rotate(6deg)
              right 15px
            &:before, &:after
              width 70%
              height 55%
              content ''
              box-shadow 0 8px 16px rgba(0, 0, 0, 0.3) 
              position absolute
              bottom 10px
              z-index -1
            h5
              text-align center
              font-size 18px
              line-height 1.5
              margin 10px 0
            .list-item
              display block
              font-size 18px
              margin 15px
              line-height 1.2
              transition all 400ms linear
              input
                outline none
                display inline-block
                vertical-align middle
                margin-left 5px
                margin-right 5px
                width 18px
                height 18px
                
      .check-your-skin
        position fixed
        bottom 0 
        left 180px
        right 120px
        height 60px
        z-index 100
        text-align center
        line-height 60px
        border-radius 10px 10px 0 0
        overflow hidden
        box-shadow 0 -1px 2px $palaispa-gray
        background transparent
        a 
          display block
          color $palaispa-blue
          margin 0 auto
          width 100%
          height 100%
          background rgba(255,255,255,.9)

  // 上滑效果
  .slide-up-enter-active, .slide-up-leave-active {
    transition all .3s
  }
  .slide-up-enter, .slide-up-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity 0
    transform translate3d(0, 100%, 0)
  }
</style>

<template>
  <article class="skin-test">
    <div @click="closeSkintest" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>
    <section class="test-wrapper">
      <div class="banner">
        <img v-lazy="banner" alt="测试您的皮肤">
      </div>
      <scroll :click="false" ref="skintestscroll" class="skintest-scroll">
        <ul class="skintest-list">
          <li :key="index" v-for="(item, index) in Radios">
            <h5>{{ item.question }}</h5>
            <label class="list-item" @click.stop="selectedRadio(index, subindex)" :key="subindex" v-for="(radio, subindex) in item.radio">
              <input :name="index" type="radio">{{ radio }}
            </label>
          </li>
          <li :key="index" v-for="(item, index) in Checkboxes">
            <h5>{{ item.question }}</h5>
            <label class="list-item" @click.stop="selectedCheckbox()" :key="subindex" v-for="(checkbox, subindex) in item.checkbox">
              <input v-model="checkboxResult[index][subindex]" type="checkbox">{{ checkbox }}
            </label>
          </li>
        </ul>
      </scroll>
      <transition name="slide-up">
        <div v-show="allListChecked" class="check-your-skin">
          <a href="javascript:void(0)" @click.prevent.stop="checkYourSkin()">测试一下我的皮肤</a>
        </div>
      </transition>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import {getSkintestData} from '../../api/skintest'

export default {
  name: 'skintest',
  created() {
    this.getSkintestData();
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  updated() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  props: {
    showSkintest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      banner: "",
      Radios: [],
      Checkboxes: [],
      skinTestResult: [],
      skinAge: [],
      // 各个选项
      radioResult: [],
      checkboxResult: [[],[],[]],
      // 检查是否所有题都答过了
      allListChecked: true
    }
  },
  watch: {
    showSkintest() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    }
  },
  methods: {
    // 刷新scroll
    _initScroll() {
      this.$refs.skintestscroll && this.$refs.skintestscroll.refresh();
    },
    // 关闭皮肤测试
    closeSkintest() {
      this.$emit('closeSkintest')
    },
    // 获取皮肤测试数据
    getSkintestData() {
      getSkintestData().then((res) => {
        this.banner = res.banner;
        this.Radios = res.Radios;
        this.Checkboxes = res.Checkboxes;
        this.skinTestResult = res.skinTestResult;
        this.skinAge = res.skinAge;
        // console.log(this.Radios);
        // console.log(this.Checkboxes);
        // console.log(this.skinTestResult);
        // console.log(this.skinAge);
      });
    },
    // 单选框选择
    selectedRadio(index, subindex) {
      // this.clickedRadioIndex = subindex; 
      this.radioResult[index] = subindex;
      console.log(this.radioResult);
    },
    // 复选框选择
    selectedCheckbox() {
      console.log(this.checkboxResult);
    },
    // 测试皮肤按钮点击
    checkYourSkin() {
      console.log('点击了测试皮肤按钮');
      let x = 0, y = 0, z = 0, m = 0;

      
      
    }
  },
  components: {
    Scroll
  }
}
</script>

