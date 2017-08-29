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
          width 80%
          margin 15px auto
          text-align center
          padding 6%
          font-size 18px
          box-shadow 0 0 2px $palaispa-gray
          border-radius 5px
          i
            font-size 20px
            vertical-align center
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
</style>

<template>
  <article class="enrollment">
    <!-- 表格和会员卡图区块开始 -->
    <section class="top-block">
      <div class="left">
        <div class="btn"><i class="icon-biaoge1"></i>总表</div>
        <div class="btn"><i class="icon-buzou"></i>备注</div>
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
      下部
    </section>
    <!-- 项目和数据视图区结束 -->    
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import Membership from '../membership/membership'
import {getEnrollment} from '../../api/enrollmentData'

export default {
  name: 'enrollment',
  created() {
    this._getEnrollmentData();
  },
  data() {	
    return {
      // 会员卡图片
      memberImage: []
    }
  },
  methods: {
    // 获取入会数据
    _getEnrollmentData() {
      getEnrollment().then((res) => {
        if (res) {
          this.memberImage = res.memberImage;
          // console.log(res);
          console.log(this.memberImage);          
        }
      })
    }
  }
}
</script>
