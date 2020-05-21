<template>
  <div id="MessageRouting">
    <el-row style="height: 800px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <br>
      <!--新增按钮-->
      <el-col :span="1" class="grid" style="float: right">
        <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round @click="createMQRouter">新增</el-button>
      </el-col>
      <br>
      <message-routing-edit-form @onSubmit="loadMessageRouting" ref="messageRoutingEditForm"></message-routing-edit-form>
      <!--表格数据及操作-->
      <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.3)"
                stripe ref="multipleTable" tooltip-effect="dark">
        <!--勾选框-->
  <!--      <el-table-column type="selection" width="55">-->
  <!--      </el-table-column>-->
        <!--序号-->
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <!--表头-->
        <el-table-column prop="name" label="消息路由名称"></el-table-column>
        <el-table-column prop="incomingQueue" label="消息来源"></el-table-column>
        <el-table-column prop="outgoingQueue" label="消息去向"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页条-->
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="table.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import MessageRoutingEditForm from './MessageRoutingEditForm'
import SearchBar from './SearchBar'
export default {
  name: 'MessageRouting',
  components: {SearchBar, MessageRoutingEditForm},
  data () {
    return {
      table: [],
      pagesize: 18,
      currentPage: 1,
      loading: true
    }
  },
  mounted () {
    this.loadMessageRouting()
  },
  methods: {
    loadMessageRouting () {
      this.$axios
        .get('http://localhost:8000/mqr').then(resp => {
        // .get('/mqr').then(resp => {
          if (resp && resp.status === 200) {
            this.table = resp.data
            this.loading = false
          }
        }).catch(e => {
          this.$message('加载失败!' + e)
        })
    },
    createMQRouter () {
      this.$refs.messageRoutingEditForm.dialogFormVisible = true
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该路由，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          .delete('http://localhost:8000/mqr', {
          // .delete('/mqr', {
            name: row.name,
            incomingQueue: row.incomingQueue,
            outgoingQueue: row.outcomingQueue,
            createTime: row.createTime
          }).then(resp => {
            if (resp && resp.status === 200) {
              this.loadMessageRouting()
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
        .get('http://localhost:8000/mqr/search?keywords=' + this.$refs.searchBar.keywords).then(resp => {
        // .get('/mqr/search?keywords=' + this.$refs.searchBar.keywords).then(resp => {
          if (resp && resp.status === 200) {
            _this.table = resp.data
          }
        })
    }
  }
}
</script>
