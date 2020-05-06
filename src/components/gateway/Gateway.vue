<template>
    <div>
      <el-row style="height: 800px;">
        <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
        <br>
        <!--新增按钮-->
        <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="createGateway()">新增
        </el-button>
        <br>
        <gateway-edit-form @onSubmit="loadGateways()" ref="gatewayEditForm"></gateway-edit-form>
        <gateway-ip-edit @onEdit="loadGateways()" ref="gatewayIpEdit"></gateway-ip-edit>
        <gateway-recover @onRecover="loadGateways()" ref="gatewayRecover"></gateway-recover>
        <gateway-state ref="gatewayState"></gateway-state>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          stripe
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="index"
            width="250px"
          label="序号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="网关名称">
          </el-table-column>
          <el-table-column
            prop="ip"
            label="IP地址">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleState(scope.$index, scope.row)">查询网关状态</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.$index, scope.row)">修改IP</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleBackup(scope.$index, scope.row)">备份</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handleRecover(scope.$index, scope.row)">恢复</el-button>
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
import GatewayEditForm from './GatewayEditForm'
import SearchBar from './SearchBar'
import GatewayIpEdit from './GatewayIpEdit'
import GatewayRecover from './GatewayRecover'
import GatewayState from './GatewayState'
export default {
  name: 'Gateway',
  components: {GatewayState, GatewayRecover, GatewayIpEdit, GatewayEditForm, SearchBar},
  data () {
    return {
      currentPage: 1,
      pagesize: 18,
      tableData: [],
      multipleSelection: [],
      loading: true,
      gwState: {
        counter: 0,
        edgexCounter: 0,
        edgexOnline: 0,
        serviceCounter: 0,
        serviceOnline: 0
      },
      edgexOffline: [],
      serviceOffline: []
    }
  },
  mounted () {
    this.loadGateways()
  },
  methods: {
    loadGateways () {
      var _this = this
      this.$axios
        .get('/gateways/').then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
            _this.loading = false
          }
        })
    },
    createGateway () {
      this.$refs.gatewayEditForm.dialogFormVisible = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    handleState (index, row) {
      this.$refs.gatewayState.gwState.name = row.name
      this.$refs.gatewayState.gwState.ip = row.ip
      this.$refs.gatewayState.dialogFormVisible = true
    },
    handleEdit (index, row) {
      this.$refs.gatewayIpEdit.dialogFormVisible = true
      this.$refs.gatewayIpEdit.gwIpForm = row
    },
    handleBackup (index, tablerow) {
      this.$axios
        .post('/gateways/copy/' + tablerow.ip, {
          command: '1',
          device: '1',
          deviceprofile: '1',
          deviceservice: '1',
          export: '1'
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message('备份成功！')
          }
        }).catch(e => {
          this.$message('备份失败！')
        })
    },
    handleRecover (index, row) {
      this.$axios.get('/gateways/version/' + row.ip).then(resp => {
        if (resp && resp.status === 200) {
          this.$refs.gatewayRecover.versionList = resp.data
          this.$refs.gatewayRecover.dialogFormVisible = true
          this.$refs.gatewayRecover.gwRecoverForm.name = row.name
          this.$refs.gatewayRecover.gwRecoverForm.ip = row.ip
        }
      }).catch(() => {
        this.$message('获取版本信息失败！')
      })
    },
    handleDelete (index, tablerow) {
      var _this = this
      this.$confirm('此操作将永久删除该模板，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          .delete('/gateways/' + tablerow.name).then(resp => {
            if (resp && resp.status === 200) {
              _this.loadGateways()
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
        .get('/gateways/search?keywords=' + this.$refs.searchBar.keywords, {
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
