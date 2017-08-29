<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .membership
    width 100%
    height 100%
    position relative
    z-index 100
    background $white
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
      .membership-table
        width 100%
        text-align center
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
          <td rowspan="6">会员专属权益</td>
          <td>疗程折扣</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>产品折扣</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>新护理体验<br />（生活美容）</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>专属房间</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>专属用品</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>护理免费停车</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="2">储值积分</td>
          <td>入会充值</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>续卡充值</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="10">会员礼遇</td>
          <td colspan="6">
            专享礼券<br/>
            (入会/升级/续卡获得，二选一)
          </td>
        </tr>
        <tr>
          <td>护理券</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>产品券</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="6">
            生日礼<br/>
            (生日当月使用)
          </td>
        </tr>
        <tr>
          <td>积分翻倍</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>护理券</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>产品折扣</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>生日礼</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="6">其他礼品</td>
        </tr>
        <tr>
          <td>旅行护肤套装</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="3">会员活动</td>
          <td>特色旅行</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>珍珠会员活动</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>品牌活动</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="2">会员卡</td>
          <td>储值金额</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>有效期</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </scroll>
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'

export default {
  name: 'membership',
  created() {},
  mounted() {
    setTimeout(() => {
      this.refreshScroll()
    }, 200)
  },
  updated() {
    setTimeout(() => {
      this.refreshScroll()
    }, 200)
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
      this.$refs.tablescroll && this.$refs.tablescroll.refresh()
    }
  },
  components: {
    Scroll
  }
}
</script>

