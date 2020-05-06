<template>
  <div>
    <el-dialog
      title="修改网关IP地址"
      :visible.sync="dialogFormVisible"
      width="30%"
      @close="clear">
      <el-form v-model="gwIpForm" label-width="120px" style="text-align: left">
        <el-form-item label="网关名称" prop="name">
          <el-input v-model="gwIpForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="网关IP地址" prop="ip">
          <el-input v-model="gwIpForm.ip" autocomplete="off" placeholder="请输入新的IP地址"></el-input>
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
  name: 'GatewayIpEdit',
  data () {
    return {
      dialogFormVisible: false,
      gwIpForm: {
        name: '',
        ip: ''
      }
    }
  },
  methods: {
    clear () {
      this.gwIpForm = {}
    },
    onSubmit () {
      var _this = this
      this.$axios
        .put('/gateways/', {
          name: _this.gwIpForm.name,
          ip: _this.gwIpForm.ip
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.dialogFormVisible = false
            _this.$emit('onEdit')
          }
        }).catch(e => {
          _this.$message('修改失败' + e)
        })
    }
  }
}
</script>

<style scoped>

</style>
