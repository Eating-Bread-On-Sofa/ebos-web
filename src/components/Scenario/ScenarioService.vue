<template>
  <div>
    <el-row style="height: 800px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <br>
      <!--新增按钮-->
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="createScenario()">新增
      </el-button>
      <br>
      <scenario-edit-form @onSubmit="loadScenarios()" ref="scenarioEditForm"></scenario-edit-form>
      <scenario-device-state ref="scenarioDeviceState"></scenario-device-state>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        border
        style="width: 100%;">
        <el-table-column
          prop="name"
          label="服务名称">
        </el-table-column>
        <el-table-column
          label="网关名称">
          <template slot-scope="scope">
            <table width="100%">
              <tr v-for="item in scope.row.content" :key="item.index">{{ item.gatewayName }}</tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column
          label="网关IP">
          <template slot-scope="scope">
            <table width="100%">
              <tr v-for="item in scope.row.content" :key="item.index">{{ item.gatewayIP }}</tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column
          label="设备列表">
          <template slot-scope="scope">
            <table width="100%">
              <tr v-for="item in scope.row.content" :key="item.index">
                <table width="100%">
                  <tr v-for="subitem in item.commands" :key="subitem.index">{{ subitem.deviceName }}</tr>
                </table>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column
          label="指令列表">
          <template slot-scope="scope">
            <table width="100%">
              <tr v-for="item in scope.row.content" :key="item.index">
                <table width="100%">
                  <tr v-for="subitem in item.commands" :key="subitem.index">{{ subitem.commandName }}</tr>
                </table>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleState(scope.$index, scope.row)">查看设备状态</el-button>
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="success"-->
<!--              @click="handleStatus(scope.$index, scope.row)">启用/禁用</el-button>-->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="tableData.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import SearchBar from './SearchBar'
import ScenarioEditForm from './ScenarioEditForm'
import ScenarioDeviceState from './ScenarioDeviceState'
export default {
  name: 'ScenarioServcie',
  components: {ScenarioDeviceState, ScenarioEditForm, SearchBar},
  data () {
    return {
      currentPage: 1,
      pagesize: 18,
      tableData: [
        // {
        //   name: 'scenario1',
        //   content: [
        //     {
        //       gatewayName: 'gw1',
        //       gatewayIP: '127.0.0.1',
        //       commands: [
        //         {
        //           deviceName: 'Random-Integer-Generator01',
        //           commandName: 'GenerateRandomValue_Int8'
        //         },
        //         {
        //           deviceName: 'Random-Integer-Generator01',
        //           commandName: 'GenerateRandomValue_Int32'
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   name: 'scenario2',
        //   content: [
        //     {
        //       gatewayName: 'gw1',
        //       gatewayIP: '127.0.0.1',
        //       commands: [
        //         {
        //           deviceName: 'Random-Integer-Generator01',
        //           commandName: 'GenerateRandomValue_Int8'
        //         },
        //         {
        //           deviceName: 'Random-Integer-Generator01',
        //           commandName: 'GenerateRandomValue_Int32'
        //         }
        //       ]
        //     },
        //     {
        //       gatewayName: 'gw2',
        //       gatewayIP: 'localhost',
        //       commands: [
        //         {
        //           deviceName: 'Random-Integer-Generator01',
        //           commandName: 'GenerateRandomValue_Int16'
        //         }
        //       ]
        //     }
        //   ]
        // }
      ]
    }
  },
  mounted: function () {
    this.loadScenarios()
  },
  methods: {
    loadScenarios () {
      var _this = this
      this.$axios
        .get('/scenarios/scenario').then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
          }
        })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    createScenario () {
      this.$refs.scenarioEditForm.dialogFormVisible = true
    },
    // handleEdit (index, row) {
    //   this.$refs.scenarioEditForm.dialogFormVisible = true
    //   this.$refs.scenarioEditForm.form = {
    //     id: row.id,
    //     name: row.name,
    //     deviceName: row.deviceName,
    //     commandName: row.commandName,
    //     commandType: row.commandType
    //   }
    // },
    handleState (index, tablerow) {
      this.$refs.scenarioDeviceState.scenarioName = tablerow.name
      this.$refs.scenarioDeviceState.dialogFormVisible = true
    },
    handleDelete (index, tablerow) {
      this.$confirm('此操作将永久删除该模板，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          .delete('/scenarios/scenario/name/' + tablerow.name, {
          }).then(resp => {
            if (resp && resp === 200) {
              this.loadScenarios()
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    searchResult () {
      var _this = this
      this.$axios
        .get('/scenarios/scenario/search?keywords=' + this.$refs.searchBar.keywords, {
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
