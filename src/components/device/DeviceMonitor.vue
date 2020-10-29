<template>
    <div>
      <div>
        <el-dialog
          title="请先选择网关"
          width="30%"
          :visible.sync="selectDialog">
          <el-form v-model="gwip" label-width="35%" style="text-align: left">
            <el-form-item label="选择网关">
              <el-select v-model="gwip" placeholder="请选择网关查看设备" @change="loadDevices">
                <el-option v-for="(item, i) in gwList" :key="i" :label="item.name" :value="item.ip">
                  <span style="float: left">网关名称：{{ item.name }}</span>
                  <span style="float: right;color: #551513;font-size: 13px">IP：{{ item.ip }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择设备">
              <el-select v-model="deviceIndex" placeholder="请选择设备">
                <el-option v-for="(item, i) in deviceList" :key="i" :label="item.name" :value="i"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="selectDialog = false">取消</el-button>
            <el-button type="primary" @click="handleDeviceId">确定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-row>
        <el-breadcrumb separator="/" style="margin-top: 5px;font-size: 16px;margin-left: 20px">
          <el-breadcrumb-item :to="{ path: '/index'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/deviceIndex' }">设备管理</el-breadcrumb-item>
          <el-breadcrumb-item>设备监控</el-breadcrumb-item>
          <el-breadcrumb-item>网关：{{ gwip }}</el-breadcrumb-item>
          <el-breadcrumb-item>设备：{{ deviceName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row  style="margin-top: 20px;margin-bottom: 30px;">
        <el-col :span="8">
          <div style="float: left">
            <el-button type="success" icon="el-icon-guide" >在线设备</el-button>
            <el-select v-model="deviceIndex1" placeholder="请选择设备">
              <el-option v-for="(item, i) in deviceList1" :key="i" :label="item.name" :value="i"></el-option>
            </el-select>
            <el-button type="success" @click="handleDeviceId1">确定</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="float: left">
            <el-select v-model="deviceIndex2" placeholder="请选择设备">
              <el-option v-for="(item, i) in deviceList2" :key="i" :label="item.name" :value="i"></el-option>
            </el-select>
            <el-button type="success" @click="handleDeviceId2">确定</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="float: right">
            <el-button type="success" icon="el-icon-guide">更新周期</el-button>
            <el-select v-model="interval" placeholder="请选择更新周期">
              <el-option v-for="item in intervals" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div id="detailchart1" style="width: 600px;height:600px;margin-top: 20px"></div>
        <div id="detailchart2" style="width: 600px;height:600px;margin-top: 20px"></div>
      </el-row>
    </div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
export default {
  name: 'DeviceMonitor',
  data () {
    return {
      gwList: [],
      gwip: '',
      selectDialog: false,
      deviceIndex1: '',
      deviceIndex2: '',
      deviceId: '',
      deviceName: '',
      deviceList1: [
        {name: ''}
      ],
      deviceList2: [
        {name: ''}
      ],
      time: '',
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
        series: []
      },
      dataForm: {
        type: []
      },
      len: 0
    }
  },
  mounted () {
    this.selectGw()
  },
  beforeDestroy () {
    if (this.time) {
      clearInterval(this.time)
    }
  },
  methods: {
    selectGw () {
      // 实际API
      // this.$axios.get('http://localhost:8089/api/gateway').then(resp => {
      // kong网关代理API
      this.$axios.get(localStorage.socket + '/gc').then(resp => {
      // this.$axios.get('http://localhost:8000/gc').then(resp => {
      // 开发模式下代理API
      // this.$axios.get('/gateways').then(resp => {
        if (resp && resp.status === 200) {
          this.gwList = resp.data
          this.selectDialog = true
        }
      }).catch(() => {
        this.$message.error('获取网关信息失败！')
      })
    },
    loadDevices () {
      // 实际API
      // this.$axios.get('http://localhost:8081/api/device/online/' + this.gwip).then(resp => {
      // kong网关代理API
      this.$axios.get(localStorage.socket + '/d/online/' + this.gwip).then(resp => {
      // this.$axios.get('http://localhost:8000/d/online/' + this.gwip).then(resp => {
      // 开发模式下代理API
      // this.$axios.get('/devices/online/' + this.gwip).then(resp => {
        if (resp && resp.status === 200) {
          this.deviceList = resp.data
        }
      }).catch(() => {
        this.$message.error('获取在线设备列表失败！')
      })
    },
    handleDeviceId1 () {
      if (this.time) {
        clearInterval(this.time)
      }
      // echarts.init(document.getElementById('detailchart'), 'macarons').clear()
      this.option.series = []
      this.deviceName = this.deviceList1[this.deviceIndex1].name
      this.deviceId = this.deviceList1[this.deviceIndex1].id
      this.selectDialog = false
      this.dataForm = {
        type: [],
        data1: []
      }
      this.len = 0
      echarts.init(document.getElementById('detailchart1'), 'macarons').clear()
      // this.option.series = []
      // for (let i = 0; i < this.len; i++) {
      //   let item = 'data' + (i + 1)
      //   this.dataForm[item] = []
      // }
      this.drawCharts(this.deviceId)
    },
    handleDeviceId2 () {
      if (this.time) {
        clearInterval(this.time)
      }
      // echarts.init(document.getElementById('detailchart'), 'macarons').clear()
      this.option.series = []
      this.deviceName = this.deviceList2[this.deviceIndex2].name
      this.deviceId = this.deviceList2[this.deviceIndex2].id
      this.selectDialog = false
      this.dataForm = {
        type: [],
        data1: []
      }
      this.len = 0
      echarts.init(document.getElementById('detailchart2'), 'macarons').clear()
      // this.option.series = []
      // for (let i = 0; i < this.len; i++) {
      //   let item = 'data' + (i + 1)
      //   this.dataForm[item] = []
      // }
      this.drawCharts(this.deviceId)
    },
    drawCharts (id) {
      let date1 = new Date()
      // 实际API
      // this.$axios.get('http://localhost:8081/api/details/' + this.gwip + '/' + id).then(resp => {
      // kong网关代理API
      this.$axios.get(localStorage.socket + '/d/details/' + this.gwip + '/' + id).then(resp => {
      // this.$axios.get('http://localhost:8000/d/details/' + this.gwip + '/' + id).then(resp => {
      // 开发模式下代理API
      // this.$axios.get('/devices/details/' + this.gwip + '/' + id).then(resp => {
        this.len = Object.keys(resp.data).length
        for (let i = 0; i < this.len; i++) {
          let item = 'data' + (i + 1)
          this.dataForm[item] = []
          this.option.series.push({
            name: '',
            type: 'line',
            data: [],
            connectNulls: true,
            symbol: 'emptyTriangle',
            symbolSize: 6,
            lineStyle: {
              width: 2
            }
          })
        }
        if (resp && resp.status === 200) {
          this.dataForm.type = Object.keys(resp.data)
          for (let i = 0; i < this.len; i++) {
            let item = 'data' + (i + 1)
            this.dataForm[item].push([date1, resp.data[this.dataForm.type[i]]])
          }
          // if (this.dataForm['data1'].length > 60) {
          //   for (let i = 0; i < this.len; i++) {
          //     let item = 'data' + (i + 1)
          //     this.dataForm[item].shift()
          //   }
          // }
          for (let i = 0; i < this.len; i++) {
            let item = 'data' + (i + 1)
            this.option.series[i].name = this.dataForm.type[i]
            this.option.series[i].data = this.dataForm[item]
          }
        }
        this.myChart = echarts.init(document.getElementById('detailchart'), 'macarons')
        // this.myChart.clear()
        // this.myChart.setOption(this.option)
        this.setTime(this.interval, id)
      })
      // setInterval(() => {
      //   var date = new Date()
      //   // 实际API
      //   // this.$axios.get('http://localhost:8081/api/details/' + this.gwip + '/' + id).then(resp => {
      //   // kong网关代理API
      //   this.$axios.get(localStorage.socket + '/d/details/' + this.gwip + '/' + id).then(resp => {
      //   // this.$axios.get('http://localhost:8000/d/details/' + this.gwip + '/' + id).then(resp => {
      //   // 开发模式下代理API
      //   // this.$axios.get('/devices/details/' + this.gwip + '/' + id).then(resp => {
      //     if (resp && resp.status === 200) {
      //       for (let i = 0; i < this.len; i++) {
      //         let item = 'data' + (i + 1)
      //         this.dataForm[item].push([date, resp.data[this.dataForm.type[i]]])
      //       }
      //       if (this.dataForm.data1.length > 60) {
      //         for (let i = 0; i < this.len; i++) {
      //           let item = 'data' + (i + 1)
      //           this.dataForm[item].shift()
      //         }
      //       }
      //       for (let i = 0; i < this.len; i++) {
      //         let item = 'data' + (i + 1)
      //         this.option.series[i].data = this.dataForm[item]
      //       }
      //       this.myChart.setOption(this.option)
      //       console.log(this.interval)
      //     }
      //   })
      // }, this.interval)
    },
    setTime (time, id) {
      this.time = setInterval(() => {
        let date = new Date()
        // 实际API
        // this.$axios.get('http://localhost:8081/api/details/' + this.gwip + '/' + id).then(resp => {
        // kong网关代理API
        this.$axios.get(localStorage.socket + '/d/details/' + this.gwip + '/' + id).then(resp => {
          // this.$axios.get('http://localhost:8000/d/details/' + this.gwip + '/' + id).then(resp => {
          // 开发模式下代理API
          // this.$axios.get('/devices/details/' + this.gwip + '/' + id).then(resp => {
          if (resp && resp.status === 200) {
            for (let i = 0; i < this.len; i++) {
              let item = 'data' + (i + 1)
              this.dataForm[item].push([date, resp.data[this.dataForm.type[i]]])
            }
            if (this.dataForm['data1'].length > 60) {
              for (let i = 0; i < this.len; i++) {
                let item = 'data' + (i + 1)
                this.dataForm[item].shift()
              }
            }
            for (let i = 0; i < this.len; i++) {
              let item = 'data' + (i + 1)
              this.option.series[i].data = this.dataForm[item]
            }
            this.myChart.setOption(this.option)
          }
        })
      }, time)
    },
    clear () {
      this.dialogFormVisible = false
    }
  },
  watch: {
    interval: function (newValue, oldValue) {
      clearInterval(this.time)
      this.setTime(newValue, this.deviceId)
    }
  }
}
</script>

<style scoped>

</style>
