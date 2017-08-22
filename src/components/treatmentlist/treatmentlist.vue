<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .treatment-list
    position absolute
    display flex
    overflow hidden
    margin 5px
    left 0
    height 100%
    .treatkind-wrapper
      flex 0 0 100px
      width 100px
      background $palaispa-lightgray
    .treatlist-wrapper
      background $white
      flex 1
</style>

<template>
  <div class="treatment-list">
    <div class="treatkind-wrapper">

    </div>
    <div class="treatlist-wrapper">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getAllTreatment} from '../../api/treatmentData'

export default {
  name: 'treatmentlist',
  props: {
    treatment: {
      type: Object
    }
  },
  data() {	
    return {
      treatmentData: []
    }
  },
  created() {
    this._getTreatmentData();
  },
  methods: {
    // 获取护理数据
    _getTreatmentData() {
      getAllTreatment().then((res) => {
        this.treatmentData = res;
        console.log(this.treatmentData);
      })
    }
  }
}
</script>

