<template>
    <div>
      <el-row>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/deviceIndex' }">设备管理</el-breadcrumb-item>
          <el-breadcrumb-item>设备监控</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row style="margin-top: 100px">
        <el-form v-model="deviceId" style="text-align: left;float: left">
          <el-form-item label="设备选择">
            <el-select v-model="deviceId" placeholder="请选择设备" @change="handleDeviceId">
              <el-option v-for="item in deviceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form v-model="interval" style="text-align: left;float: right;">
          <el-form-item label="更新周期">
            <el-select v-model="interval" placeholder="请选择更新周期">
              <el-option v-for="item in intervals" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <div id="detailchart" style="width: 1200px;height:600px;margin-top: 20px"></div>
      </el-row>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'DeviceMonitor',
  data () {
    return {
      dialogFormVisible: false,
      deviceId: '',
      deviceList: [],
      interval: 1000,
      intervals: [
        {label: '1秒', value: 1000},
        {label: '3秒', value: 3000},
        {label: '5秒', value: 5000},
        {label: '10秒', value: 10000},
        {label: '20秒', value: 20000},
        {label: '30秒', value: 30000}
      ],
      myChart: '',
      option: {
        title: {
          text: '设备监控情况',
          left: 80,
          textStyle: {
            fontSize: 22
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'time',
          name: '时间'
        },
        yAxis: {},
        legend: {
          left: 200,
          bottom: 0,
          itemHeight: 28,
          itemWidth: 70
        },
        series: [
          {
            name: '',
            type: 'line',
            data: [],
            symbol: 'emptyTriangle',
            symbolSize: 6,
            lineStyle: {
              width: 2
            }
          },
          {
            name: '',
            type: 'line',
            data: [],
            symbol: 'emptyCircle',
            symbolSize: 6,
            lineStyle: {
              width: 2
            }
          }
        ]
      },
      dataForm: {
        type: [],
        data1: [],
        data2: []
      }
    }
  },
  mounted () {
    this.loadDevices()
    // setInterval(() => {
    //   this.$
    // })
  },
  methods: {
    loadDevices () {
      // this.$axios.get('http://localhost:8081/api/device/online/127.0.0.1').then(resp => {
      this.$axios.get('http://localhost:8000/d/online/127.0.0.1').then(resp => {
      // this.$axios.get('/d/online/127.0.0.1').then(resp => {
        if (resp && resp.status === 200) {
          this.deviceList = resp.data
        }
      }).catch(() => {
        this.$message('获取在线设备列表失败！')
      })
    },
    handleDeviceId () {
      this.dataForm.type = []
      this.dataForm.data1 = []
      this.dataForm.data2 = []
      this.drawCharts(this.deviceId)
    },
    drawCharts (id) {
      var date = new Date()
      // this.dataForm.type = []
      // this.dataForm.data1 = []
      // this.dataForm.data2 = []
      // this.$axios.get('http://localhost:8081/api/details/127.0.0.1/' + id).then(resp => {
      this.$axios.get('http://localhost:8000/d/details/127.0.0.1/' + id).then(resp => {
      // this.$axios.get('/d/details/127.0.0.1/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.dataForm.type = Object.keys(resp.data)
          this.dataForm.data1.push([date, resp.data[this.dataForm.type[0]]])
          this.dataForm.data2.push([date, resp.data[this.dataForm.type[1]]])
          if (this.dataForm.data1.length > 60) {
            this.dataForm.data1.shift()
            this.dataForm.data2.shift()
          }
          this.option.series[0].name = this.dataForm.type[0]
          this.option.series[0].data = this.dataForm.data1
          this.option.series[1].name = this.dataForm.type[1]
          this.option.series[1].data = this.dataForm.data2
        }
        this.myChart = echarts.init(document.getElementById('detailchart'))
        this.myChart.setOption(this.option)
      })
      setInterval(() => {
        var date = new Date()
        // this.$axios.get('http://localhost:8081/api/details/127.0.0.1/' + id).then(resp => {
        this.$axios.get('http://localhost:8000/d/details/127.0.0.1/' + id).then(resp => {
        // this.$axios.get('/d/details/127.0.0.1/' + id).then(resp => {
          if (resp && resp.status === 200) {
            this.dataForm.data1.push([date, resp.data[this.dataForm.type[0]]])
            this.dataForm.data2.push([date, resp.data[this.dataForm.type[1]]])
            if (this.dataForm.data1.length > 60) {
              this.dataForm.data1.shift()
              this.dataForm.data2.shift()
            }
            this.option.series[0].data = this.dataForm.data1
            this.option.series[1].data = this.dataForm.data2
            this.myChart.setOption(this.option)
          }
        })
      }, this.interval)
    },
    testdrawCharts () {
      let chart = this.$refs.detailChart
      let myChart = echarts.init(chart)
      myChart.setOption({
        title: {
          text: '设备监控情况',
          left: 80,
          textStyle: {
            fontSize: 22
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'time',
          name: '时间'
        },
        yAxis: {},
        legend: {
          left: 200,
          bottom: 0,
          itemHeight: 28,
          itemWidth: 70
        },
        series: [
          {
            name: this.dataForm.type[0],
            type: 'line',
            data: this.dataForm.data1,
            symbol: 'emptyTriangle',
            symbolSize: 6,
            lineStyle: {
              width: 2
            }
          },
          {
            name: this.dataForm.type[1],
            type: 'line',
            data: this.dataForm.data2,
            symbol: 'emptyCircle',
            symbolSize: 6,
            lineStyle: {
              width: 2
            }
          }
        ]
      })
    },
    clear () {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
