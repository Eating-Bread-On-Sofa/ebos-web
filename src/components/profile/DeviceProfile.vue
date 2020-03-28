<template>
  <div>
    <el-row style="height: 800px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <br>
      <!--新增按钮-->
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="createProfile()">新增
      </el-button>
      <br>
      <profile-edit-form @onSubmit="loadProfiles()" ref="profileEditForm"></profile-edit-form>
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
          label="设备ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="model"
          label="支持协议">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">{{scope.row.status}}</template>
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
import ProfileEditForm from './ProfileEditForm'
export default {
  name: 'DeviceProfile',
  components: {ProfileEditForm, SearchBar},
  data () {
    return {
      currentPage: 1,
      pagesize: 18,
      tableData: [
        { id: '1',
          name: '温湿度传感器',
          model: 'modbus',
          status: 'on'
        },
        { id: '2',
          name: '温湿度传感器',
          model: 'modbus',
          status: 'off'
        }
      ],
      multipleSelection: []
    }
  },
  // mounted: function () {
  //   this.loadProfiles()
  // },
  methods: {
    loadProfiles () {
      var _this = this
      this.$axios
        .get('8091/api/profile/list').then(resp => {
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
    createProfile () {
      this.$refs.profileEditForm.dialogFormVisible = true
    },
    handleEdit (index, row) {
      this.$refs.profileEditForm.dialogFormVisible = true
      this.$refs.profileEditForm.form = row
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
          .get('8091/api/profile/delete?id=' + tablerow.id, {
          }).then(resp => {
            if (resp && resp === 200) {
              this.loadProfiles()
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
        .get('8091/api/search?keywords=' + this.$refs.searchBar.keywords, {
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
