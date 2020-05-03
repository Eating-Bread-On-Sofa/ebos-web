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
import ScenarioPanel from './ScenarioPanel'
export default {
  name: 'ScenarioShow',
  components: {ScenarioPanel},
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
      this.$axios.get('/scenarios/scenario').then(resp => {
        if (resp && resp.status === 200) {
          _this.scenarioList = resp.data
        }
      }).catch(() => {
        _this.$message('加载场景列表失败！')
      })
    },
    handleScenario () {
      this.$axios.get('/scenarios/scenario/name/' + this.scenarioSelect).then(resp => {
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
            this.$axios.get('/devices/online/' + resp.data.content[x].gatewayIP).then(resp => {
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
