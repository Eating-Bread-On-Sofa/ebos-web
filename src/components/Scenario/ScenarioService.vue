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
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="name"
          label="服务名称">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="对应设备名称">
        </el-table-column>
        <el-table-column
          prop="commandName"
          label="对应命令名称">
        </el-table-column>
        <el-table-column
          prop="commandType"
          label="命令类型">
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleStatus(scope.$index, scope.row)">启用/禁用</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">废除</el-button>
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
export default {
  name: 'ScenarioServcie',
  components: {ScenarioEditForm, SearchBar},
  data () {
    return {
      currentPage: 1,
      pagesize: 18,
      tableData: [
        { id: '0',
          name: '温湿度监测',
          deviceName: '温湿度传感器',
          commandName: '设备开关',
          commandType: 'on'
        },
        { id: '1',
          name: '温湿度传感器告警',
          deviceName: '温湿度传感器',
          commandName: '设备告警',
          commandType: 'off'
        }
      ],
      multipleSelection: []
    }
  },
  // mounted: function () {
  //   this.loadProfiles()
  // },
  methods: {
    loadScenarios () {
      var _this = this
      this.$axios
        .get('8082/api/command').then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
          }
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    createScenario () {
      this.$refs.scenarioEditForm.dialogFormVisible = true
    },
    handleEdit (index, row) {
      this.$refs.scenarioEditForm.dialogFormVisible = true
      this.$refs.scenarioEditForm.form = {
        id: row.id,
        name: row.name,
        deviceName: row.deviceName,
        commandName: row.commandName,
        commandType: row.commandType
      }
    },
    handleStatus (ind, tablerow) {
      if (tablerow.status === 'on') {
        tablerow.status = 'off'
      } else {
        tablerow.status = 'on'
      }
    },
    handleDelete (index, tablerow) {
      this.$confirm('此操作将永久删除该模板，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          .get('8082/api/command/delete?id=' + tablerow.id, {
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
        .get('8082/api/search?keywords=' + this.$refs.searchBar.keywords, {
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
