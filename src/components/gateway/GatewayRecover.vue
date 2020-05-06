<template>
    <div>
      <el-dialog
        title="网关恢复"
        width="30%"
        :visible.sync="dialogFormVisible"
        @close="clear">
        <el-form v-model="gwRecoverForm" label-width="120px" style="text-align: left">
          <el-form-item label="网关名称" prop="name">
            <el-input v-model="gwRecoverForm.name" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="网关IP地址" prop="ip">
            <el-input v-model="gwRecoverForm.ip" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="选择版本">
            <el-select v-model="gwRecoverForm.version">
              <el-option v-for="item in versionList" :key="item.version" :label="item.version" :value="item.version"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="恢复项：">
            <el-switch v-model="gwRecoverForm.command" inactive-text="指令" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
            <el-switch v-model="gwRecoverForm.deviceprofile" inactive-text="设备模板" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
            <el-switch v-model="gwRecoverForm.deviceservice" inactive-text="设备服务" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
            <el-switch v-model="gwRecoverForm.export" inactive-text="导出层" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
            <el-switch v-model="isDisplay" inactive-text="设备" active-color="#13ce66" inactive-color="#ff4949" active-value="inline" inactive-value="none"></el-switch>
          </el-form-item>
          <el-form-item label="设备管理ip" prop="device" :style="{display: isDisplay}">
            <el-input v-model="gwRecoverForm.deviceIp" autocomplete="off" placeholder="请输入需恢复的设备管理服务器IP"></el-input>
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
  name: 'GatewayRecover',
  data () {
    return {
      versionList: [],
      gwRecoverForm: {
        name: '',
        ip: '',
        version: '',
        command: '0',
        deviceIp: '0',
        deviceprofile: '0',
        deviceservice: '0',
        export: '0'
      },
      isDisplay: 'none',
      dialogFormVisible: false
    }
  },
  methods: {
    clear () {
      this.gwRecoverForm = {}
    },
    onSubmit () {
      var _this = this
      this.$axios
        .post('/gateways/recover/ip' + _this.gwRecoverForm.ip + '/version/' + _this.gwRecoverForm.version, {
          command: _this.gwRecoverForm.command,
          device: {
            deviceIp: _this.gwRecoverForm.deviceIp
          },
          deviceprofile: _this.gwRecoverForm.deviceprofile,
          deviceservice: _this.gwRecoverForm.deviceservice,
          export: _this.gwRecoverForm.export
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.dialogFormVisible = false
            _this.$message('恢复成功')
            _this.$emit('onRecover')
          }
        }).catch(e => {
          _this.$message('恢复失败' + e)
        })
    }
  }

}
</script>

<style scoped>

</style>
