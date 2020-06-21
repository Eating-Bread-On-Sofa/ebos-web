<template>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('devices')">
          <div class="card-panel-icon-wrapper icon-device">
            <i class="el-icon-s-platform" style="font-size: 40px"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日设备数量增加：
            </div>
            <count-to :start-val="0" :end-val="deviceCount" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('gateways')">
          <div class="card-panel-icon-wrapper icon-gateway">
            <i class="el-icon-s-management" style="font-size: 40px"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日网关数量增加：
            </div>
            <count-to :start-val="0" :end-val="gatewayCount" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('replaces')">
          <div class="card-panel-icon-wrapper icon-replace">
            <i class="el-icon-s-operation" style="font-size: 40px"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              需要更换的设备：
            </div>
            <count-to :start-val="0" :end-val="0" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('replaces')">
          <div class="card-panel-icon-wrapper icon-replace">
            <i class="el-icon-warning" style="font-size: 40px"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              未运行为微服务数：
            </div>
            <count-to :start-val="0" :end-val="offlineCount" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'PanelGroup',
  components: {CountTo},
  data () {
    return {
      deviceCount: 0,
      gatewayCount: 0,
      microService: [],
      offlineCount: 0
    }
  },
  mounted () {
    this.getDeviceCount()
    this.getGatewayCount()
    this.getGatewayState()
  },
  methods: {
    getDeviceCount () {
      // 实际API
      // this.$axios.get('http://localhost:8081/api/device/days?days=1').then(resp => {
      // kong网关代理API
      // this.$axios.get('http://localhost:8000/d/days?days=1').then(resp => {
      // 开发模式下代理API
      this.$axios.get('/devices/days?days=1').then(resp => {
        if (resp && resp.status === 200) {
          this.deviceCount = resp.data[0].count
        }
      }).catch(() => {
        this.$message.error('获取设备新增信息失败！')
      })
    },
    getGatewayCount () {
      // 实际API
      // this.$axios.get('http://localhost:8089/api/gateway/days?days=1').then(resp => {
      // kong网关代理API
      // this.$axios.get('http://localhost:8000/gc/days?days=1').then(resp => {
      // 开发模式下代理API
      this.$axios.get('/gateways/days?days=1').then(resp => {
        if (resp && resp.status === 200) {
          this.gatewayCount = resp.data[0].count
        }
      }).catch(() => {
        this.$message.error('获取网关新增信息失败！')
      })
    },
    getGatewayState () {
      // 实际API
      // this.$axios.get('http://localhost:8089/api/gateway/state').then(resp => {
      // kong网关代理API
      // this.$axios.get('http://localhost:8000/gc/state').then(resp => {
      // 开发模式下代理API
      this.$axios.get('/gateways/state').then(resp => {
        if (resp && resp.status === 200) {
          this.microService = resp.data
          for (var i in resp.data) {
            for (var key in resp.data[i]['state']) {
              if (!resp.data[i]['state'][key]) {
                this.offlineCount += 1
              }
            }
          }
        }
      })
    },
    handleSetLineChartData (type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-device {
        background: #40c9c6;
      }
      .icon-gateway {
        background: #36a3f7;
      }
      .icon-replace {
        background: #f4516c;
      }
    }
    .icon-device {
      color: #40c9c6;
    }
    .icon-gateway {
      color: #36a3f7;
    }
    .icon-replace {
      color: #f4516c;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, .45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
