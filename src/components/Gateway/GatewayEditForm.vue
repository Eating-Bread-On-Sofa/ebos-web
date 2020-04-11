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
          <el-form-item label="选择备份项">
            <el-switch v-model="gwForm.command" inactive-text="指令" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
            <el-switch v-model="gwForm.deviceprofile" inactive-text="设备模板" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
            <el-switch v-model="gwForm.deviceservice" inactive-text="设备服务" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
            <el-switch v-model="gwForm.export" inactive-text="导出层" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
            <el-switch v-model="gwForm.device" inactive-text="设备" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
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
        ip: '',
        command: '0',
        device: '0',
        deviceprofile: '0',
        deviceservice: '0',
        export: '0'
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
        .post('/gateways/gateway', {
          name: _this.gwForm.name,
          ip: _this.gwForm.ip
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$axios
              .post('/gateways/gateway/copy/' + _this.gwForm.ip, {
                command: _this.gwForm.command,
                device: _this.gwForm.device,
                deviceprofile: _this.gwForm.deviceprofile,
                deviceservice: _this.gwForm.deviceservice,
                export: _this.gwForm.export
              }).then(resp => {
                if (resp && resp.status === 200) {
                  this.dialogFormVisible = false
                  this.$emit('onSubmit')
                }
              }).catch(e => {
                this.$message('备份失败' + e)
              })
          }
        }).catch(e => {
          this.$message('添加失败' + e)
        })
    }
  }
}
</script>

<style scoped>
  el-switch {
    display: inline-block;
    height: 30px;
    width: 100px;
    margin-right: 10px;
    padding-right: 5px;
  }

</style>
