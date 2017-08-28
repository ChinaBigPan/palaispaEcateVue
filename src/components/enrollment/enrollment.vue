<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .enrollment
    position fixed
    top 0
    bottom 0
    right 0
    left 60px
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
  <article class="enrollment">
    <scroll ref="tablescroll">
      <table border="1" cellspacing="0" cellpadding="2" class="membership-table">
        <caption class="caption">· {{tableTitle}} ·<p>{{englishTitle}}</p></caption>
        <tr v-if="totalName">
          <th colspan="2" rowspan="2"> {{totalName.text}} </th>
          <th colspan="2">{{ totalName.VIPpearl.text }}<br/>{{ totalName.VIPpearl.subtext }}</th>
          <th colspan="2">{{ totalName.VIPflower.text }}<br/>{{ totalName.VIPflower.subtext }}</th>
          <th>{{ totalName.ExpCard.text }}<br/>{{ totalName.ExpCard.subtext }}</th>
        </tr>
        <tr v-if="totalName">
          <th>{{ totalName.VIPpearl.children[0].name }}</th>
          <th>{{ totalName.VIPpearl.children[1].name }}</th>
          <th>{{ totalName.VIPflower.children[0].name }}</th>
          <th>{{ totalName.VIPflower.children[1].name }}</th>
          <th>{{ totalName.ExpCard.children[0].name }}</th> 
        </tr>
        <tr v-if="tableItem">
          <td rowspan="6">{{ tableItem.memberUnique.name }}</td>
          <td>{{tableItem.memberUnique.subitem[0].name}}</td>
          <td :key="key" v-for="(item, key, index) in tableItem.memberUnique.subitem[0].data">
            {{item}}
          </td>
        </tr>
        <tr v-if="tableItem">
          <td>{{tableItem.memberUnique.subitem[1].name}}</td>
          <td :key="index" v-for="(item, key, index) in tableItem.memberUnique.subitem[1].data">
            {{item}}
          </td>
        </tr>
        <tr v-if="tableItem">
          <td>{{tableItem.memberUnique.subitem[2].name}}</td>
          <td :key="index" v-for="(item, key, index) in tableItem.memberUnique.subitem[2].data">
            {{item}}
          </td>
        </tr>
        <tr v-if="tableItem">
          <td>{{tableItem.memberUnique.subitem[3].name}}</td>
          <td :key="index" v-for="(item, key, index) in tableItem.memberUnique.subitem[3].data">
            {{item}}
          </td>
        </tr>
        <tr v-if="tableItem">
          <td>{{tableItem.memberUnique.subitem[4].name}}</td>
          <td :key="index" v-for="(item, key, index) in tableItem.memberUnique.subitem[4].data">
            {{item}}
          </td>
        </tr>
        <tr v-if="tableItem">
          <td>{{tableItem.memberUnique.subitem[5].name}}</td>
          <td :key="index" v-for="(item, key, index) in tableItem.memberUnique.subitem[5].data">
            {{item}}
          </td>
        </tr>
        <tr v-if="tableItem">
          <td rowspan="2">{{ tableItem.integral.name }}</td>
          <td>{{tableItem.integral.subitem[0].name}}</td>
          <td :key="key" v-for="(item, key, index) in tableItem.integral.subitem[0].data">
            {{item}}
          </td>
        </tr>
        <tr v-if="tableItem">
          <td>{{tableItem.integral.subitem[1].name}}</td>
          <td :key="key" v-for="(item, key, index) in tableItem.integral.subitem[1].data">
            {{item}}
          </td>
        </tr>
        <tr v-if="tableItem">
          <td rowspan="10">{{ tableItem.memberCourtesy.name }}</td>
        </tr>
        <tr v-if="tableItem">
          <td colspan="6">{{tableItem.memberCourtesy.subitem[0].name}}<br />{{ tableItem.memberCourtesy.subitem[0].subtext }}</td>
        </tr>
      </table>
    </scroll>
  </article>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import {getEnrollment} from '../../api/enrollmentData'

export default {
  name: 'enrollment',
  created() {
    this._getEnrollmentData();
  },
  mounted() {
    setTimeout(() => {
      this.$refs.tablescroll && this.$refs.tablescroll.refresh()
    }, 20)
  },
  data() {	
    return {
      // 表格标题
      tableTitle: "贝黎诗会籍方案",
      // 表格标题英语
      englishTitle: "Membership",
      // 会籍数据
      totalName: "",
      tableItem: "",
      remarks: ""
    }
  },
  methods: {
    // 获取入会数据
    _getEnrollmentData() {
      getEnrollment().then((res) => {
        if (res) {
          this.totalName = res.totalName;
          this.tableItem = res.tableItem;
          this.remarks = res.remarks;        
        }
      })
    }
  },
  components: {
    Scroll
  }
}
</script>

