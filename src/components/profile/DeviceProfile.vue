<template>
  <div>
    <el-row style="height: 840px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
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
  </div>

</template>

<script>
import SearchBar from './SearchBar'
export default {
  name: 'DeviceProfile',
  components: {SearchBar},
  data () {
    return {
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
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {

    },
    searchResult () {
      var _this = this
      this.$axios
        .get('8091/api/search?keywords=' + this.$refs.searchBar.keywords, {
        }).then(resp => {
          if (resp && resp === 200) {
            _this.tableData = resp.data
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
