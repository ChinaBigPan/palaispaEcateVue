<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .treatment-list
    position absolute
    display flex
    overflow hidden
    margin 5px
    left 0
    height 100%
    width 100%
    // 左侧
    .treatkind-wrapper
      flex 0 0 100px
      width 100px
      background $palaispa-lightgray
      margin-bottom 160px
      .treatkind-item
        display block
        line-height 20px
        // padding 0 10px
        .text
          display flex
          align-self center
          justify-content center
          align-items center
          width 100%
          height 60px
          vertical-align middle
          text-align center
          font-size 17px
          background $white
          border-bottom 1px solid rgba(0,0,0,.1)
          border-left 4px solid $palaispa-blue
          i
            display inline-block
            vertical-align top
            color red
            margin-right 5px
            font-size 18px
            
        // 小列表
        .treatkind-itemul
          display block
          .treatkind-itemlist
            width 100%
            display flex
            align-self center
            justify-content center
            align-items center
            background $white
            height 50px
            line-height 20px
            border-left 4px solid $palaispa-lightgreen
            border-bottom 1px solid rgba(0,0,0,.1)
            .subkindname
              font-size 16px

    // 右侧
    .treatlist-wrapper
      background $white
      flex 1
      margin-bottom 160px
      .treatlist-item
        background $white
        margin-bottom 5px
        margin-right 5px
        .treatlist-itemlist 
          padding-bottom 5px
          .subkindname
            display flex
            background $palaispa-lightgray
            border-left 4px solid $palaispa-lightgreen
            vertical-align middle
            padding-left 10px
            padding-top 5px
            padding-bottom 5px
            color gray
            flex 1
          .treat-thirdlist
            width 100%
            display flex
            flex-wrap: wrap
            // 护理单项区块
            .thirdlist-item-block
              width 200px
              height 220px
              border 1px solid $palaispa-gray
              border-radius 5px
              margin 6px
              display inline-block
              white-space:nowrap; 
              overflow:hidden; 
              text-overflow:ellipsis;
              .treat-avatar
                display block
                width 180px
                margin 8px auto 6px
                border-radius 4px
              .treat-name
                margin-top 10px
                margin-left 8px
                color $black
                white-space:nowrap; 
                overflow:hidden;
                text-overflow:ellipsis;
              .treat-brand
                margin-top 6px
                margin-left 8px
                color $palaispa-treatgray
</style>

<template>
  <div class="treatment-list">
    <scroll ref="treatkindwrapper" class="treatkind-wrapper">
      <!-- 左侧列表开始 -->
      <ul>
        <li class="treatkind-item" :key="index" v-for="(item, index) in treatKind">
          <div class="text">
            <i class="icon-wxbpinpaibao" v-show="index === 'HotRecommend'"></i>{{item.kindname}}
          </div>
          <!-- 子项列表开始 -->
          <ul class="treatkind-itemul">
            <li :key="subindex" v-for="(subkind, subindex) in item.subkind" class="treatkind-itemlist">
              <h4 class="subkindname">{{subkind.subkindname}}</h4>
            </li>
          </ul>
          <!-- 子项列表结束 --> 
        </li>
      </ul>
      <!-- 左侧列表结束 -->
    </scroll>
    <scroll ref="treatlistwrapper" class="treatlist-wrapper">
      <!-- 右侧列表开始 -->
      <ul>
        <li class="treatlist-item" :key="index" v-for="(item, index) in treatKind">
          <!-- 标题区块列表开始 -->
          <ul>
            <li :key="subindex" v-for="(subkind, subindex) in item.subkind" class="treatlist-itemlist">
              <h4 class="subkindname">{{subkind.subkindname}}</h4>
              <!-- 护理列表开始 -->
              <ul class="treat-thirdlist">
                <li :key="thirdindex" v-for="(thirdkind, thirdindex) in subkind.data">
                  <div class="thirdlist-item-block">
                    <img width="200" height="174" class="treat-avatar" :src="thirdkind.avatar" :alt="thirdkind.treatName">
                    <p class="treat-name">{{thirdkind.treatName}}</p>
                    <p class="treat-brand">{{thirdkind.brand}}</p>
                  </div>
                </li>
              </ul>
              <!-- 护理列表结束 -->
            </li>
          </ul>
          <!-- 标题区块列表结束 -->
        </li>
      </ul>
      <!-- 右侧列表结束 -->
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
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
      // 护理类型
      treatKind: [],
      // 护理列表
      treatList:[]
    }
  },
  created() {
    this._getTreatmentData();
  },
  mounted() {
    setTimeout(() => {
      // 初始化Scroll
      this._initScroll();
    }, 200)
  },
  methods: {
    // 获取护理数据
    _getTreatmentData() {
      getAllTreatment().then((res) => {
        this.treatKind = res;
        console.log(this.treatKind);
      })
    },
    // 初始化列表
    _initScroll() {
      this.$refs.treatkindwrapper && this.$refs.treatkindwrapper.refresh();
      this.$refs.treatlistwrapper && this.$refs.treatlistwrapper.refresh();
    }
  },
  components: {
    Scroll
  }
}
</script>

