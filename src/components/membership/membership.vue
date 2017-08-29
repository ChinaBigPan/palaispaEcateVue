<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .membership
    width 100%
    height 100%
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
</style>

<template>
  <article class="membership">
    <scroll ref="tablescroll">
      <table border="1" cellspacing="0" cellpadding="2" class="membership-table">
        <caption class="caption">· 会籍方案 ·<p>Membership</p></caption>

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
      this.$refs.tablescroll && this.$refs.tablescroll.refresh()
    }, 20)
  },
  data() {	
    return {}
  },
  methods: {},
  components: {
    Scroll
  }
}
</script>

