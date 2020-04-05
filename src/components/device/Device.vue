<template>
  <div id="app">
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
    <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              stripe ref="multipleTable" tooltip-effect="dark">
      <!--勾选框-->
      <el-table-column type="selection">
      </el-table-column>
      <!--序号-->
      <el-table-column label="序号" style="width: 15px">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <!--表头-->
      <el-table-column prop="name" label="设备名称">
      </el-table-column>
      <el-table-column prop="id" label="设备ID">
      </el-table-column>
      <el-table-column prop="profile" label="设备模板">
      </el-table-column>
      <el-table-column prop="service" label="服务">
      </el-table-column>
      <el-table-column prop="description" label="设备描述">
      </el-table-column>
      <el-table-column prop="operatingState" label="操作状态">
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
      keywords: '',
      editObj: {
        information: ''
      },
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
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    onSubmit () {
      console.log('submit!')
      this.dialogCreateVisible = false
      this.add()
      this.post()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    handleClose (done) {
      this.$confirm('确认关闭？').then(_ => {
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
    post () {
      this.$http.post('8081/api/device',
        {
          'information': this.form.information
        }
      ).then(res => {
        console.log(res)
      })
    },
    put () {
      this.$http.put('8081/api/device',
        {
          'information': this.form.information
        }
      ).then(res => {
        console.log(res)
      })
    },
    get () {
      var _this = this
      this.$axios.get('/devices/127.0.0.1'
      ).then(resp => {
        if (resp && resp.status === 200) {
          _this.table = resp.data
        }
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
