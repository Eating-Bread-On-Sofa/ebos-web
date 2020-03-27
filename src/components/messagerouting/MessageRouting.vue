<template>
  <div id="MessageRouting">
    <el-row style="height: 800px;">
    <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center;">
      <el-input v-model="keywords" prefix-icon="el-icon-search" size="small" style="width: 400px;margin-right: 10px"
                placeholder="请输入搜索内容"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <br>
    <!--新增按钮-->
    <el-col :span="1" class="grid" style="float: right">
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round @click="dialogCreateVisible = true">新增</el-button>
    </el-col>
    <br>
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
      <el-table-column prop="ruleName" label="路由消息">
      </el-table-column>
      <el-table-column prop="ruleCondition" label="消息来源">
      </el-table-column>
      <el-table-column prop="function" label="消息去向">
      </el-table-column>
      <el-table-column prop="function" label="函数计算">
      </el-table-column>
      <el-table-column prop="function" label="添加时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row,scope.$index)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.$index)">删除</el-button>
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

    <el-dialog
      title="新建案例"
      :visible.sync="dialogCreateVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="18">
              <el-form-item label="路由名称">
                <el-input v-model="form.routerName"  placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="消息来源">
                <el-input v-model="form.messageSource"  placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="消息去向">
                <el-input v-model="form.messageFlow"  placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="函数计算">
                <el-input v-model="form.funcCal"  placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="添加时间">
                <el-input v-model="form.addTime"  placeholder="请输入内容"></el-input>
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
          <el-form-item label="路由名称">
            <el-input v-model="editObj.routerName"></el-input>
          </el-form-item>
          <el-form-item label="消息来源">
            <el-input v-model="editObj.messageSource"></el-input>
          </el-form-item>
          <el-form-item label="消息去向">
            <el-input v-model="editObj.messageFlow"></el-input>
          </el-form-item>
          <el-form-item label="函数计算">
            <el-input v-model="editObj.funcCal"></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-input v-model="editObj.addTime"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        routerName: '',
        messageSource: '',
        messageFlow: '',
        funcCal: '',
        addTime: ''
      },
      dialogCreateVisible: false,
      table: [],
      dialogVisible: false,
      keywords: '',
      editObj: {
        routerName: '',
        messageSource: '',
        messageFlow: '',
        funcCal: '',
        addTime: ''
      },
      activeIndex: '1',
      activeIndex2: '1',
      userIndex: 0,
      pagesize: 18,
      currentPage: 1
    }
  },
  created: function () {
    // this.get()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      this.dialogCreateVisible = false
      this.add()
      this.post()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
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
    add () {
      this.table.push(this.form)
      this.form = {
        routerName: '',
        messageSource: '',
        messageFlow: '',
        funcCal: '',
        addTime: ''
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
        routerName: item.routerName,
        messageSource: item.messageSource,
        messageFlow: item.messageFlow,
        funcCal: item.funcCal,
        addTime: item.addTime
      }
      this.dialogVisible = true
    },
    confirm () {
      this.dialogVisible = false
      this.table.splice(this.userIndex, 1, this.editObj)
    },
    delete () {
      this.$http.delete('8083/api/messageRoutingDelete',
        {
          'routerName': this.form.routerName,
          'meassageSource': this.form.messageSource,
          'messageFlow': this.form.messageFlow,
          'funcCal': this.form.funcCal,
          'addTime': this.form.addTime
        }
      ).then(res => {
        console.log(res)
      })
    },

    post () {
      this.$axios.post('api/webdata',
        {
          'routerName': this.form.routerName,
          'messageSource': this.form.messageSource,
          'messageFlow': this.form.messageFlow,
          'funcCal': this.form.funcCal,
          'addTime': this.form.addTime
        }
      ).then(res => {
        console.log(res)
      })
    },
    get () {
      this.$http.get('api/webdata').then(res => {
        console.log(res)
        return 'hahah'
        // var data = []
        // for (var x = 0; x < res.data.length; x++) {
        //   var obj = {}
        //   obj.date = res.data[x].date
        //   obj.name = res.data[x].name
        //   obj.address = res.data[x].address
        //   obj.event = res.data[x].event
        //   data[x] = obj
        // }
        // this.table = data
      })
    }
  },
  computed: {
    search () {
      return 'Router Search'
    }
  }
}
</script>
