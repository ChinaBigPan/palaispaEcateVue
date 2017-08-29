<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .charts-wrapper
    // width 100%
    height 100%
    padding 20px 30px
    background $white
    border-left 1px solid $palaispa-gray
    .member-chart
      width 100%
      height 100%

</style>

<template>
  <article class="charts-wrapper">
    <!-- 要渲染的图表 -->
    <section ref="memberchart" class="member-chart">

    </section>
  </article>
</template>

<script type="text/ecmascript-6">
// 引入echarts基本模版
const echarts = require('echarts/lib/echarts')
// 按需引入柱状图和雷达图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')
// 引入提示框和图例组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  name: 'charts',
  created() {
  },
  mounted() {
    this.resizeChart();
    this.renderChart();
  },
  updated() {
  },
  props: {
    // 从父组件传入的数据
    chartData: {
      type: Object,
      default: function() {
        // 用于测试的默认数据
        return {
          title: {
            text: '疗程折扣'
          },
          tooltip: {},
          color: ["#050101","#F0F0F0","#426F8b","#671a3b","#899e5f"],
          legend:{
            data: ['黑珍珠会员','白珍珠会员','百合会员','玫瑰会员','普通会员']
          },
          xAxis: {
            type: 'category',
            data: [
              {
                value: '黑珍珠会员'
              },{
                value: '白珍珠会员'
              },{
                value: '百合会员'
              },{
                value: '玫瑰会员'
              },{
                value: '普通会员'
              }
            ]
          },
          yAxis: {},
          series: [{
            name: '黑珍珠会员',
            type: 'bar',
            data: [5],
            barWidth: 40
          },{
            name: '白珍珠会员',
            type: 'bar',
            data: [5],
            barWidth: 40
          },{
            name: '百合会员',
            type: 'bar',
            data: [5.5],
            barWidth: 40
          },{
            name: '玫瑰会员',
            type: 'bar',
            data: [5.5],
            barWidth: 40
          },{
            name: '普通会员',
            type: 'bar',
            data: [7.5],
            barWidth: 40
          }]
        }
      }
    }
  },
  data() {	
    return {
      title: {},
      tooltip: {},
      legend: {},
      xAxis: {},
      yAxis: {},
      series:[]
    }
  },
  watch: {
    // 深度监听传入的数据变化
    chartData: {
      handler(newVal, val) {
        console.log(`newVal = ${newVal}; val=${val}`);
        this.renderChart();
      },
      deep:true
    }
  },
  methods: {
    // 监听窗口高度变化，从而改变图表尺寸
    resizeChart() {
      window.onresize = () => {
        // 调用echarts的resize方法
        this.echarts.resize();
      }
    },
    // 渲染图表
    renderChart() {
      // 图表设置
      let chartOption = this.chartData;
      // 初始化
      let myChart = echarts.init(this.$refs.memberchart);
      myChart.setOption(chartOption);


      // {
      //   name: '疗程折扣',
      //   type: 'bar',
      //   data: [5, 5, 5.5, 5.5, 7.5],
      //   // 设置柱子宽度
      //   barWidth: 40,
      //   label: {
      //     show: true,
      //     position: 'top',
      //     formatter: '{b}\n{c}'
      //   },
      //   // 配置样式
      //   itemStyle: {
      //     // 通常情况下：
      //     normal: {
      //       color: function (params) {
      //         let colorList = [
      //           "#050101",
      //           "#F0F0F0",
      //           "#426F8b",
      //           "#671a3b",
      //           "#899e5f"
      //         ];
      //         return colorList[params.dataIndex];
      //       }
      //     },
      //     // 鼠标悬停或点击时
      //     emphasis: {
      //       shadowBlur: 10,
      //       shadowOffsetX: 0,
      //       shadowColor: 'rgba(0, 0, 0, 0.5)'
      //     }
      //   }
      // }



    }
  }
}
</script>
