<template>
  <div id="app">
    <el-button type="success" @click="shenji" style="float:left">开始审计</el-button>
    <!--表格数据及操作-->
    <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
      <el-table-column prop="gatewayID" label="网关ID" width="140" sortable>
      </el-table-column>
      <el-table-column prop="gatewayName" label="网关名称" width="120">
      </el-table-column>
      <el-table-column prop="existingTime" label="已存在时间" width="280">
      </el-table-column>
      <el-table-column prop="deviceNumber" label="设备数量" width="300">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页条-->
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogCreateVisible: false,
      table: [],
      activeIndex: '1',
      activeIndex2: '1',
      userIndex: 0,
      total: 0,
      pagesize: 10,
      currentPage: 1
    }
  },
  created: function () {
    this.AddDb()
  },
  methods: {
    indexMethod (index) {
      return index
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    del (row, idx) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.table.splice(idx, 1)
          var data = {gatewayID: row.gatewayID, gatewayName: row.gatewayName, existingTime: row.existingTime, deviceNumber: row.deviceNumber}
          this.$http.delete('api/deleteLog', {data: data}
          ).then(res => {
            console.log(res)
          })
        })
        .catch(_ => {
        })
    },
    AddDb () {
      this.$http.get('http://localhost:8081/api/logtest').then(res => {
        var data = []
        for (var x = 0; x < res.data.length; x++) {
          var obj = {}
          obj.gatewayID = res.data[x].gatewayID
          obj.gatewayName = res.data[x].gatewayName
          obj.existingTime = res.data[x].existingTime
          obj.deviceNumber = res.data[x].deviceNumber
          data[x] = obj
        }
        this.table = data
        this.total = data.length
      })
    },
    shenji () {
      console.log('开始审计')
      // this.AddDb()
    }
  }
}
</script>
