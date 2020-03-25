<template>
  <div id="app">
    <div class="searchWord_device">
      <div style="display: inline-block"> 搜索：</div>
      <el-input v-model="search" style="display: inline-block;width: 1300px"
                placeholder="请输入搜索内容">
      </el-input>
    </div>
    <!--表格数据及操作-->
    <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
      <!--勾选框-->
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!--序号-->
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <!--表头-->
      <el-table-column prop="deviceName" label="设备名称" width="140">
      </el-table-column>
      <el-table-column prop="deviceTemplate" label="设备模板" width="140">
      </el-table-column>
      <el-table-column prop="deviceProtocol" label="设备协议" width="140">
      </el-table-column>
      <el-table-column prop="realTime" label="添加时间" width="140">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row,scope.$index)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <!--新增按钮-->
    <el-col :span="1" class="grid">
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round
                 @click="dialogCreateVisible = true">新增
      </el-button>
    </el-col>
    <br>
    <!--分页条-->
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>

    <el-dialog
      title="添加设备"
      :visible.sync="dialogCreateVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="18">
              <el-form-item label="JSON格式描述">
                <el-input v-model="form.information" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form ref="form" :model="editObj" label-width="80px">
          <el-form-item label="JSON格式描述">
            <el-input v-model="editObj.information"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-button style="width: 300px; margin:20px 5px 20px 25px;" type="primary" @click="toHome">返回</el-button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        information: ''
      },
      dialogCreateVisible: false,
      table: [],
      dialogVisible: false,
      editObj: {
        information: ''
      },
      activeIndex: '1',
      activeIndex2: '1',
      userIndex: 0,
      total: 0,
      pagesize: 10,
      currentPage: 1
    }
  },
  created: function () {
    this.get()
  },
  methods: {
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    onSubmit () {
      console.log('submit!')
      this.dialogCreateVisible = false
      this.add()
      this.post()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    add () {
      this.table.push(this.form)
      this.form = {
        information: ''
      }
    },
    del (idx) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.table.splice(idx, 1)
        })
        .catch(_ => {
        })
    },
    edit (item, idx) {
      this.userIndex = idx
      this.editObj = {
        information: item.information
      }
      this.dialogVisible = true
    },
    confirm () {
      this.dialogVisible = false
      this.table.splice(this.userIndex, 1, this.editObj)
      this.put()
    },
    toHome () {
      this.$router.push('/')
    },

    post () {
      this.$http.post('http://localhost:8081/api/device',
        {
          'information': this.form.information
        }
      ).then(res => {
        console.log(res)
      })
    },
    put () {
      this.$http.put('http://localhost:8081/api/device',
        {
          'information': this.form.information
        }
      ).then(res => {
        console.log(res)
      })
    },
    get () {
      this.$http.get('http://localhost:8081/api/device/ping',
        {
        }
      ).then(res => {
        return 'pong'
      })
    }
  },
  computed: {
    search () {
      return 'Device Search'
    }
  }
}
</script>
