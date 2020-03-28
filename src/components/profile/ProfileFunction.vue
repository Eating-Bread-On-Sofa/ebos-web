<template>
  <div>
    <el-row style="height: 800px">
      <search-bar @onSearch="funcSearchResult" ref="searchBar"></search-bar>
      <br>
      <!--新增按钮-->
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="createProfileFunction()">新增
      </el-button>
      <br>
      <profile-func-edit @onSubmit="loadProfileFuncs()" ref="profileFuncEdit"></profile-func-edit>
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
          prop="id"
          label="设备模板ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="function"
          label="功能名称">
        </el-table-column>
        <el-table-column
          prop="model"
          label="采用协议">
        </el-table-column>
        <el-table-column
          prop="service"
          label="服务">
        </el-table-column>
        <el-table-column
          prop="style"
          label="事件类型">
        </el-table-column>
        <el-table-column
          prop="sync"
          label="方式">
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
import ProfileFuncEdit from './ProfileFuncEdit'
export default {
  name: 'ProfileFunction',
  components: {ProfileFuncEdit, SearchBar},
  data () {
    return {
      currentPage: 1,
      pagesize: 18,
      tableData: [
        {
          id: '1',
          name: '温度传感器',
          function: '获取温度数据',
          model: 'modbus',
          service: 'getTempInfo',
          style: '信息',
          sync: '异步'
        },
        {
          id: '2',
          name: '温度传感器',
          function: '获取温度数据',
          model: 'MQTT',
          service: 'TempWarnInfo',
          style: '告警',
          sync: '同步'
        }
      ],
      multipleSelection: []
    }
  },
  // mounted: function () {
  //   this.loadProfileFuncs()
  // },
  methods: {
    loadProfileFuncs () {
      var _this = this
      this.$axios
        .get('/8091/api/profile/list').then(resp => {
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
    createProfileFunction () {
      this.$refs.profileFuncEdit.dialogFormVisible = true
    },
    handleEdit (index, row) {
      this.$refs.profileFuncEdit.dialogFormVisible = true
      this.$refs.profileFuncEdit.form = {
        id: row.id,
        name: row.name,
        function: row.function,
        model: row.model,
        service: row.service,
        style: row.style,
        sync: row.sync
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
      this.$confirm('此操作将永久删除该，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          .get('8091/api/profilefunc/delete?id=' + tablerow.id, {
          }).then(resp => {
            if (resp && resp === 200) {
              this.loadProfileFuncs()
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    funcSearchResult () {
      var _this = this
      this.$axios
        .get('8091/api/funcSearch?keywords=' + this.$refs.searchBar.keywords, {
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
