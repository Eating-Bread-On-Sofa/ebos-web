<template>
  <div>
    <el-row style="height: 800px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <br>
      <!--新增按钮-->
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="createDeviceService()">新增
      </el-button>
      <br>
      <device-service-edit @onSubmit="loadDeviceServices()" ref="deviceServiceEdit"></device-service-edit>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
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
          label="设备服务名称">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="对应设备名称">
        </el-table-column>
        <el-table-column
          prop="commandType"
          label="命令类型">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
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
import DeviceServiceEdit from './DeviceServiceEdit'
export default {
  name: 'DeviceService',
  components: {DeviceServiceEdit, SearchBar},
  data () {
    return {
      currentPage: 1,
      pagesize: 18,
      tableData: [
        { id: '0',
          name: '温湿度监测',
          deviceName: '温湿度传感器',
          commandType: 'get',
          description: '检测温湿度传感器数据'
        },
        { id: '1',
          name: '温湿度传感器告警',
          deviceName: '温湿度传感器',
          commandType: 'post',
          description: '发出告警信息'
        }
      ],
      multipleSelection: []
    }
  },
  // mounted: function () {
  //   this.loadDeviceServices()
  // },
  methods: {
    loadDeviceServices () {
      var _this = this
      this.$axios
        .get('8082/api/command/list').then(resp => {
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
    createDeviceService () {
      this.$refs.deviceServiceEdit.dialogFormVisible = true
    },
    handleEdit (index, row) {
      this.$refs.deviceServiceEdit.dialogFormVisible = true
      this.$refs.deviceServiceEdit.form = {
        id: row.id,
        name: row.name,
        deviceName: row.deviceName,
        description: row.description,
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
