<template>
    <div>
      <el-row>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>网关管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row style="height: 800px;">
        <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
        <br>
        <!--新增按钮-->
        <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="createDialog = true">新增
        </el-button>
        <div>
          <el-dialog
            title="新增网关信息"
            :visible.sync="createDialog"
            width="30%"
            @close="clear">
            <el-form v-model="gwForm" label-width="120px" style="text-align: left">
              <el-form-item label="网关名称" prop="name">
                <el-input v-model="gwForm.name" autocomplete="off" placeholder="请输入网关名称"></el-input>
              </el-form-item>
              <el-form-item label="网关IP地址" prop="ip">
                <el-input v-model="gwForm.ip" autocomplete="off" placeholder="请输入网关IP地址"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="createDialog = false">取消</el-button>
              <el-button type="primary" @click.once="createOnSubmit">确定</el-button>
            </div>
          </el-dialog>
        </div>
        <div>
          <el-dialog
            title="修改网关IP地址"
            :visible.sync="editDialog"
            width="30%"
            @close="clear">
            <el-form v-model="gwForm" label-width="120px" style="text-align: left">
              <el-form-item label="网关名称" prop="name">
                <el-input v-model="gwForm.name" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="网关IP地址" prop="ip">
                <el-input v-model="gwForm.ip" autocomplete="off" placeholder="请输入新的IP地址"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editDialog = false">取消</el-button>
              <el-button type="primary" @click="editOnSubmit">确定</el-button>
            </div>
          </el-dialog>
        </div>
        <div>
          <el-dialog
            title="网关恢复"
            width="30%"
            :visible.sync="recoverDialog"
            @close="clear">
            <el-form v-model="gwRecoverForm" label-width="120px" style="text-align: left">
              <el-form-item label="网关名称" prop="name">
                <el-input v-model="gwRecoverForm.name" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="网关IP地址" prop="ip">
                <el-input v-model="gwRecoverForm.ip" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="选择版本">
                <el-select v-model="gwRecoverForm.version">
                  <el-option v-for="item in versionList" :key="item.version" :label="item.version" :value="item.version"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="恢复项：">
                <el-switch v-model="gwRecoverForm.command" inactive-text="指令" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
                <el-switch v-model="gwRecoverForm.deviceprofile" inactive-text="设备模板" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
                <el-switch v-model="gwRecoverForm.deviceservice" inactive-text="设备服务" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
                <el-switch v-model="gwRecoverForm.export" inactive-text="导出层" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
                <el-switch v-model="isDisplay" inactive-text="设备" active-color="#13ce66" inactive-color="#ff4949" active-value="inline" inactive-value="none"></el-switch>
              </el-form-item>
              <el-form-item label="设备管理ip" prop="device" :style="{display: isDisplay}">
                <el-input v-model="gwRecoverForm.deviceIp" autocomplete="off" placeholder="请输入需恢复的设备管理服务器IP"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="recoverDialog = false">取消</el-button>
              <el-button type="primary" @click="recoverOnSubmit">确定</el-button>
            </div>
          </el-dialog>
        </div>
        <br>
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
import SearchBar from './SearchBar'
import GatewayState from './GatewayState'
export default {
  name: 'Gateway',
  components: {GatewayState, SearchBar},
  data () {
    return {
      currentPage: 1,
      pagesize: 18,
      tableData: [],
      gwForm: {
        name: '',
        ip: ''
      },
      createDialog: false,
      editDialog: false,
      recoverDialog: false,
      versionList: [],
      gwRecoverForm: {
        name: '',
        ip: '',
        version: '',
        command: '0',
        deviceIp: '0',
        deviceprofile: '0',
        deviceservice: '0',
        export: '0'
      },
      isDisplay: 'none',
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
      const _this = this
      this.$axios
        // .get('http://localhost:8089/api/gateway').then(resp => {
        .get('http://localhost:8000/gc').then(resp => {
        // .get('/gc').then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
            _this.loading = false
          }
        })
    },
    clear () {
      this.gwForm = {
        name: '',
        ip: ''
      }
    },
    recoverClear () {
      this.versionList = []
      this.gwRecoverForm = {
        name: '',
        ip: '',
        version: '',
        command: '0',
        deviceIp: '0',
        deviceprofile: '0',
        deviceservice: '0',
        export: '0'
      }
      this.isDisplay = 'none'
    },
    createOnSubmit () {
      const _this = this
      this.$axios
      // .post('http://localhost:8089/api/gateway', {
        .post('http://localhost:8000/gc', {
          // .post('/gc', {
          name: _this.gwForm.name,
          ip: _this.gwForm.ip
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.loadGateways()
            _this.$message('添加网关信息成功！')
            _this.createDialog = false
          }
        }).catch(e => {
          this.$message('添加失败' + e)
        })
    },
    editOnSubmit () {
      const _this = this
      this.$axios
        .put('http://localhost:8000/gc', {
          // .put('/gc', {
          name: _this.gwForm.name,
          ip: _this.gwForm.ip
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.editDialog = false
            _this.$message('修改网关信息成功！')
            _this.loadGateways()
          }
        }).catch(e => {
          _this.$message('修改失败' + e)
        })
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
      this.editDialog = true
      this.gwForm.name = row.name
    },
    handleBackup (index, tablerow) {
      this.$axios
        // .post('http://localhost:8089/api/gateway/copy/' + tablerow.ip, {
        .post('http://localhost:8000/gc/copy/' + tablerow.ip, {
        // .post('/gc/copy/' + tablerow.ip, {
          command: '1',
          device: '1',
          deviceprofile: '1',
          deviceservice: '1',
          export: '1'
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message('备份成功！')
          }
        }).catch(() => {
          this.$message('备份失败！')
        })
    },
    handleRecover (index, row) {
      this.$axios.get('http://localhost:8000/gc/version/' + row.ip).then(resp => {
      // this.$axios.get('/gc/version/' + row.ip).then(resp => {
        if (resp && resp.status === 200) {
          this.versionList = resp.data
          this.recoverDialog = true
          this.gwRecoverForm.name = row.name
          this.gwRecoverForm.ip = row.ip
        }
      }).catch(() => {
        this.$message('获取版本信息失败！')
      })
    },
    recoverOnSubmit () {
      const _this = this
      this.$axios
        .post('http://localhost:8000/gc/recover/ip/' + _this.gwRecoverForm.ip + '/version/' + _this.gwRecoverForm.version, {
          // .post('/gc/recover/ip' + _this.gwRecoverForm.ip + '/version/' + _this.gwRecoverForm.version, {
          command: _this.gwRecoverForm.command,
          device: {
            deviceIp: _this.gwRecoverForm.deviceIp
          },
          deviceprofile: _this.gwRecoverForm.deviceprofile,
          deviceservice: _this.gwRecoverForm.deviceservice,
          export: _this.gwRecoverForm.export
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.recoverDialog = false
            _this.$message('恢复成功')
            _this.recoverClear()
          }
        }).catch(e => {
          _this.$message('恢复失败' + e)
        })
    },
    handleDelete (index, tablerow) {
      const _this = this
      this.$confirm('此操作将永久删除该模板，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          // .delete('http://localhost:8089/api/gateway/' + tablerow.name).then(resp => {
          .delete('http://localhost:8000/gc' + tablerow.name).then(resp => {
          // .delete('/gc/' + tablerow.name).then(resp => {
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
      const _this = this
      this.$axios
        .get('http://localhost:8000/gc/search?keywords=' + this.$refs.searchBar.keywords, {
        // .get('/gateways/search?keywords=' + this.$refs.searchBar.keywords, {
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
