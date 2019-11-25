<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  name: 'LineChart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    height: {
      type: String,
      default: '350px'
    },
    width: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title:{
          text: '本年度数据统计',
          left:'30px',
          textStyle: {
            fontSize: 16
          }
        },
        xAxis: {
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          type: 'category',
          axisLabel: {
            interval: 0, // 显示本坐标上的全部信息
          },
        },
        grid: {
          left: 30,
          right: 30,
          bottom: 30,
          top: 70,
          containLabel: true
        },
        tooltip: {
          trigger: "axis", // 提示框 type
          axisPointer: {
            type: "shadow", // 移动到点上的样式
            axis: "x", // 在哪个轴上显示type样式
            shadowStyle: {
              color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0, color: '#fff' // 0% 处的颜色
                  }, {
                      offset: 1, color: '#369' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
              },// 线性渐变
              opacity: .1,
            },
          },
          padding: [5, 10],
          backgroundColor:"rgba(0,29,38,.85)",//rgba(23,52,255,.4)
        },
        yAxis: {
          name:'(件)',
          type: 'value',
          axisTick:{
            show: false, // 默认true  刻度
          },
          splitLine: {
            lineStyle:{
              type:"dahsed"
            }
          }
        },
        color:['#FF005A','#3888fa'],
        series: [{
          name: '完成', 
          itemStyle: {
            normal: {
              //barBorderRadius: [5, 5, 0, 0],
              lineStyle: {
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '未完成',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>