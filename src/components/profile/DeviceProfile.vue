<template>
  <div>
    <el-row style="height: 1200px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <br>
      <!--新增按钮-->
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="createProfile()">新增
      </el-button>
      <br>
      <profile-edit-form @onSubmit="loadProfiles()" ref="profileEditForm"></profile-edit-form>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 100%;"
        stripe
        @selection-change="handleSelectionChange">
        <!--展示设备模板功能-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.deviceResources"
              style="width: 100%">
              <el-table-column
                type="index"
                width="50"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="name"
                label="功能名称">
              </el-table-column>
              <el-table-column
                prop="description"
                label="功能描述">
              </el-table-column>
              <!--多级表头-->
              <el-table-column label="properties">
                <el-table-column label="value">
                  <el-table-column
                    prop="properties.value.type"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="properties.value.readWrite"
                    label="读写权限">
                  </el-table-column>
                  <el-table-column
                    prop="properties.value.defaultValue"
                    label="默认值">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="units">
                  <el-table-column
                    prop="properties.units.type"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="properties.units.readWrite"
                    label="读写权限">
                  </el-table-column>
                  <el-table-column
                    prop="properties.units.defaultValue"
                    label="默认值">
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="id"
          label="模板ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="manufacturer"
          label="制造商">
        </el-table-column>
        <el-table-column
          prop="model"
          label="支持协议">
        </el-table-column>
        <el-table-column
          prop="created"
          label="生成日期">
        </el-table-column>
        <el-table-column
          prop="modified"
          label="修改日期">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleExport(scope.$index, scope.row)">导出模板</el-button>
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="success"-->
<!--              @click="handleStatus(scope.$index, scope.row)">启用/禁用</el-button>-->
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
      tableData: [],
      multipleSelection: [],
      loading: true
    }
  },
  mounted: function () {
    this.loadProfiles()
  },
  methods: {
    loadProfiles () {
      var _this = this
      this.$axios
        .get('/profiles/ip/127.0.0.1').then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
            _this.loading = false
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
    handleExport (index, tablerow) {
      var filecontent
      this.$axios
        .get('/profiles/yml/' + tablerow.id).then(resp => {
          if (resp && resp.status === 200) {
            filecontent = resp.data
            if ('download' in document.createElement('a')) {
              this.download(filecontent, tablerow.name + '.yaml')
            } else {
              window.alert('浏览器不支持！')
            }
          }
        }).catch(() => {
          this.$message('模板导出失败！')
        })
    },
    download (content, filename) {
      let link = document.createElement('a')
      link.download = filename
      link.style.display = 'none'
      // 字符内容转变成blob地址
      let blob = new Blob([content])
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    handleDelete (index, tablerow) {
      var _this = this
      this.$confirm('此操作将永久删除该模板，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          .delete('/profiles/ip/' + tablerow.ip + '/id/' + tablerow.id).then(resp => {
            if (resp && resp.status === 200) {
              _this.loadProfiles()
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
        .get('/profiles/search?keywords=' + this.$refs.searchBar.keywords, {
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
