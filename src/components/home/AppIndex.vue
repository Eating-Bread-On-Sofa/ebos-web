<template>
  <el-container>
    <el-side style="width: 150px;margin-top: 20px">
      <home-side-menu></home-side-menu>
    </el-side>
    <el-main>
      <div class="dashboard-editor-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import HomeSideMenu from './HomeSideMenu'
import PanelGroup from './PanelGroup'

const lineChartData = {
  devices: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  gateways: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  replaces: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  }
}

export default {
  name: 'AppIndex',
  components: {PanelGroup, HomeSideMenu},
  data () {
    return {
      lineChartData: lineChartData.devices
    }
  },
  methods: {
    handleSetLineChartData (type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: #f6f6f6;
    position: relative;
    margin: -20px 0 0 -10px;
  }

</style>
