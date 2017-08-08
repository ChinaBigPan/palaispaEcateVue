<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/variable.styl"

  .brandHistory
    background $white
    .timeline
      position relative
      margin 0 auto
      padding 40px 10px
      display flex
      &::before
        content: ""
        position: absolute
        top: 25px
        bottom: 25px
        left: 50%
        width: 4px
        background-color: $palaispa-gray
      .timeline-list
        flex 1
        li
          width 100%
          position relative
          margin 20px 0
          float left
          .time-block
            width 400px
            border 1px solid $palaispa-gray
            border-radius 5px
            padding-bottom 15px
            float right
            &.needleft
              float left
            img
              width 90%
              margin 15px auto 0
              display block
            span
              width 90%
              line-height 1.5
              padding 5px 0
              display block
              margin 0 auto
              font-size 20px
              text-align center
              color $white
              background $palaispa-blue
          .time-sign
            position absolute
            top 5%
            left 50%
            margin-left -30px
            width 40px
            height 40px
            padding 15px
            background $palaispa-blue
            text-align center
            line-height 40px
            font-size 18px
            color $white
            border-radius 50%
</style>

<template>
  <div class="brandHistory" ref="brandHistory">
    <section class="timeline">
      <ul class="timeline-list">
        <li v-for="(item, index) in timeline">
          <div class="time-block" :class="{needleft: _listLeft(index)}">
            <img :src="item" :alt="index">
            <span>{{ timelineDesc[index] }}</span>
          </div>
          <div class="time-sign">
            <span>{{ newYear(index) }}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { getHistory } from '../../api/mainData.js'

export default {
  name: 'brandHistory',
  data() {
    return {
      foundyear: 2005,
      timeline: [],
      timelineDesc: []
    }
  },
  created() {
    // 获取时间轴数据
    this._getTimeLine();  
  },
  mounted() {
    this._getSelfHeight();
  },
  computed: {},
  methods: {
    _getTimeLine() {
      getHistory().then((res) => {
        this.timeline = res.timeline;
        this.timelineDesc = res.timelineDesc;
      })
    },
    // 判断列表是左还是右
    _listLeft(index) {
      return index % 2 === 0;
    },
    // 年份随列表增加
    newYear(index) {
      let newyear = this.foundyear + index;
      return newyear;
    },
    // 获取该组件的高度
    _getSelfHeight() {
      let height = this.$refs.brandHistory.offsetHeight;
      console.log(`历史积淀组件的高度${height}`);
    }
  }
}
</script>
