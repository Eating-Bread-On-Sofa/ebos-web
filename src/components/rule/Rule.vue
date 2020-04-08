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
    <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"  v-loading="loading" element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
      <!--勾选框-->
      <el-table-column type="selection">
      </el-table-column>
      <!--序号-->
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <!--表头-->
      <el-table-column prop="ruleName" label="规则名称">
      </el-table-column>
      <el-table-column prop="ruleCondition" label="规则条件">
        <template slot-scope="scope">
          {{scope.row.parameter}}{{scope.row.ruleJudge}}{{scope.row.ruleParaThreshold}}
        </template>
      </el-table-column>
      <el-table-column prop="ruleExecute" label="执行功能">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row,scope.$index)">编辑</el-button>
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

    <el-dialog
      title="新建规则"
      :visible.sync="dialogCreateVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="18">
              <el-form-item label="规则名称">
                <el-input v-model="form.ruleName"  placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="设备参数">
                <el-select v-model="form.parameter" placeholder="请选择参数" style="width:100%">
                  <el-option label="温度" value="温度"></el-option>
                  <el-option label="湿度" value="湿度"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="规则条件">
                <el-select v-model="form.ruleJudge" placeholder="请选择规则条件" style="width:100%">
                  <el-option label="大于" value=">"></el-option>
                  <el-option label="小于" value="<"></el-option>
                  <el-option label="等于" value="="></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="参数门限">
                <el-input v-model="form.ruleParaThreshold"  placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="执行功能">
                <el-input v-model="form.ruleExecute"  placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="服务名称">
                <el-input v-model="form.service"  placeholder="请输入内容"></el-input>
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
          <el-form-item label="规则名称">
            <el-input v-model="editObj.ruleName"></el-input>
          </el-form-item>
          <!--<el-form-item label="设备参数">
            <el-input v-model="editObj.parameter"></el-input>
          </el-form-item>-->
          <el-form-item label="设备参数">
            <el-select v-model="form.parameter" placeholder="请选择参数" style="width:100%">
              <el-option label="温度" value="温度"></el-option>
              <el-option label="湿度" value="湿度"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规则条件">
            <el-select v-model="editObj.ruleJudge" placeholder="请选择规则条件" style="width:100%">
              <el-option label="大于" value=">"></el-option>
              <el-option label="小于" value="<"></el-option>
              <el-option label="等于" value="="></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参数门限">
            <el-input v-model="editObj.ruleParaThreshold"></el-input>
          </el-form-item>
          <el-form-item label="执行功能">
            <el-input v-model="editObj.ruleExecute"></el-input>
          </el-form-item>
          <el-form-item label="服务名称">
            <el-input v-model="editObj.service"></el-input>
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
        ruleName: '',
        parameter: '',
        ruleJudge: '',
        ruleParaThreshold: '',
        ruleExecute: '',
        service: ''
      },
      dialogCreateVisible: false,
      table: [],
      dialogVisible: false,
      keywords: '',
      editObj: {
        ruleName: '',
        parameter: '',
        ruleJudge: '',
        ruleParaThreshold: '',
        ruleExecute: '',
        service: ''
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
    onSubmit () {
      console.log('submit!')
      this.dialogCreateVisible = false
      this.post()
      console.log(this.form)
      this.add()
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
        ruleName: '',
        parameter: '',
        ruleJudge: '',
        ruleParaThreshold: '',
        ruleExecute: '',
        service: ''
      }
    },
    del (row, idx) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.table.splice(idx, 1)
          this.$axios.post('/rules/ruleDelete',
            {
              'ruleName': row.ruleName
            }
          ).then(res => {
            console.log('+++数据+++')
            console.log(row)
            console.log(res)
          })
          this.$axios.post('/rules/rule',
            {
              'ruleId': row.ruleId
            }
          ).then(res => {
            console.log('+++删除的+++')
            console.log(res)
          })
        })
        .catch(_ => {
        })
    },
    edit (item, idx) {
      this.userIndex = idx
      this.editObj = {
        ruleName: item.ruleName,
        parameter: item.parameter,
        ruleJudge: item.ruleJudge,
        ruleParaThreshold: item.ruleParaThreshold,
        ruleExecute: item.ruleExecute,
        service: item.service
      }
      this.dialogVisible = true
    },
    confirm () {
      this.dialogVisible = false
      this.table.splice(this.userIndex, 1, this.editObj)
    },
    post () {
      this.$axios.post('/rules/webdata',
        {
          'ruleName': this.form.ruleName,
          'rulePara': this.form.parameter,
          'ruleJudge': this.form.ruleJudge,
          'ruleParaThreshold': this.form.ruleParaThreshold,
          'ruleExecute': this.form.ruleExecute,
          'service': this.form.service
        }
      ).then(res => {
      })
      this.ruleCreate()
    },
    ruleCreate () {
      this.$axios.post('/rules/ruleCreate',
        {
          'ruleName': this.form.ruleName,
          'rulePara': this.form.parameter,
          'ruleJudge': this.form.ruleJudge,
          'ruleParaThreshold': this.form.ruleParaThreshold,
          'ruleExecute': this.form.ruleExecute,
          'service': this.form.service
        }
      ).then(res => {
      })
    },
    get () {
      var _this = this
      this.$axios.get('/rules/getRules').then(resp => {
        var data = []
        for (var x = 0; x < resp.data.length; x++) {
          var obj = {}
          obj.ruleName = resp.data[x].ruleName
          obj.ruleParaThreshold = resp.data[x].threshold
          obj.ruleJudge = resp.data[x].ruleJudge
          obj.parameter = resp.data[x].parameter
          obj.ruleExecute = resp.data[x].ruleExecute
          obj.ruleId = resp.data[x].ruleId
          data[x] = obj
        }
        if (resp && resp.status === 200) {
          _this.table = data
        }
      })
    }
  },
  computed: {
    search () {
      return 'Rule Search'
    }
  }
}
</script>
