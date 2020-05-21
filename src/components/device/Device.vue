<template>
  <div id="app">
    <el-row style="height: 800px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <br>
      <!--新增按钮-->
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="createDevice()">新增
      </el-button>
      <br>
      <device-edit-form @onSubmit="loadDevices" ref="deviceEdit"></device-edit-form>
    <!--表格数据及操作-->
    <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.3)"
              stripe ref="multipleTable" tooltip-effect="dark">
      <!--勾选框-->
      <el-table-column type="selection">
      </el-table-column>
      <!--序号-->
      <el-table-column
        type="index"
        width="50"
        label="序号">
      </el-table-column>
      <!--表头-->
      <el-table-column prop="name" label="设备名称">
      </el-table-column>
      <el-table-column prop="id" label="设备ID">
      </el-table-column>
      <el-table-column label="支持协议">
        <template slot-scope="scope">
          <span v-for="(item, key) in scope.row.protocols" :key="key">{{ key }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="profile" label="设备模板">
      </el-table-column>
      <el-table-column prop="service" label="服务">
      </el-table-column>
      <el-table-column prop="description" label="设备描述">
      </el-table-column>
      <el-table-column prop="adminState" label="管理状态">
      </el-table-column>
      <el-table-column prop="operatingState" label="操作状态">
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-edit" size="mini" @click="handleTest(scope.$index, scope.row)">测试</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
<!--          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleTest(scope.$index, scope.row)">test</el-button>-->
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
import SearchBar from '../common/SearchBar'
import DeviceEditForm from './DeviceEditForm'
export default {
  components: {DeviceEditForm, SearchBar},
  data () {
    return {
      table: [],
      pagesize: 18,
      currentPage: 1,
      loading: true
    }
  },
  mounted () {
    this.loadDevices()
  },
  methods: {
    loadDevices () {
      var _this = this
      this.$axios
        // .get('http://localhost:8081/api/device/ip/127.0.0.1').then(resp => {
        .get('http://localhost:8000/d/ip/127.0.0.1').then(resp => {
        // .get('/d/ip/127.0.0.1').then(resp => {
          if (resp && resp.status === 200) {
            _this.table = resp.data
            _this.loading = false
          }
        }).catch(() => {
          this.$message('拉取设备列表失败！')
        })
    },
    createDevice () {
      this.$refs.deviceEdit.dialogFormVisible = true
    },
    // handleChart (index, row) {
    //   var date = new Date()
    //   var data1 = []
    //   var data2 = []
    //   this.$axios.get('/surveillances/surveillance/' + row.id).then(resp => {
    //     if (resp && resp.status === 200) {
    //       var type = Object.keys(resp.data)
    //       console.log(type)
    //       data1.push([date, resp.data[type[0]]])
    //       data2.push([date, resp.data[type[1]]])
    //       if (data1.length > 60) {
    //         data1.shift()
    //         data2.shift()
    //       }
    //       this.$refs.deviceMonitor.dataForm.type = type
    //       this.$refs.deviceMonitor.dataForm.data1 = data1
    //       this.$refs.deviceMonitor.dataForm.data2 = data2
    //       this.$refs.deviceMonitor.dialogFormVisible = true
    //     }
    //   })
    // },
    handleDelete (index, row) {
      var _this = this
      this.$confirm('此操作将永久删除该设备，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$axios
          // .delete('http://localhost:8081/api/device/ip/127.0.0.1/name/' + row.name).then(resp => {
          .delete('http://localhost:8000/d/ip/127.0.0.1/name/' + row.name).then(resp => {
          // .delete('/d/ip/127.0.0.1/name/' + row.name).then(resp => {
            if (resp && resp.status === 200) {
              _this.loadDevices()
            }
          })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleTest (index, row) {
      // this.$axios.get('http://localhost:8081/api/device/details/127.0.0.1/' + row.id).then(resp => {
      this.$axios.get('http://localhost:8000/d/details/127.0.0.1/' + row.id).then(resp => {
      // this.$axios.get('/d/details/127.0.0.1/' + row.id).then(resp => {
        if (resp && resp.status === 200) {
          this.$message('连接成功！')
        }
      }).catch(() => {
        this.$message('连接失败！')
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    searchResult () {
      var _this = this
      this.$axios
        .get('http://localhost:8000/d/search?keywords=' + this.$refs.searchBar.keywords, {
        // .get('/d/search?keywords=' + this.$refs.searchBar.keywords, {
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.table = resp.data
          }
        })
    }
  }

}

</script>
