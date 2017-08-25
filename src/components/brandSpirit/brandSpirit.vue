<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/variable.styl"

  .brandSpirit
    background $white
    padding-bottom 20px
    .spirit-list
      display flex
      li.splist
        flex 1
        margin 30px 10px 10px 10px
        border 1px solid $palaispa-gray
        border-radius 5px
        display flex
        img
          position relative
          bottom 40px
          flex 0 0 148px
          max-width 148px
          max-height 153px
          margin 20px
          border-radius 4px
          box-shadow 2px 2px 5px 0 $palaispa-gray
        .desc-list
          flex 1
          margin 15px 10px
          list-style-type disc
          line-height 1.5
    .history
      margin 10px

</style>

<template>
  <article class="brandSpirit" ref="brandSpirit">
    <!-- 品牌精神区块开始 -->
    <ul class="spirit-list">
      <li :key="index" class="splist" v-for="(item, index) in spiritPic">
        <img width="148" height="103" :src="item" :alt="index">
        <ul class="desc-list">
          <li v-for="desc in spiritPicDesc[index]">
            {{ desc }}
          </li>
        </ul>
      </li>
    </ul>
    <!-- 品牌精神区块结束 -->
    <!-- 品牌历史区块开始 -->
    <ul class="history">
      <li :key="index" v-for="(item, index) in historyPic">
        <img v-lazy="item" :alt="index">
      </li>
    </ul>
    <!-- 品牌历史区块结束 --> 
    <loading v-show="!spiritPic.length || !historyPic.length"></loading>  
  </article>
</template>

<script type="text/ecmascript-6">
import Loading from '../../base/loading/loading'
import { getBrandSpiritPic } from '../../api/mainData.js';
import { mapMutations } from 'vuex';

export default {
  name: 'brandSpirit',
  created() {
    this._getPic();
  },
  mounted() {
    setTimeout(() => {
      this.setShouldMainScrollRefresh(true);
    }, 100)
  },
  activated() {
    // keep-alive组件激活时调用，这个要写到子路由里面我勒个去
    setTimeout(() => {
      this.setShouldMainScrollRefresh(true);
    }, 20)
  },
  deactivated() {
    // keep-alive组件离开时调用，这个要写到自路由里面我勒个去
    this.setShouldMainScrollRefresh(false);
  },
  data() {
    return {
      spiritPic: [],
      spiritPicDesc: [],
      historyPic: []
    }
  },
  methods: {
    // 获取图片
    _getPic() {
      getBrandSpiritPic().then((res) => {
        this.spiritPic = res.brandSpiritPic;
        this.spiritPicDesc = res.spiritPicDesc;
        this.historyPic = res.brandHonor;
      })
    },
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
