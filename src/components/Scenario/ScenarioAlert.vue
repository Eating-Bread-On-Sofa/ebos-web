<template>
  <div id="main" style="height: 350px;width: 100%"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'ScenarioAlert',
  data () {
    return {
      charts: '',
      scenarioName: '',
      alertDate: [],
      alertNum: [],
      option: {
        // title: {
        //   text: '场景服务告警信息统计',
        //   left: 'bottom',
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
          data: ['告警信息数量']
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
            name: '告警信息数量',
            type: 'line',
            stack: '增量',
            data: ''
          }
        ]
      }
    }
  },
  mounted () {
    this.loadAlert()
  },
  methods: {
    loadAlert () {
      this.$axios.get('http://localhost:8000/n/alert?days=10').then(resp => {
      // this.$axios.get('/notices/alert?days=10').then(resp => {
        if (resp && resp.status === 200) {
          this.deal(resp.data)
        }
      })
    },
    deal (data) {
      var alert = []
      for (var x = 0; x < data.length; x++) {
        // var obj = {}
        if (data[x]['source'] === this.scenarioName) {
          // obj.type = data[x].type
          // obj.message = data[x].message
          // obj.source = data[x].source
          // obj.created = data[x].created.slice(0, 10)
          alert.push(data[x].created.slice(0, 10))
          // alert.push(obj)
        }
      }
      var alertobj = {}
      for (var i = 1; i < alert.length; i++) {
        var item = this.alertDate[i]
        alertobj[item] = (alertobj[item] + 1) || 1
      }
      for (var key in alertobj) {
        this.alertDate.push(key)
        this.alertNum.push(alertobj[key])
      }
      this.option.xAxis.data = this.alertDate.reverse()
      this.option.series[0].data = this.alertNum.reverse()
      this.charts = echarts.init(document.getElementById('main'))
      this.charts.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
