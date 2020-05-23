<template>
    <div>
      <el-dialog
        title="新增网关"
        :visible.sync="dialogFormVisible"
        width="30%"
        @close="clear">
        <el-form v-model="gwForm" label-width="120px" style="text-align: left">
          <el-form-item label="网关名称" prop="name">
            <el-input v-model="gwForm.name" autocomplete="off" placeholder="请输入网关名称"></el-input>
          </el-form-item>
          <el-form-item label="网关IP地址" prop="ip">
            <el-input v-model="gwForm.ip" autocomplete="off" placeholder="请输入网关IP地址"></el-input>
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
  name: 'GatewayEditForm',
  data () {
    return {
      dialogFormVisible: false,
      gwForm: {
        name: '',
        ip: ''
      }
    }
  },
  methods: {
    clear () {
      this.gwForm = {}
    },
    onSubmit () {
      var _this = this
      this.$axios
        // .post('http://localhost:8089/api/gateway', {
        .post('http://localhost:8000/gc', {
        // .post('/gc', {
          name: _this.gwForm.name,
          ip: _this.gwForm.ip
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.$emit('onSubmit')
            _this.dialogFormVisible = false
          }
        }).catch(e => {
          this.$message('添加失败' + e)
        })
    }
  }
}
</script>

<style scoped>

</style>
