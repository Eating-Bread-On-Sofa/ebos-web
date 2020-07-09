<template>
    <div>
      <el-row>
        <el-breadcrumb separator="/" style="margin-top: 5px;font-size: 16px;margin-left: 20px">
          <el-breadcrumb-item :to="{ path: '/index'}"><i class="el-icon-s-home" />首页</el-breadcrumb-item>
          <el-breadcrumb-item>指令管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row>
        <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
        <br>
        <!--新增按钮-->
        <el-button type="success" icon="el-icon-circle-plus-outline" size="mini"  style="float: right;margin-bottom: 5px;margin-right: 20px" @click="createDialog = true">新增
        </el-button>
        <br>
        <command-edit-form ref="CommandEditForm" :createDialog="createDialog" @hideDialog="createDialog = false" @onSubmit="loadCommands()"></command-edit-form>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          stripe
          style="width: 100%;">
          <el-table-column
            type="index"
            width="50"
            label="序号">
          </el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="指令ID" prop="commandId"></el-table-column>
          <el-table-column label="指令名称" prop="commandName"></el-table-column>
          <el-table-column label="指令类型" prop="commandType"></el-table-column>
          <el-table-column label="设备ID" prop="deviceId"></el-table-column>
          <el-table-column label="设备名称" prop="deviceName"></el-table-column>
          <el-table-column label="指令等级" prop="level"></el-table-column>
          <el-table-column label="描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
<!--              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import SearchBar from '../common/SearchBar'
import CommandEditForm from './CommandEditForm'
export default {
  name: 'Command',
  components: {SearchBar, CommandEditForm},
  data () {
    return {
      currentPage: 1,
      pagesize: 18,
      tableData: [],
      createDialog: false,
      loading: true
    }
  },
  mounted () {
    this.loadCommands()
  },
  methods: {
    loadCommands () {
      this.$axios
        // 实际API
        // .get('http://localhost:8082/api/command').then(resp => {
        // kong网关代理API
        // .get('http://localhost:8000/c').then(resp => {
        // 开发模式下代理API
        .get('/commands').then(resp => {
          if (resp && resp.status === 200) {
            this.tableData = resp.data
            this.loading = false
          }
        }).catch(() => {
          this.$message.error('获取指令信息失败！')
        })
    },
    handleDelete (index, row) {
      var _this = this
      this.$confirm('此操作将永久删除该模板，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          // 实际API
          // .delete('http://localhost:8000/c?name=' + row.name).then(resp => {
          // kong网关代理API
          .delete('/c?name=' + row.name).then(resp => {
          // 开发模式下代理API
          // .delete('/commands?name=' + row.name).then(resp => {
            if (resp && resp.status === 200) {
              _this.loadCommands()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '删除操作已取消!'
        })
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    searchResult (e) {
      let _this = this
      this.$axios
        .get('http://localhost:8000/c/search?keywords=' + e, {
        // .get('/commands/search?keywords=' + e, {
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
          }
        }).catch(() => {
          this.$message.error('搜索失败！')
        })
    }
  }
}
</script>

<style scoped>

</style>
