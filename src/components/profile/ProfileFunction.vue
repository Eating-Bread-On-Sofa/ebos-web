<template>
  <div>
    <el-row style="height: 840px">
      <search-bar @onSearch="funcSearchResult" ref="searchBar"></search-bar>
      <el-table
        :ref="multipleTable"
        :data="tableData"
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
  </div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
  name: 'ProfileFunction',
  components: {SearchBar},
  data () {
    return {
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
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
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
