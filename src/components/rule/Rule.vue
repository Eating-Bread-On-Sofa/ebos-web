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
              element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)" style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
      <!--勾选框-->
      <el-table-column type="selection">
      </el-table-column>
      <!--序号-->
      <el-table-column label="序号" width="70px">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <!--表头-->
      <el-table-column prop="ruleName" label="规则名称" width="200px">
      </el-table-column>
      <el-table-column prop="device" label="设备名称">
      </el-table-column>
      <el-table-column prop="ruleCondition" label="规则条件">
        <template slot-scope="scope">
          {{scope.row.parameter}}{{scope.row.ruleJudge}}{{scope.row.ruleParaThreshold}}
        </template>
      </el-table-column>
      <el-table-column prop="ruleExecute" label="执行功能">
      </el-table-column>
      <el-table-column prop="service" label="服务">
      </el-table-column>
      <el-table-column prop="scenario" label="场景">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row,scope.$index)">编辑</el-button>-->
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
        <el-form ref="form" :model="form" label-width="120px">
          <el-row>
            <el-col :span="18">
              <el-form-item label="规则名称">
                <el-input v-model="form.ruleName"  placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="设备选择">
                <el-select v-model="form.device" placeholder="请选择设备" style="width:100%">
                  <el-option v-for="item in devices" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备参数">
                <el-select v-model="form.parameter" placeholder="请选择参数" style="width:100%">
                  <el-option v-for="item in paras" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                <el-select v-model="form.ruleExecute" placeholder="请选择功能" style="width:100%">
                  <el-option label="告警" value="告警"></el-option>
                  <el-option label="告警且执行" value="警告且操作设备"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="服务名称">
                <el-select v-model="form.service" placeholder="请选择服务" style="width:100%">
                  <el-option v-for="item in services" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="场景选择">
                <el-select v-model="form.scenario" placeholder="请选择场景" style="width:100%">
                  <el-option v-for="item in scenarios" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      paras: [{value: '温度', label: '温度'}, {value: '湿度', label: '湿度'}],
      devices: [{value: 'temp and humidity device', label: 'temp and humidity device'}],
      services: [{value: '服务一', label: '服务一'}, {value: '服务二', label: '服务二'}],
      scenarios: [{value: '场景一', label: '场景一'}, {value: '场景二', label: '场景二'}],
      form: {
        device: '',
        ruleName: '',
        parameter: '',
        ruleJudge: '',
        ruleParaThreshold: '',
        ruleExecute: '',
        service: '',
        scenario: ''
      },
      dialogCreateVisible: false,
      table: [],
      dialogVisible: false,
      keywords: '',
      activeIndex: '1',
      activeIndex2: '1',
      userIndex: 0,
      pagesize: 10,
      currentPage: 1
    }
  },
  created: function () {
    this.get()
    // this.getFormDevices()
    // this.getFormParas()
    this.getFormService()
    this.getFormScenario()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      this.dialogCreateVisible = false
      this.post()
      console.log(this.form)
      this.add()
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
        device: '',
        ruleName: '',
        parameter: '',
        ruleJudge: '',
        ruleParaThreshold: '',
        ruleExecute: '',
        service: '',
        scenario: ''
      }
    },
    del (row, idx) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.table.splice(idx, 1)
          this.$axios.post('http://localhost:8000/rc/ruleDelete',
          // this.$axios.post('/rules/ruleDelete',
            {
              'ruleName': row.ruleName
            }
          ).then(res => {
            console.log(res)
          })
          this.$axios.post('/rules/rule',
          // this.$axios.post('/rules/rule',
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
    post () {
      this.$axios.post('http://localhost:8000/rc/webdata',
      // this.$axios.post('/rules/webdata',
        {
          'ruleName': this.form.ruleName,
          'rulePara': this.form.parameter,
          'ruleJudge': this.form.ruleJudge,
          'ruleParaThreshold': this.form.ruleParaThreshold,
          'ruleExecute': this.form.ruleExecute,
          'service': this.form.service,
          'device': this.form.device,
          'scenario': this.form.scenario
        }
      ).then(res => {
      })
      this.ruleCreate()
    },
    ruleCreate () {
      this.$axios.post('http://localhost:8000/rc/ruleCreate',
      // this.$axios.post('/rules/ruleCreate',
        {
          'ruleName': this.form.ruleName,
          'rulePara': this.form.parameter,
          'ruleJudge': this.form.ruleJudge,
          'ruleParaThreshold': this.form.ruleParaThreshold,
          'ruleExecute': this.form.ruleExecute,
          'service': this.form.service,
          'device': this.form.device,
          'scenario': this.form.scenario
        }
      ).then(res => {
      })
    },
    get () {
      var _this = this
      this.$axios.get('http://localhost:8000/rc/getRuleLists').then(resp => {
      // this.$axios.get('/rules/getRuleLists').then(resp => {
        var data = []
        for (var x = 0; x < resp.data.length; x++) {
          var obj = {}
          obj.ruleName = resp.data[x].ruleName
          obj.ruleParaThreshold = resp.data[x].threshold
          obj.ruleJudge = resp.data[x].ruleJudge
          obj.parameter = resp.data[x].parameter
          obj.ruleExecute = resp.data[x].ruleExecute
          obj.ruleId = resp.data[x].ruleId
          obj.service = resp.data[x].service
          obj.device = resp.data[x].device
          obj.scenario = resp.data[x].scenario
          data[x] = obj
        }
        if (resp && resp.status === 200) {
          _this.table = data
          _this.loading = false
        }
      })
    },
    getFormDevices () {
      this.$axios.get('http://localhost:8000/d/ip/127.0.0.1').then(resp => {
      // this.$axios.get('/devices/ip/127.0.0.1').then(resp => {
        var data = []
        for (var x = 0; x < resp.data.length; x++) {
          var obj = {}
          obj.label = resp.data[x].name
          obj.value = resp.data[x].name
          data[x] = obj
        }
        this.devices = data
      })
    },
    getFormParas () {
      this.$axios.get('http://localhost:8000/c/list').then(resp => {
      // this.$axios.get('/commands/list').then(resp => {
        var data = []
        for (var x = 0; x < resp.data.length; x++) {
          var obj = {}
          obj.label = resp.data[x].commandName
          obj.value = resp.data[x].commandName
          data[x] = obj
        }
        this.paras = data
      })
    },
    getFormScenario () {
      this.$axios.get('http://localhost:8000/s').then(resp => {
      // this.$axios.get('/scenarios/').then(resp => {
        var data = []
        for (var x = 0; x < resp.data.length; x++) {
          var obj = {}
          obj.label = resp.data[x].name
          obj.value = resp.data[x].name
          data[x] = obj
        }
        this.scenarios = data
      })
    },
    getFormService () {
      this.$axios.get('http://localhost:8000/c').then(resp => {
      // this.$axios.get('/commands/').then(resp => {
        var data = []
        for (var x = 0; x < resp.data.length; x++) {
          var obj = {}
          obj.label = resp.data[x].name
          obj.value = resp.data[x].name
          data[x] = obj
        }
        this.services = data
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
