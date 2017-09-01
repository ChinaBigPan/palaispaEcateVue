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
    background $white
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

</style>

<template>
  <article class="skin-test">
    <div @click="closeSkintest" class="close-btn">
      <i class="icon-arrowleft"></i>
    </div>
     <!-- <el-radio class="radio"  label="1">备选项</el-radio> -->
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import {getSkintestData} from '../../api/skintest'

export default {
  name: 'skintest',
  created() {
    this.getSkintestData();
  },
  data() {	
    return {
      banner: "",
      Radios: [],
      Checkboxes: [],
      skinTestResult: [],
      skinAge: []
    }
  },
  methods: {
    // 关闭皮肤测试
    closeSkintest() {
      this.$emit('closeSkintest')
    },
    // 获取皮肤测试数据
    getSkintestData() {
      getSkintestData().then((res) => {
        this.banner = res.banner;
        this.Radios = res.Radios;
        this.Checkboxes = res.Checkboxes;
        this.skinTestResult = res.skinTestResult;
        this.skinAge = res.skinAge;
        console.log(this.banner);
        console.log(this.Radios);
        console.log(this.Checkboxes);
        console.log(this.skinTestResult);
        console.log(this.skinAge);
      });
    }
  }
}
</script>

