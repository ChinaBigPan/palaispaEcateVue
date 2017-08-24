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
    background $white

</style>

<template>
  <div v-show="showFlag" class="treatment-detail">

  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'

export default {
  name: 'treatmentDetail',
  props: {
    treatmentDetail: {
      type: Object
    },
    showFlag: {
      type: Boolean,
      default: false
    }
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

