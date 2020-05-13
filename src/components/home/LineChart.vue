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
      charts: '',
      scenarioAddition: [],
      xdata: [],
      ydata: [],
      option: {
        tooltip: {},
        legend: {
          data: ['场景服务接入数量']
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
          data: ''

        },
        yAxis: {
          max: 3
        },

        series: [{
          name: '场景服务接入数量',
          type: 'bar',
          data: ''
        }]
      }
    }
  },
  mounted () {
    this.loadScenarioAddition()
  },
  methods: {
    loadScenarioAddition () {
<<<<<<< HEAD
      this.$axios.get('/scenarios/days?days=30').then(resp => {
=======
      this.$axios.get('http://localhost:8000/s/days?days=30').then(resp => {
      // this.$axios.get('/scenarios/days?days=30').then(resp => {
>>>>>>> 3849457aeb372fe79896a0b9b013b5a52631bfed
        if (resp && resp.status === 200) {
          this.scenarioAddition = resp.data
          this.drawLine(this.scenarioAddition)
        }
      })
    },
    drawLine (data) {
      for (var x = 29; x >= 0; x--) {
        this.xdata.push(data[x]['endDate'].slice(0, 10))
        this.ydata.push(data[x]['count'])
      }
      this.option.xAxis.data = this.xdata
      this.option.series[0].data = this.ydata
      this.charts = echarts.init(document.getElementById('lineChart'))
      this.charts.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
