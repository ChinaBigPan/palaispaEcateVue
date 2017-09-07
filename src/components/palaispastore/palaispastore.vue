<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .store
    position fixed
    top 0
    bottom 0
    right 0
    left 60px
    background $palaispa-white
    // 区域列表
    .region-list-block
      display flex
      overflow hidden
      height 60px
      position relative
      z-index 20
      box-shadow 0 1px 1px $palaispa-gray
      .region-scroll
        display inline-block
        flex 1
        overflow hidden
        .scroll-list
          display inline-block
          white-space: nowrap;
          overflow hidden
          .region-list-item
            // flex 0 0 100px
            width 100px
            display inline-block
            // float left
            height 39px
            line-height 39px
            text-align center
            box-shadow 0 0 1px $palaispa-gray
            margin 10px
            border-radius 4px
        
      .right-unknown-block
        flex 0 0 40px
        border none
        position relative
        z-index 30
        box-shadow -1px 0 1px $palaispa-gray
        background $white
    // 门店列表
    .store-list-block
      display flex
      position absolute
      top 60px
      left 0
      right 0
      bottom 0
      overflow hidden
      .store-scroll
        width 100%
        height 100%
        .scroll-list
          margin-top 3px
          padding-bottom 5px
          .store-list-item
              width 100%
              .province-name
                display flex
                height 30px
                line-height 30px
                background $palaispa-lightgray
                font-size 18px
                padding 5px 0
                text-indent 20px
                color $palaispa-gray
        .province-store-list
          display flex
          flex-wrap wrap
          padding 5px 0
          .store-info
            width 50%
            display flex
            margin 5px 0
            .store-pic
              flex 0 0 200px
              width 200px
              height 132px
              overflow hidden
              img
                display block
                width 100%
                height 100%
            .store-brief-intro
              flex 1
              line-height 1.5
              padding-left 8px
              padding-right 5px
              overflow hidden
              position relative
              .store-name
                font-weight bold
                font-size 16px
                overflow hidden
                display block
                white-space nowrap
                text-overflow ellipsis
              .store-address
                font-size 15px
                height 90px
                overflow hidden
              .store-phone
                font-size 16px
                padding-right 5px
                float right
                .icon-phone
                  color $palaispa-orange
                  margin-right 5px
                  font-size 18px
                  vertical-align top
                

</style>

<template>
  <article class="store">
    <section class="region-list-block">
      <scroll ref="regionscroll" :scrollX="true" :direction="horizontal" class="region-scroll">
        <ul class="scroll-list">
          <li @click="scrollToProvince(index, $event)" class="region-list-item" :key="index" v-for="(item, index) in province">{{item}}</li>
        </ul>
      </scroll>
      <div class="right-unknown-block"></div>
    </section>
    <section class="store-list-block">
      <scroll ref="storescroll" class="store-scroll">
        <ul class="scroll-list">
          <li class="store-list-item" :key="index" v-for="(item, key, index) in stores">
            <p @click="scrollToProvinceLabel(index, $event)" class="province-name">{{ item.provinceName }}</p>
            <ul class="province-store-list">
              <li @click="toStoreDetail(subitem)" class="store-info" :key="subindex" v-for="(subitem, subindex) in item.store">
                <div class="store-pic">
                  <img v-lazy="subitem.picture[0]" :alt="subitem.name">
                </div>
                <div class="store-brief-intro">
                  <h5 class="store-name">{{ subitem.name }}</h5>
                  <p class="store-address">{{ subitem.address }}</p>
                  <p class="store-phone"><i class="icon-phone"></i>{{ subitem.phone }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import {getStoreData} from '../../api/palaispaStore'
import {mapMutations} from 'vuex'

export default {
  name: 'palaispastore',
  data() {
    return {
      // 滚动方向
      horizontal: 'horizontal',
      stores: {},
      province: []
    }
  },
  created() {
    this._getPalaispaStoreData()
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20)
  },
  updated() {
    setTimeout(() => {
      this._initScroll();
    }, 20)
  },
  methods: {
    // 获取门店数据
    _getPalaispaStoreData() {
      getStoreData().then((res) => {
        if(res) {
          this.stores = res;
          for (let key in res) {
            this.province.push(res[key].provinceName);
          }
        }
      })
    },
    // 点击上部横向列表，下部滚动到相应位置
    scrollToProvince(index, event) {
      // better-scroll的event._construced属性处理
      // if(!event._constructed) {
      //   return;
      // }
      let storeList = document.getElementsByClassName("store-list-item");
      let el = storeList[index];
      this.$refs.storescroll.scrollToElement(el, 300);
    },
    // 点击下部的省份名称
    scrollToProvinceLabel(index, event) {
      // better-scroll的event._construced属性处理
      // if(!event._constructed) {
      //   return;
      // }
      let provinceLabelList = document.getElementsByClassName("region-list-item");
      let el = provinceLabelList[index];
      this.$refs.regionscroll.scrollToElement(el, 300);
    },
    // 打开门店详情页
    toStoreDetail(store) {
      this.setShowStoreDetail(true);
      this.setStoreDetail(store);
      // console.log(store);
    },
    // 刷新滚动组件
    _initScroll() {
      this.$refs.regionscroll && this.$refs.regionscroll.refresh();
      this.$refs.storescroll && this.$refs.storescroll.refresh();
    },
    // vuex
    ...mapMutations({
      setShowStoreDetail: "SET_SHOW_STORE_DETAIL",
      setStoreDetail: "SET_STORE_DETAIL"
    })
  },
  components: {
    Scroll
  }
}
</script>

