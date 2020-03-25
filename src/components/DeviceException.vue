<template>
  <div id="app">
    <!--表格数据及操作-->
    <el-table :data="table" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">

      <el-table-column prop="date" label="日期" width="140" sortable>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="120">
      </el-table-column>
      <el-table-column prop="user" label="用户" width="280">
      </el-table-column>
      <el-table-column prop="event" label="事件" width="300">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页条-->
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>

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
      userIndex: 0
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
          var data = {date: row.date, time: row.time, user: row.user, event: row.event}
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
          obj.date = res.data[x].date
          obj.time = res.data[x].time
          obj.user = res.data[x].user
          obj.event = res.data[x].event
          data[x] = obj
        }
        this.table = data
      })
    }
  }
}
</script>
