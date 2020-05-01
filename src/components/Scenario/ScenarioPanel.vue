<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-device">
          <i class="el-icon-s-platform" style="font-size: 50px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            场景网关数量：
          </div>
          <count-to :start-val="0" :end-val="gatewayNum" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-gateway">
          <i class="el-icon-s-management" style="font-size: 50px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            场景设备总数量：
          </div>
          <count-to :start-val="0" :end-val="deviceTotalNum" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-replace">
          <i class="el-icon-s-operation" style="font-size: 50px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            在线设备数量：
          </div>
          <count-to :start-val="0" :end-val="deviceOnlineNum" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-replace">
          <i class="el-icon-warning" style="font-size: 50px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            设备服务数量：
          </div>
          <count-to :start-val="0" :end-val="commandNum" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'ScenarioPanel',
  components: {CountTo},
  data () {
    return {
      scenarioName: '',
      gatewayNum: 0,
      deviceTotalNum: 0,
      deviceOnlineNum: 0,
      commandNum: 0
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
