<template>
  <el-container style="margin-top: 5px;margin-right: 5px;margin-left: 5px">
    <el-side style="width: 150px;margin-top: 20px">
      <home-side-menu></home-side-menu>
    </el-side>
    <el-main>
      <div class="dashboard-editor-container">
        <panel-group />
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="chart-wrapper">
              <line-chart />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="chart-wrapper">
              <test-chart />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import HomeSideMenu from './HomeSideMenu'
import PanelGroup from './PanelGroup'
import LineChart from './LineChart'
import TestChart from './TestChart'

export default {
  name: 'AppIndex',
  components: {TestChart, LineChart, PanelGroup, HomeSideMenu}
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: #f6f6f6;
    position: relative;
    margin: -20px 0 0 -10px;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

</style>
