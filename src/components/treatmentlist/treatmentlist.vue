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
      background $white
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
          border-left 2px solid $palaispa-blue
          &.current 
            background $palaispa-blue
            color $white
            transition all 500ms
            i 
              color yellow

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
            border-left 2px solid $palaispa-lightgreen
            border-bottom 1px solid rgba(0,0,0,.1)
            &.current
              background $palaispa-lightgreen
              color $white
              transition all 500ms
            .subkindname
              font-size 16px

    // 右侧
    .treatlist-wrapper
      background $white
      flex 1
      margin-bottom 480px
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
            padding-top 8px
            padding-bottom 8px
            font-size 16px
            color gray
            flex 1
          .treat-thirdlist
            width 100%
            display flex
            flex-wrap: wrap
            // 护理单项区块
            .thirdlist-item-block
              width 200px
              height 230px
              border-radius 5px
              margin 10px 6px 5px
              box-shadow 0 1px 2px 0 $palaispa-gray
              display inline-block
              white-space nowrap 
              overflow hidden 
              text-overflow ellipsis
              .treat-avatar
                display block
                margin 0 auto 6px
                border-radius 4px
              .treat-name
                margin-top 10px
                margin-left 8px
                color $black
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
              .treat-brand
                margin-top 8px
                margin-left 8px
                font-size 14px
                color $palaispa-treatgray
</style>

