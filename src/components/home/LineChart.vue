<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="lineChart" style="height: 350px;width: 100%"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'LineChart',
  data () {
    return {
      charts: ''
    }
  },
  methods: {
    drawLine (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {},
        legend: {
          data: ['服务接入数量']
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
          data: ['2020/3/1', '2020/3/4', '2020/3/8', '2020/3/10', '2020/3/12', '2020/3/15', '2020/3/20', '2020/3/23']

        },
        yAxis: {},

        series: [{
          name: '服务接入数量',
          type: 'bar',
          data: ['3', '1', '2', '3', '2', '4', '4', '5']
        }]
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawLine('lineChart')
    })
  }
}
</script>

<style scoped>

</style>
