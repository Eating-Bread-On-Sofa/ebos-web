<template>
  <div id="app">
    <!--表格数据及操作-->
    <el-table :data="table" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
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
      <el-table-column prop="ruleName" label="规则名称" width="140">
      </el-table-column>
      <el-table-column prop="ruleCondition" label="规则条件" width="180">
        <template slot-scope="scope">
          {{scope.row.parameter}}{{scope.row.condition}}{{scope.row.threshold}}
        </template>
      </el-table-column>
      <el-table-column prop="function" label="执行功能" width="280">
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
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round @click="dialogCreateVisible = true">新增</el-button>
    </el-col>
    <br>
    <!--分页条-->
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>

    <el-dialog
      title="新建案例"
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
                <el-select v-model="form.condition" placeholder="请选择规则条件" style="width:100%">
                  <el-option label="大于" value=">"></el-option>
                  <el-option label="小于" value="<"></el-option>
                  <el-option label="等于" value="="></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="参数门限">
                <el-input v-model="form.threshold"  placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="执行功能">
                <el-input v-model="form.function"  placeholder="请输入内容"></el-input>
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
            <el-select v-model="editObj.condition" placeholder="请选择规则条件" style="width:100%">
              <el-option label="大于" value=">"></el-option>
              <el-option label="小于" value="<"></el-option>
              <el-option label="等于" value="="></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参数门限">
            <el-input v-model="editObj.threshold"></el-input>
          </el-form-item>
          <el-form-item label="执行功能">
            <el-input v-model="editObj.function"></el-input>
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
    <el-button style="width: 300px; margin:20px 5px 20px 25px;" type="primary" @click="toHome">返回</el-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ruleName: '',
        parameter: '',
        condition: '',
        threshold: '',
        function: '',
        service: '',
      },
      dialogCreateVisible: false,
      table: [{}],
      dialogVisible: false,
      editObj: {
        ruleName: '',
        parameter: '',
        condition: '',
        threshold: '',
        function: '',
        service: ''
      },
      activeIndex: '1',
      activeIndex2: '1',
      userIndex: 0,
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      this.dialogCreateVisible = false;
      this.add();
      this.post();
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    add() {
      this.table.push(this.form);
      this.form = {
        ruleName: '',
        parameter: '',
        condition: '',
        threshold: '',
        function: '',
        service: ''
      };
    },
    del(idx) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.table.splice(idx, 1)
        })
        .catch(_ => {
        })
    },
    edit(item, idx) {
      this.userIndex = idx
      this.editObj = {
        ruleName: item.ruleName,
        parameter: item.parameter,
        condition: item.condition,
        threshold: item.threshold,
        function: item.function,
        service: item.service
      };
      this.dialogVisible = true
    },
    confirm() {
      this.dialogVisible = false
      this.table.splice(this.userIndex, 1, this.editObj)
    },
    toHome() {
      this.$router.push('/')
    },

    post() {
      this.$axios({
        url: 'http://localhost:8083/api/webdata',
        method: 'post',
        //发送格式为json
        data: JSON.stringify({
          func: 'query',
          param: ['3aa3a1fe7fe987945c8a097fa5274d352609b65021de4f0f0f8a4027479e802d']
        }),
        headers:
          {
            'Content-Type': 'application/json'
          }
      }).then(function (return_data) {
        alert(return_data)
      }, function (return_data) {
        //alert(return_data)
      });
    },

  }
}
</script>
