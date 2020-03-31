<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="height: 350px;width: 100%"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'TestChart',
  data () {
    return {
      charts: ''
    }
  },
  methods: {
    drawLine (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['设备注册数量']
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2020/3/1', '2020/3/10', '2020/3/15', '2020/3/20', '2020/3/23', '2020/3/26', '2020/3/28']

        },
        yAxis: {
          type: 'value'
        },

        series: [{
          name: '设备注册数量',
          type: 'line',
          stack: '总量',
          data: [1, 3, 10, 15, 20, 35, 40]
        }]
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawLine('main')
    })
  }
}
</script>

<style scoped>

</style>
