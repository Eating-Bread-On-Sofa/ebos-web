<template>
  <div id="app">
    <el-row style="height: 800px;">
      <el-button type="success" @click="shenji" style="float: right">开始审计</el-button>
      <!--表格数据及操作-->
      <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
        <el-table-column prop="id" label="设备ID">
        </el-table-column>
        <el-table-column prop="deviceType" label="设备类型">
        </el-table-column>
        <el-table-column prop="existingTime" label="已存在时间">
        </el-table-column>
        <el-table-column prop="gateway" label="所属网关">
        </el-table-column>
        <el-table-column prop="reportedData" label="上报数据">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row,scope.$index)">删除</el-button>
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
export default {
  data () {
    return {
      dialogCreateVisible: false,
      table: [],
      activeIndex: '1',
      activeIndex2: '1',
      userIndex: 0,
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
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
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
          var data = {id: row.id, deviceType: row.deviceType, existingTime: row.existingTime, gateway: row.gateway, reportedData: row.reportedData}
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
          obj.id = res.data[x].id
          obj.deviceType = res.data[x].deviceType
          obj.existingTime = res.data[x].existingTime
          obj.gateway = res.data[x].gateway
          obj.reportedData = res.data[x].reportedData
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
