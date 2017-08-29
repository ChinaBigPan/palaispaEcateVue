<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .enrollment
    position fixed
    top 0
    bottom 0
    right 0
    left 60px
    background $palaispa-lightgray
    // 表格和会员卡图区块
    .top-block
      display flex
      height 20%
      background $white
      .left
        flex 0 0 180px
        width 180px
        background $white
        padding 15px 0
        .btn
          width 60%
          margin 15px auto
          text-align center
          padding 6%
          font-size 18px
          box-shadow 0 0 2px $palaispa-gray
          border-radius 5px
          i
            font-size 22px
            vertical-align top
            color $palaispa-orange
            margin-right 10px

      .member-card
        flex 1
        display flex
        background $white
        .card-block
          flex 1
          display flex
          align-self center
          align-items center
          justify-content center
          padding 0 5px
          img
            display block
            position relative
            background transparent
            border-radius 5px
            box-shadow: 0 1px 4px rgba(0, 0, 0, .3), 0 0 40px rgba(0, 0, 0, .1) inset
            &:after, &:before
              content ''
              position: absolute
              z-index -1
              top 50%
              right 30px
              bottom 0
              left 30px
              border-radius 100px / 10px
              box-shadow 0 0 20px rgba(0, 0, 0, .8)




    // 项目和数据视图区开始
    .bottom-block
      display flex
      margin-top 1%
      height 79%
      background $white
      // 左侧列表
      .member-scroll
        flex 0 0 180px
        width 180px
        height 100%
        margin-left 5px
        overflow hidden
        .item-list
          background $palaispa-lightgray
          .list
            font-size 16px
            line-height 1.4
            text-align center
            padding 12px 0
            box-shadow 0 1px 1px rgba(0,0,0,.06)
            &.selected
              background $white
              box-shadow 0 1px 1px rgba(0,0,0,.1)
              transition all 400ms linear

      // 右侧图表
      .right-echart
        flex 1
  

  // 渐变效果
  .fade-enter-active, .fade-leave-active {
    transition opacity .3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity 0
  }
</style>

<template>
  <article class="enrollment">
    <transition name="fade">
      <membership @hideMemberTable="hideMemberTable()" v-show="showMembership"></membership>
    </transition>
    <!-- 表格和会员卡图区块开始 -->
    <section class="top-block">
      <div class="left">
        <div @click.stop="showMemberTable()" class="btn"><i class="icon-biaoge1"></i>总表</div>
        <div @click.stop="showRemark()" class="btn"><i class="icon-buzou"></i>备注</div>
      </div>
      <ul class="member-card">
        <li :key="index" v-for="(item, index) in memberImage" class="card-block">
          <img :src="item" :alt="index">
        </li>
      </ul>
    </section>
    <!-- 表格和会员卡图区块结束 --> 
    <!-- 项目和数据视图区开始 -->
    <section class="bottom-block">
      <scroll ref="memberscroll" class="member-scroll">
        <ul class="item-list">
          <li :key="index" v-for="(item, index) in memberItem" class="list">
            {{item.name}}
          </li>
        </ul>
      </scroll>
      <div class="right-echart">
        <echarts></echarts>
      </div>
    </section>
    <!-- 项目和数据视图区结束 -->    
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import Membership from '../membership/membership'
import echarts from '../../base/charts/charts'
import {getEnrollment} from '../../api/enrollmentData'
import {concatArrays} from '../../common/js/util'

export default {
  name: 'enrollment',
  created() {
    this._getEnrollmentData();
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 200)
  },
  data() {	
    return {
      // 是否显示总表
      showMembership: false,
      // 会员卡图片
      memberImage: [],
      // 会员卡属性
      memberItem: []
    }
  },
  methods: {
    // 获取入会数据
    _getEnrollmentData() {
      getEnrollment().then((res) => {
        if (res) {
          this.memberImage = res.memberImage;
          this.memberItem = this.getMemberItem(this.memberItem, res.memberUnique, res.integral, res.memberCourtesy, res.memberAct, res.memberCard);
          console.log(res);
        }
      })
    },
    // 合并数组
    getMemberItem(array, ...targetArray) {
      return concatArrays(array, ...targetArray);
    },
    // 初始化scroll
    _initScroll() {
      this.$refs.memberscroll && this.$refs.memberscroll.refresh();
    },
    // 展示总表
    showMemberTable() {
      this.showMembership = true;
    },
    // 隐藏总表
    hideMemberTable() {
      this.showMembership = false;
    },
    // 展示备注
    showRemark() {
      console.log('点击了备注按钮');
    }
  },
  components: {
    Scroll,
    echarts,
    Membership
  }
}
</script>
