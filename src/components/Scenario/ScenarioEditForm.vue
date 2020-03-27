<template>
    <div>
      <el-dialog
        title="新增/修改场景服务"
        :visible.sync="dialogFormVisible"
        @close="clear">
        <el-form v-model="form" style="text-align: left" ref="dataForm">
          <el-form-item label="场景服务名称">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入场景服务名称"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description" autocomplete="off" placeholder="请输入场景服务描述"></el-input>
          </el-form-item>
          <el-form-item label="服务命令内容">
            <el-input type="textarea" :row="10" v-model="form.command" autocomplete="off" placeholder="请输入要执行的命令名称JSON数组，如: [{'name':'1'},{'name':'2'}]"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'ScenarioEditForm',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        description: '',
        command: ''
      }
    }
  },
  methods: {
    clear () {
      this.form = {}
    },
    onSubmit () {
      this.$axios
        .post('8082/api/command/json', {
          command: this.form
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
