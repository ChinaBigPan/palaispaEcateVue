<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .membership
    width 100%
    height 100%
    position relative
    overflow hidden
    z-index 200
    background $white
    // overflow hidden
    // 回退按钮
    .close-btn
      position absolute
      top 15px
      left 20px
      font-size 25px
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

    .membership-wrapper
      width 100%
      height 100%
      overflow hidden
      position relative
      .membership-table
        width 100%
        // height 100%
        // overflow hidden
        text-align center
        td.titled
          padding 10px 0
          color $palaispa-blue
        th
          text-align center
          line-height 1.5
          color $palaispa-blue
        .caption
          background $palaispa-blue
          color $white
          font-size 21px
          padding 10px 0
          line-height 1.4
          p
            font-size 18px

  [v-cloak] {
    display: none;
  }

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
  <article class="membership">
    <div @click="hideMemberTable()" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>
    <scroll ref="tablescroll" class="membership-wrapper">
      <table border="1" cellspacing="0" cellpadding="2" class="membership-table">
        <caption class="caption">· 会籍方案 ·<p>Membership</p></caption>
        <tr>
          <th rowspan="2" colspan="2">会籍种类及权益</th>
          <th colspan="2">VIP 珍珠卡<br/>- 限量畅享 -</th>
          <th colspan="2">VIP 花语卡<br/>- 美丽优选 -</th>
          <th>体验卡<br/>- 优质尝鲜 -</th>                             
        </tr>
        <tr>
          <th>黑珍珠会员</th>
          <th>白珍珠会员</th>
          <th>百合会员</th>
          <th>玫瑰会员</th>
          <th>普通会员</th>
        </tr>
        <tr>
          <td class="titled" rowspan="6">会员专属权益</td>
          <td >{{memberItem[0].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[0].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[1].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[1].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[2].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[2].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[3].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[3].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[4].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[4].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[5].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[5].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td class="titled" rowspan="2">储值积分</td>
          <td>{{memberItem[6].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[6].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[7].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[7].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td class="titled" rowspan="10">会员礼遇</td>
          <td colspan="6">
            专享礼券<br/>
            (入会/升级/续卡获得，二选一)
          </td>
        </tr>
        <tr>
          <td>{{memberItem[8].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[8].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[9].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[9].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td class="titled" colspan="6">
            生日礼<br/>
            (生日当月使用)
          </td>
        </tr>
        <tr>
          <td>{{memberItem[10].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[10].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[11].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[11].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[12].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[12].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[13].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[13].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td class="titled" colspan="6">其他礼品</td>
        </tr>
        <tr>
          <td>{{memberItem[14].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[14].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td class="titled" rowspan="3">会员活动</td>
          <td>{{memberItem[15].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[15].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[16].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[16].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[17].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[17].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td class="titled" rowspan="2">会员卡</td>
          <td>{{memberItem[18].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[18].data">
            {{item}}
          </td>
        </tr>
        <tr>
          <td>{{memberItem[19].name}}</td>
          <td :key="index" v-for="(item, index) in memberItem[19].data">
            {{item}}
          </td>
        </tr>
      </table>
    </scroll>
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'

export default {
  name: 'membership',
  created() {
  },
  mounted() {
    setTimeout(() => {
      this.refreshScroll()
    }, 20)
  },
  updated() {},
  props: {
    showMembership: {
      type: Boolean,
      default: false
    },
    memberItem: {
      type: Array,
      default: []
    }
  },
  watch: {
    showMembership() {
      setTimeout(() => {
        this.refreshScroll()
      }, 20)
    }    
  },
  data() {	
    return {}
  },
  methods: {
    // 派发隐藏总表事件
    hideMemberTable() {
      this.$emit('hideMemberTable')
    },
    // 刷新滚动组件
    refreshScroll() {
      this.$refs.tablescroll && this.$refs.tablescroll.refresh();
    }
  },
  components: {
    Scroll
  }
}
</script>

