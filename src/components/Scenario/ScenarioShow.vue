<template>
  <el-container>
    <el-header>
      <el-form style="float: left;text-align: left">
        <el-form-item label="场景选择：">
          <el-select v-model="scenarioSelect" @change="handleScenario">
            <el-option v-for="item in scenarioList" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <div class="dashboard-editor-container">
        <scenario-panel ref="scenarioPanel" />
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="chart-wrapper">
              <scenario-alert ref="scenarioAlert" />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import ScenarioPanel from './ScenarioPanel'
import ScenarioAlert from './ScenarioAlert'
export default {
  name: 'ScenarioShow',
  components: {ScenarioAlert, ScenarioPanel},
  data () {
    return {
      scenarioList: [],
      scenarioSelect: ''
    }
  },
  mounted () {
    this.loadScenarios()
  },
  methods: {
    loadScenarios () {
      var _this = this
      this.$axios.get('http://localhost:8000/s').then(resp => {
      // this.$axios.get('/s').then(resp => {
        if (resp && resp.status === 200) {
          _this.scenarioList = resp.data
        }
      }).catch(() => {
        _this.$message('加载场景列表失败！')
      })
    },
    handleScenario () {
      this.$refs.scenarioAlert.scenarioName = this.scenarioSelect
      this.$axios.get('http://localhost:8000/s/name/' + this.scenarioSelect).then(resp => {
      // this.$axios.get('/s/name/' + this.scenarioSelect).then(resp => {
        if (resp && resp.status === 200) {
          this.$refs.scenarioPanel.gatewayNum = resp.data.content.length
          var Num = 0
          var deviceNum = []
          var deviceOnline = []
          for (var x = 0; x < resp.data.content.length; x++) {
            Num += resp.data.content[x].commands.length
            for (var i = 0; i < resp.data.content[x].commands.length; i++) {
              if (deviceNum.indexOf(resp.data.content[x].commands[i].deviceName) === -1) {
                deviceNum.push(resp.data.content[x].commands[i].deviceName)
              }
            }
            this.$axios.get('http://localhost:8000/d/online/' + resp.data.content[x].gatewayIP).then(resp => {
            // this.$axios.get('/d/online/' + resp.data.content[x].gatewayIP).then(resp => {
              if (resp && resp.status === 200) {
                deviceOnline.concat(resp.data)
              }
            })
          }
          this.$refs.scenarioPanel.commandNum = Num
          this.$refs.scenarioPanel.deviceTotalNum = deviceNum.length
          this.$refs.scenarioPanel.deviceOnlineNum = deviceOnline.length
        }
      })
    },
    clear () {}
  }
}
</script>

<style scoped>

</style>
