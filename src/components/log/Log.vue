<template>
  <div id="app">
    <el-row style="height: 800px;">
      <!--表格数据及操作-->
      <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                stripe ref="multipleTable" tooltip-effect="dark">
        <el-table-column prop="date" label="日期" sortable>
        </el-table-column>
        <el-table-column prop="time" label="时间">
        </el-table-column>
        <el-table-column prop="user" label="用户">
        </el-table-column>
        <el-table-column prop="event" label="事件">
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
    this.get()
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
          var data = {date: row.date, time: row.time, user: row.user, event: row.event}
          this.$http.delete('api/deleteLog', {data: data}
          ).then(res => {
            console.log(res)
          })
        })
        .catch(_ => {
        })
    },
    get () {
      this.$axios.get('http://localhost:8081/api/logtest').then(res => {
        var data = []
        for (var x = 0; x < res.data.length; x++) {
          var obj = {}
          obj.date = res.data[x].date
          obj.time = res.data[x].time
          obj.user = res.data[x].user
          obj.event = res.data[x].event
          data[x] = obj
        }
        this.table = data
        this.total = data.length
      })
    }
  }
}
</script>
