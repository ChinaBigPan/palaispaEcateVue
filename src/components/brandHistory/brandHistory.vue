<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/variable.styl"

  .brandHistory
    background $white
    padding-bottom 100px
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
          height 220px
          .time-block
            width 400px
            border 1px solid $palaispa-gray
            border-radius 5px
            padding-bottom 15px
            position relative
            z-index 100
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
            margin-left -33px
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
  <article class="brandHistory" ref="brandHistory">
    <section class="timeline">
      <ul class="timeline-list">
        <li :key="index" v-for="(item, index) in timeline">
          <div class="time-block" :class="{needleft: _listLeft(index)}">
            <img v-lazy="item" :alt="index">
            <span>{{ timelineDesc[index] }}</span>
          </div>
          <div class="time-sign">
            <span>{{ year[index] }}</span>
          </div>
        </li>
      </ul>
    </section>
    <loading v-show="!timeline.length"></loading>
  </article>
</template>

<script type="text/ecmascript-6">
import Loading from '../../base/loading/loading'
import { getHistory } from '../../api/mainData.js';
import { mapMutations } from 'vuex';

export default {
  name: 'brandHistory',
  data() {
    return {
      year: [],
      timeline: [],
      timelineDesc: []
    }
  },
  created() {
    // 获取时间轴数据
    this._getTimeLine();  
  },
  mounted() {
    setTimeout(() => {
      this.setShouldMainScrollRefresh(true);
    }, 200)
  },
  activated() {
    // keep-alive组件激活时调用，这个要写到子路由里面我勒个去
    setTimeout(() => {
      this.setShouldMainScrollRefresh(true);
    }, 100)
  },
  deactivated() {
    // keep-alive组件离开时调用，这个要写到自路由里面我勒个去
    this.setShouldMainScrollRefresh(false);
  },
  mounted() {},
  computed: {},
  methods: {
    _getTimeLine() {
      getHistory().then((res) => {
        this.year = res.yearStamp;
        this.timeline = res.timeline;
        this.timelineDesc = res.timelineDesc;
      })
    },
    // 判断列表是左还是右
    _listLeft(index) {
      return index % 2 === 0;
    },
    // 年份随列表增加
    // newYear(index) {
    //   let newyear = this.foundyear + index;
    //   return newyear;
    // },
    // vuex方法引入
    ...mapMutations({
      setShouldMainScrollRefresh: 'SET_SHOULD_MAIN_SCROLL_REFRESH'
    })
  },
  components: {
    Loading
  }
}
</script>
