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
          .important
            color $palaispa-orange
            font-weight 700

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
              <input ref="radioinput" :name="index" type="radio">{{ radio }}
            </label>
          </li>
          <li :key="index" v-for="(item, index) in Checkboxes">
            <h5>{{ item.question }}</h5>
            <label class="list-item" @click.stop="selectCheckbox(index, subindex)" :key="subindex" v-for="(checkbox, subindex) in item.checkbox">
              <input v-model="checkboxResult[index][subindex]" type="checkbox">{{ checkbox }}
            </label>
          </li>
        </ul>
      </scroll>
      <transition name="slide-up">
        <div v-show="allListChecked" class="check-your-skin">
          <a href="javascript:void(0)" @click.prevent.stop="checkYourSkin()">
            <p v-show="testNotYeat">{{ buttonDesc }}</p>
            <p v-show="!testNotYeat">结论：您的皮肤类型为<span class="important">{{skinResult}}</span>皮肤，皮肤年龄<span class="important">{{ageResult}}</span></p>
          </a>
        </div>
      </transition>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import {getSkintestData} from '../../api/skintest'
import {isValueUndefined, hasCheckboxTrue} from '../../common/js/util'

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
      testNotYeat: true,
      buttonDesc: "测试一下我的皮肤",
      testResult: '',
      allListChecked: false,
      skinResult: '',
      ageResult: ''     
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
    // 初始化数据
    _initData() {
      this.radioResult = [];
      this.checkboxResult = [[],[],[]];
      this.$refs.radioinput.forEach((item) => {
        item.checked = false;
      })
      // console.log(this.$refs.radioinput);
      this.testNotYeat = true;
      this.allListChecked = false;
    },
    // 关闭皮肤测试
    closeSkintest() {
      this.$emit('closeSkintest');
      this._initData(); 
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
      this.radioResult[index] = subindex;
      let AllRadioChecked = this.checkRadioResult();
      this.$nextTick(() => {
        let AllCheckboxChecked = this.checkCheckboxResult();
        let RadioAndCheckboxOk = (AllRadioChecked && AllCheckboxChecked);
        if (RadioAndCheckboxOk === true) {
          this.testNotYeat = true;
          this.allListChecked = true;
        } else {
          this.allListChecked = false;
        }
      })     
    },
    // 复选框选择
    selectCheckbox(index, subindex) {
      let AllRadioChecked = this.checkRadioResult();
      this.$nextTick(() => {
        let AllCheckboxChecked = this.checkCheckboxResult();
        let RadioAndCheckboxOk = (AllRadioChecked && AllCheckboxChecked);
        if (RadioAndCheckboxOk === true) {
          this.testNotYeat = true;
          this.allListChecked = true;  
        } else {
          this.allListChecked = false;
        }
      })
    },
    // 测定单选题是否已经全部答完
    checkRadioResult() {
      let countDefinedValue = 0;
      let radioLength = this.Radios.length;
      let radioResultLength = this.radioResult.length;
      // 数组中非undefined元素的数目
      for (let i=0; i <= radioResultLength; i++) {
        if (this.radioResult[i] || this.radioResult[i] === 0) {
          countDefinedValue++
        }
      }
      // 单选题全部答完
      let AllRadioChecked = (countDefinedValue === radioLength);
      return AllRadioChecked;
    },
    // 测定多选题是否已经全部答完
    checkCheckboxResult() {
      let checkboxResult = this.checkboxResult;  
      let allcheckboxOK = checkboxResult.every((item) => {
        let has = hasCheckboxTrue(item);
        return has
      })
      // console.log(allcheckboxOK);
      return allcheckboxOK;
    },
    // 测试皮肤按钮点击
    checkYourSkin() {
      // console.log('点击了测试皮肤按钮');
      let x = 0, y = 0, z = 0, m = 0;
      // 单选
      // radio结果
      let radioResult = this.radioResult;
      // 第一题
      let q1 = radioResult[0];
      if (q1 === 0) {
        x += 1
      } else {
        x = x
      }
      if (q1 === 2) {
        y += 1
      } else {
        y = y
      }
      if (q1 === 3) {
        z += 1
      } else {
        z = z
      }
      // 第二题
      let q2 = radioResult[1];
      if (q2 === 0) {
        x += 1
		    z += 1
      } else {
        x = x
        z = z
      }
      if (q2 === 2) {
        y += 1
      } else {
        y = y
      }
      // 第三题
      let q3 = radioResult[2];
      if (q3 === 0) {
        x += 1
      } else {
        x = x
      }
      if (q3 === 2) {
        y += 1
        z += 1
      } else {
        y = y
        z = z
      }
      // 第四题
      let q4 = radioResult[3];
      if (q4 === 0) {
        x += 1
        z += 1
      } else {
        x = x
        z = z
      }
      if (q4 === 3) {
        y += 1
      } else {
        y = y
      }
      // 第五题
      let q5 = radioResult[4];
      if (q5 === 0) {
        x += 1
      } else {
        x = x
      }
      if (q5 === 1) {
        z += 1
      } else {
        z = z
      }
      if (q5 === 3) {
        y += 1
      } else {
        y = y
      }
      // 多选
      // checkbox
      // 第六题
      let checkboxResult = this.checkboxResult;
      let q6 = checkboxResult[0];
      if (q6[0] === true) {
        m += 1
      } else {
        m = m
      }
      if (q6[1] === true) {
        m += 2
      } else {
        m = m
      }
      if (q6[2] === true) {
        m += 5
      } else {
        m = m
      }
      // 第七题
      let q7 = checkboxResult[1];
      if (q7[0] === true) {
        m += 1
      } else {
        m = m
      }
      if (q7[1] === true) {
        m += 2
      } else {
        m = m
      }
      if (q7[2] === true) {
        m += 5
      } else {
        m = m
      }
      // 第八题
      let q8 = checkboxResult[2];
      if (q8[1] === true) {
        m += 2
      } else {
        m = m
      }
      if (q8[2] === true) {
        m += 5
      } else {
        m = m
      }
      // console.log(`x = ${x} y=${y} z=${z} m=${m}`);

      // 计算结果
      if (z >= 4) {
        x = 0; y = 0;
        this.skinResult = this.skinTestResult[0];
      } else if (x >= 4) {
        y = 0; z = 0;
        this.skinResult = this.skinTestResult[1];
      } else if (y >= 4) {
        x = 0; z = 0;
        this.skinResult = this.skinTestResult[2];
      } else {
        if (x == y && x!=4 && y!= 4) {
          this.skinResult = this.skinTestResult[3];
        } else if (x > y) {
          this.skinResult = this.skinTestResult[4];
        } else {
          this.skinResult = this.skinTestResult[5];
        }
      }

      if (m === 0) {
        this.ageResult = this.skinAge[0];
      } else if (m > 0 && m <= 4) {
        this.ageResult = this.skinAge[1];
      } else if (m > 4 && m <= 15) {
        this.ageResult = this.skinAge[2];
      } else if (m > 15) {
        this.ageResult = this.skinAge[3];
      }

      this.testNotYeat = false;
    }
  },
  components: {
    Scroll
  }
}
</script>

