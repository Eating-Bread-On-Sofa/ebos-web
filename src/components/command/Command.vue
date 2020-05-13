<template>
    <div>
      <el-row style="height: 800px;">
        <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
        <br>
        <!--新增按钮-->
        <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="createCommand()">新增
        </el-button>
        <br>
        <command-edit-form @onSubmit="loadCommands()" ref="commandEditForm"></command-edit-form>
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
import SearchBar from './SearchBar'
import CommandEditForm from './CommandEditForm'
export default {
  name: 'Command',
  components: {SearchBar, CommandEditForm},
  data () {
    return {
      currentPage: 1,
      pagesize: 18,
      tableData: [],
      loading: true
    }
  },
  mounted () {
    this.loadCommands()
  },
  methods: {
    loadCommands () {
      this.$axios
        .get('http://localhost:8000/c').then(resp => {
        // .get('/commands/').then(resp => {
          if (resp && resp.status === 200) {
            this.tableData = resp.data
            this.loading = false
          }
        })
    },
    createCommand () {
      this.$refs.commandEditForm.dialogFormVisible = true
    },
    handleDelete (index, row) {
      var _this = this
      this.$confirm('此操作将永久删除该模板，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          .delete('http://localhost:8000/c?name=' + row.name).then(resp => {
          // .delete('/commands?name=' + row.name).then(resp => {
            if (resp && resp.status === 200) {
              _this.loadCommands()
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    searchResult () {
      var _this = this
      this.$axios
        .get('http://localhost:8000/c/search?keywords=' + this.$refs.searchBar.keywords, {
        // .get('/commands/search?keywords=' + this.$refs.searchBar.keywords, {
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
