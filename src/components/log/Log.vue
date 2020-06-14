<template>
  <div id="app">
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <div style="margin-bottom: 30px">
        <el-date-picker v-model="firstDate" type="date" placeholder="请选择开始日期" style="width: 160px"></el-date-picker>
        <el-date-picker v-model="lastDate" type="date" placeholder="请选择结束日期" style="width: 160px; margin-left: 10px"></el-date-picker>
        <el-select v-model="source" placeholder="请选择源" style="width: 150px; margin-left: 10px">
          <el-option v-for="item in sourceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="category" placeholder="请选择源" style="width: 150px; margin-left: 10px">
          <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="operation" placeholder="请选择源" style="width: 150px; margin-left: 10px">
          <el-option v-for="item in operationList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button @click="search" style="margin-left: 10px">查询</el-button>
      </div>
      <log-echart ref="LogEchartDialog" v-bind:logs="table" v-bind:dialogVisible="chartDialog" @hideDialog="chartDialog = false" ></log-echart>
      <el-button type="success" @click="shenji" style="float: right; margin-left: 20px">开始审计</el-button>
      <el-button type="success" @click="chartDialog = true" style="float: right">日志统计图</el-button>
      <!--表格数据及操作-->
      <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"
                :row-class-name="tableRowClassName"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.3)"
                ref="multipleTable" tooltip-effect="dark">
        <el-table-column prop="date" label="时间" sortable>
        </el-table-column>
        <el-table-column
          prop="source"
          label="日志来源"
          :filters="[
          { text: '网关管理', value: '网关管理'},
          { text: '设备管理', value: '设备管理'},
          { text: '网关实例', value: '网关实例'},
          { text: '指令管理', value: '指令'},
          { text: '场景管理', value: '场景'},
          { text: '消息路由', value: '消息路由'},
          { text: '设备模板', value: '设备模板'}]"
          :filter-method="filterSource"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              close-transition>{{scope.row.source}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="category"
          label="级别"
          :filters="[
          { text: '信息', value: 'info'},
          { text: '警告', value: 'warn'},
          { text: '错误', value: 'error'},
          { text: '调试', value: 'debug'}]"
          :filter-method="filterCategory"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              close-transition>{{scope.row.category}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="gatewayName" label="网关名称">
        </el-table-column>
        <el-table-column prop="gatewayIP" label="网关IP">
        </el-table-column>
        <el-table-column prop="message" label="日志信息">
        </el-table-column>
<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row,scope.$index)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
import LogEchart from './LogEchart'
export default {
  name: 'Log',
  components: {LogEchart},
  data () {
    return {
      table: [],
      chartDialog: false,
      pagesize: 10,
      currentPage: 1,
      loading: false,
      firstDate: '',
      lastDate: '',
      source: '',
      category: '',
      operation: '',
      sourceList: [{value: '全部', label: '全部'},
        {value: '网关实例', label: '网关实例'},
        {value: '规则引擎', label: '规则引擎'},
        {value: '消息路由', label: '消息路由'},
        {value: '通知管理', label: '通知管理'},
        {value: '模板管理', label: '模板管理'},
        {value: '网关管理', label: '网关管理'},
        {value: '设备指令', label: '设备指令'},
        {value: '设备管理', label: '设备管理'},
        {value: '场景管理', label: '场景管理'},
        {value: '服务管理', label: '服务管理'}],
      categoryList: [{value: 'all', label: 'all'},
        {value: 'debug', label: 'debug'},
        {value: 'info', label: 'info'},
        {value: 'warn', label: 'warn'},
        {value: 'error', label: 'error'},
        {value: 'null', label: 'null'}],
      operationList: [{value: 'all', label: 'all'},
        {value: 'create', label: 'create'},
        {value: 'delete', label: 'delete'},
        {value: 'update', label: 'update'},
        {value: 'retrieve', label: 'retrieve'},
        {value: 'null', label: 'null'}]
    }
  },
  mounted: function () {
    this.loadLogs()
  },
  methods: {
    loadLogs () {
      this.$axios
        // .get('http://localhost:8000/gc/log').then(resp => {
        .get('/logs/log').then(resp => {
          if (resp && resp.status === 200) {
            this.table = resp.data
            this.loading = false
          }
        }).catch(() => {
          this.$message('获取日志失败!')
        })
    },
    search () {
      this.searchPost()
    },
    searchPost () {
      var first = `${this.firstDate.getFullYear()}/${this.firstDate.getMonth()}/${this.firstDate.getDate()}`
      var last = `${this.lastDate.getFullYear()}/${this.lastDate.getMonth()}/${this.lastDate.getDate()}`
      var tableData = []
      this.$axios.get(`http://localhost:8090/api/log?firstDate=${first}&lastDate=${last}&source=${this.source}&category=${this.category}&operation=${this.operation}`).then(resp => {
        var data = resp.data
        for (var i = 0; i < data.length; i++) {
          console.log(data[i])
          var obj = {}
          obj.date = data[i].date
          obj.category = data[i].category
          obj.id = data[i].id
          obj.message = data[i].message
          obj.operation = data[i].operation
          obj.source = data[i].source
          tableData[i] = obj
        }
        this.table = tableData
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    tableRowClassName ({row, rowIndex}) {
      if (row.category === 'info') {
        return 'info-row'
      } else if (row.category === 'warn') {
        return 'warn-row'
      } else if (row.category === 'error') {
        return 'error-row'
      } else {
        return 'debug-row'
      }
    },
    filterCategory (value, row) {
      return row.category === value
    },
    filterSource (value, row) {
      return row.source === value
    },
    shenji () {

    }
  }
}
</script>
<style>
  .el-table .warn-row {
    background: oldlace;
  }
  .el-table .info-row {
    background: #f0f9eb;
  }
  .el-table .error-row {
    background: #f3d19e;
  }
  .el-table .debug-row {
    background: skyblue;
  }
</style>
