<template>
  <div id="app">
    <el-row>
      <el-button type="success" @click="shenji" style="float: right">开始审计</el-button>
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
export default {
  name: 'Log',
  data () {
    return {
      table: [],
      pagesize: 10,
      currentPage: 1,
      loading: false
    }
  },
  mounted: function () {
    this.loadLogs()
  },
  methods: {
    loadLogs () {
      this.$axios
        .get('/gateways/log').then(resp => {
          if (resp && resp.status === 200) {
            this.table = resp.data
            this.loading = false
          }
        }).catch(() => {
          this.$message('获取日志失败!')
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
