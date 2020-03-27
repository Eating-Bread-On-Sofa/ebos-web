<template>
    <div>
      <el-dialog
        title="添加/修改模板功能"
        :visible.sync="dialogFormVisible"
        @close="clear">
        <el-form v-model="form" style="text-align: left">
          <el-form-item label="设备类型" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="功能名称" :label-width="formLabelWidth" prop="function">
            <el-input v-model="form.function" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="采用协议" :label-width="formLabelWidth" prop="model">
            <el-input v-model="form.model" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务" :label-width="formLabelWidth" prop="service">
            <el-input v-model="form.service" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="事件类型" :label-width="formLabelWidth" prop="style">
            <el-input v-model="form.style" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="同步方式" :label-width="formLabelWidth" prop="sync">
            <el-input v-model="form.sync" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="id" style="height: 0">
            <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div solt="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'ProfileFuncEdit',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        function: '',
        model: '',
        service: '',
        style: '',
        sync: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.form = {
        id: '',
        name: '',
        function: '',
        model: '',
        service: '',
        style: '',
        sync: ''
      }
    },
    onSubmit () {
      this.$axios
        .post('8091/api/profilefunc', {
          id: this.form.id,
          name: this.form.name,
          function: this.form.function,
          model: this.form.model,
          service: this.form.service,
          style: this.form.style,
          sync: this.form.sync
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
