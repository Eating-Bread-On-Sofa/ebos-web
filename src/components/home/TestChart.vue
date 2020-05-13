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
      charts: '',
      gatewayAddition: [],
      deviceAddition: [],
      xdata1: [],
      ydata1: [],
      ydata2: [],
      option: {
        // title: {
        //   text: '设备注册信息统计',
        //   left: 'center',
        //   top: 20,
        //   textStyle: {
        //     color: '#ccc',
        //     fontStyle: 'italic'
        //   }
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增设备数量', '新增网关数量']
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
          data: ''

        },
        yAxis: {
          type: 'value'
        },

        series: [
          {
            name: '新增设备数量',
            type: 'line',
            stack: '增量',
            data: ''
          },
          {
            name: '新增网关数量',
            type: 'line',
            data: ''
          }
        ]
      }
    }
  },
  mounted () {
    this.getAddition()
  },
  methods: {
    getAddition () {
<<<<<<< HEAD
      this.$axios.get('/gateways/days?days=30').then(resp => {
=======
      this.$axios.get('http://localhost:8000/gc/days?days=30').then(resp => {
      // this.$axios.get('/gateways/days?days=30').then(resp => {
>>>>>>> 3849457aeb372fe79896a0b9b013b5a52631bfed
        if (resp && resp.status === 200) {
          this.gatewayAddition = resp.data
        }
      })
<<<<<<< HEAD
      this.$axios.get('/devices/days?days=30').then(resp => {
=======
      this.$axios.get('http://localhost:8000/d/days?days=30').then(resp => {
      // this.$axios.get('/devices/days?days=30').then(resp => {
>>>>>>> 3849457aeb372fe79896a0b9b013b5a52631bfed
        if (resp && resp.status === 200) {
          this.deviceAddition = resp.data
          this.drawLine(this.gatewayAddition, this.deviceAddition)
        }
      })
    },
    drawLine (gatewayAddition, deviceAddition) {
      for (var x = 29; x >= 0; x--) {
        this.xdata1.push(deviceAddition[x]['endDate'].slice(0, 10))
        this.ydata1.push(deviceAddition[x]['count'])
        this.ydata2.push(gatewayAddition[x]['count'])
      }
      this.option.xAxis.data = this.xdata1
      this.option.series[0].data = this.ydata1
      this.option.series[1].data = this.ydata2
      this.charts = echarts.init(document.getElementById('main'))
      this.charts.setOption(this.option)
    }
  }

}
</script>

<style scoped>

</style>