<template>
  <div class="treatment-list">
    <scroll ref="treatkindwrapper" class="treatkind-wrapper">
      <!-- 左侧列表开始 -->
      <ul>
        <li class="treatkind-item" :key="index" v-for="(item, key, index) in treatKind">
          <div class="text" :class="{'current' : currentFirstIndex === index}">
            <i class="icon-wxbpinpaibao" v-show="key === 'HotRecommend'"></i>{{item.kindname}}
            <!-- {{index}} -->
          </div>
          <!-- 子项列表开始 -->
          <ul class="treatkind-itemul">
            <li @click="currentDataIndex($event)" ref="subkindlist" :class="{'current' : currentSecondIndex === subkindIndex(subkind)}" :key="subindex" v-for="(subkind, subindex) in item.subkind" class="treatkind-itemlist">
              <h4 class="subkindname">{{subkind.subkindname}}</h4>
            </li>
          </ul>
          <!-- 子项列表结束 -->
        </li>
      </ul>
      <!-- 左侧列表结束 -->
    </scroll>
    <scroll @scroll="scrollRightList" :probeType="probeType" :listenScroll="listenScroll" ref="treatlistwrapper" class="treatlist-wrapper">
      <!-- 右侧列表开始 -->
      <ul>
        <li class="treatlist-item treatlist-item-hook" :key="index" v-for="(item, key, index) in treatKind">
          <!-- 标题区块列表开始 -->
          <!-- {{index}} -->
          <ul>
            <li :key="subindex" v-for="(subkind, subindex) in item.subkind" class="treatlist-itemlist treatlist-itemlist-hook">
              <h4 class="subkindname">{{subkind.subkindname}}</h4>
              <!-- {{subindex}} -->
              <!-- 护理列表开始 -->
              <ul class="treat-thirdlist">
                <li :key="thirdindex" v-for="(thirdkind, thirdindex) in subkind.data">
                  <div class="thirdlist-item-block">
                    <img class="treat-avatar" v-lazy="thirdkind.avatar" :alt="thirdkind.treatName">
                    <p class="treat-name">{{thirdkind.treatName}}</p>
                    <p class="treat-brand">{{thirdkind.brand}} - {{thirdkind.duration}}分</p>
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
      // 左侧子列表数组
      treatsubkindItemlist: [],
      // 左侧子列表数组名字
      treatsubkindItemlistname: new Set(),
      // 右侧列表的区间高度（大）
      listHeightBig: [],
      // 右侧列表高度区间（小）
      listHeightSmall: [],
      // 列表的滚动的距离
      scrollY: 0,
      // 向Scroll组件传入的属性
      probeType: 3,
      listenScroll: true
    }
  },
  computed: {
    // 看看当前列表所在哪个一级区间
    currentFirstIndex() {
      for(let i=0; i<this.listHeightBig.length;i++) {
        let height1 = this.listHeightBig[i];
        let height2 = this.listHeightBig[i+1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY <= height2)) {
          return i;
        }
      }
      return 0;
    },
    // 子列表所在哪个二级区间
    currentSecondIndex() {
      for(let i=0; i<this.listHeightSmall.length;i++) {
        let height1 = this.listHeightSmall[i];
        let height2 = this.listHeightSmall[i+1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY <= height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  created() {
    this._getTreatmentData();
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
      this._addDataIndex();
      this._calculateHeight();

      // 测试一下
      this._getSubkindList();
    }, 200)
  },
  methods: {
    // 左侧子列表索引
    subkindIndex(subkind) {
      let name = subkind.subkindname;
      // treatsubkindItemlistname是Set结构,然后再将其转换为数组结构
      let nameSet = this.treatsubkindItemlistname.add(subkind.subkindname);
      let nameArray = Array.from(this.treatsubkindItemlistname);
      let nameIndex =  nameArray.indexOf(name);
      return nameIndex;
    },
    // 获取左侧子列表的实例数组
    _getSubkindList() {
      let subkindlist = this.$refs.subkindlist;
      this.treatsubkindItemlist = subkindlist;
      // console.log(subkindlist);
    },
    // 获取自定义的data-index
    currentDataIndex($event) {
      if(!event._constructed) {
        let dataIndex = $event.currentTarget.id;
        let dataIndexNum = Number(dataIndex);
        console.log(dataIndexNum);
        return dataIndexNum;
      }  
    },
    // 获取护理数据
    _getTreatmentData() {
      getAllTreatment().then((res) => {
        if(res) {
          this.treatKind = res;
          // 派发护理读取成功的事件
          this.$emit('treatSuccess');
        }
      })
    },
    // 初始化列表
    _initScroll() {
      this.$refs.treatkindwrapper && this.$refs.treatkindwrapper.refresh();
      this.$refs.treatlistwrapper && this.$refs.treatlistwrapper.refresh();
    },
    // 为左侧小列表添加自定义的index
    _addDataIndex() {
      // 获取左侧小列表的元素
      let treatkindItemlist = this.$refs.subkindlist;
      this.treatkindItemlist = treatkindItemlist;
      for(let i=0;i<treatkindItemlist.length;i++){
        treatkindItemlist[i].setAttribute("id", i);
      }
    },
    // 获取右侧列表的高度区间（分为外侧大列表和内测小列表两种）
    _calculateHeight() {
      let heightBig = 0;
      let heightSmall = 0;
      // 右侧列表添加了treatlist-itemlist-hook的钩子, 获取这些元素集合的数组（大列表）
      let itemlistBig = document.getElementsByClassName("treatlist-item-hook");
      this.listHeightBig.push(heightBig);
      // 将各个列表项距离外部的高度添加进数组
      for(let i = 0; i < itemlistBig.length; i++) {
        let item = itemlistBig[i];
        heightBig += item.clientHeight;
        this.listHeightBig.push(heightBig);
      }
      // console.log("左侧大列表数组" + this.listHeightBig);
      // 右侧列表添加了treatlist-itemlist-hook的钩子, 获取这些元素集合的数组（小列表）
      let itemlistSmall = document.getElementsByClassName("treatlist-itemlist-hook");     
      this.listHeightSmall.push(heightSmall);
      // 将各个列表项距离外部的高度添加进数组
      for(let j = 0; j < itemlistSmall.length; j++) {
        let item = itemlistSmall[j];
        heightSmall += item.clientHeight;
        this.listHeightSmall.push(heightSmall);
      }
      // console.log("左侧小列表数组" + this.listHeightSmall);
    },
    // 右侧列表滚动时触发的事件
    scrollRightList(pos) {
      this.scrollY = Math.abs(Math.round(pos.y));
    }
  },
  components: {
    Scroll
  }
}
</script>

