<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .charts-wrapper
    width 100%
    height 100%
    background $white
    border-left 1px solid $palaispa-gray
    position absolute
    // overflow hidden
    .member-chart
      width 100%
      height 100%
      padding-top 20px
      padding-left 10px
      &>div
        width 100%
        height 100%

</style>

<template>
  <article ref="chartswrapper" class="charts-wrapper">
    <!-- 要渲染的图表 -->
    <section v-if="transferedData" ref="memberchart" class="member-chart">
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

// 会员卡各常量
const CARD_COLOR = ["#050101","#C0C0C0","#426F8b","#671a3b","#899e5f"];
const MEMBER_CATEGORY = ['黑珍珠会员','白珍珠会员','百合会员','玫瑰会员','普通会员'];

export default {
  name: 'charts',
  created() {},
  mounted() {
    // this.resizeChart();
    // 在这里初始化然后在后面渲染
    echarts.init(this.$refs.memberchart);
    setTimeout(() => {
      this.renderChart(this.transferedData);  
    }, 20)  
  },
  updated() {},
  props: {
    transferedData: {
      type: Object,
      default: function() {
        return {
          name: "疗程折扣",
          unit: "单位：折",
          data: [5, 5, 5.5, 6.5, 7.5]
        }
      }
    },
    dataByCard: {
      type: Array
    },
    chartType: {
      type: String,
      default: 'bar'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {
    // 深度监听传入的数据变化
    transferedData: {
      handler(newVal) {
        setTimeout(() => {
          this.renderChart(newVal);
        })  
      },
      deep: true
    },
    // 监听渲染图表类型
    // chartType: {
    //   handler(newVal) {
    //     setTimeout(() => {
    //       // console.log();
    //       this.renderChart();
    //     })
    //   }
    // },
    // deep: true
  },
  methods: {
    // 监听窗口高度变化，从而改变图表尺寸
    resizeChart() {
      window.onresize = () => {
        // 调用echarts的resize方法
        // let myChart = this.echarts;
        // myChart.resize();
        console.log("改变了视窗大小");
      }
    },
    // 渲染图表
    renderChart(val) {
      // 初始化放到外面，然后这里找到DOM然后重新渲染
      let chartDom = echarts.getInstanceByDom(this.$refs.memberchart);     

      // 柱状图设置
      let barChartOption =  {
        title: {
          text: val.name ? val.name : "疗程折扣"
        },
        tooltip: {
          trigger: 'axis'
        },
        legend:{
          data: [val.name ? val.name : "疗程折扣"],
          textStyle: {
            fontSize: 18
          }
        },
        grid: {  
          containLabel: true  
        }, 
        xAxis: {
          type: 'category',
          data: MEMBER_CATEGORY,
          nameTextStyle: {
            fontSize : 16
          }
        },
        yAxis: {
          name : val.unit ? val.unit : "单位：折",
          nameTextStyle: {
            fontSize : 16
          }
        },
        series: {
          name: val.name ? val.name : "疗程折扣",
          type: this.chartType,
          data: val.data ? val.data : [5, 5, 5.5, 6.5, 7.5],
          // 设置柱子宽度
          barWidth: 40,
          // 显示上部标签
          label: {
            normal: {
              show: true,  
              position: 'top'
            }  
          },
          // 配置样式
          itemStyle: {
            // 通常情况下：
            normal: {
              barBorderRadius: [5, 5, 0, 0],
              color: function (params) {
                let colorList = CARD_COLOR;
                return colorList[params.dataIndex];
              }
            },
            // 鼠标悬停或点击时
            emphasis: {
              shadowBlur: 8,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      }

      // 雷达图设置
      let radarChartOption = {
        title: {
          text: '会员卡雷达图'
        },
        tooltip: {},
        legend: {
          data: MEMBER_CATEGORY
        },
        color: CARD_COLOR,
        radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: '疗程花费减免（%）', max: 100},
              { name: '产品花费减免（%）', max: 100},
              // { name: '专属房间', max: 1},
              // { name: '专属用品', max: 1},
              // { name: '护理免费停车', max: 1},
              { name: '入会充值（元/积分）', max: 10},
              { name: '续卡充值（元/积分）', max: 5},
              { name: '专享护理券（元）', max: 3000},
              { name: '产品券（元）', max: 3000},
              { name: '积分翻倍', max: 4},
              { name: '生日护理券（元）', max: 1300},
              { name: '生日产品花费减免（%）', max: 100},
              // { name: '生日礼', max: 1},
              // { name: '旅行护肤套装', max: 1},
              // { name: '特色旅行', max: 1},
              // { name: '珍珠会员活动', max: 1},
              // { name: '品牌活动', max: 1},
              { name: '储值金额', max: 200000},
              { name: '有效期', max: 3}
            ]
        },
        series: [{
            name: '会员卡数据对比',
            type: this.chartType,
            // areaStyle: {normal: {}},
            data : [
              {
                  value : this.dataByCard[0],
                  name : MEMBER_CATEGORY[0],
                  lineStyle: {
                    normal: {
                      color: CARD_COLOR[0]
                    }
                  }
              },
              {
                  value : this.dataByCard[1],
                  name : MEMBER_CATEGORY[1],
                  lineStyle: {
                    normal: {
                      color: CARD_COLOR[1]
                    }
                  }
              },
              {
                  value : this.dataByCard[2],
                  name : MEMBER_CATEGORY[2],
                  lineStyle: {
                    normal: {
                      color: CARD_COLOR[2]
                    }
                  }
              },
              {
                  value : this.dataByCard[3],
                  name : MEMBER_CATEGORY[3],
                  lineStyle: {
                    normal: {
                      color: CARD_COLOR[3]
                    }
                  }
              },
              {
                  value : this.dataByCard[4],
                  name : MEMBER_CATEGORY[4],
                  lineStyle: {
                    normal: {
                      color: CARD_COLOR[4]
                    }
                  }
              } 
            ]
        }]
      }

      
      // let myChart = echarts.init(this.$refs.memberchart);
      if (this.chartType === 'bar') {
        chartDom.setOption(barChartOption);
      } else if (this.chartType === 'radar') {
        chartDom.setOption(radarChartOption);
      }
      
    }
  }
}
</script>
