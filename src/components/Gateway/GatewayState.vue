<template>
    <div>
      <el-dialog
        title="查看网关状态"
        width="30%"
        :visible.sync="dialogFormVisible"
        @close="clear">
        <el-form v-model="gwState" label-width="160px" style="text-align: left">
          <el-form-item label="网关名称" prop="name">
            <el-input v-model="gwState.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="网关IP" prop="ip">
            <el-input v-model="gwState.ip" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="edgex-core-metadata" prop="edgexCoreMetadata">
            <el-input v-model="gwState.edgexCoreMetadata" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="edgex-core-data" prop="edgexCoreData">
            <el-input v-model="gwState.edgexCoreData" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="edgex-core-command" prop="edgexCoreCommand">
            <el-input v-model="gwState.edgexCoreCommand" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="gateway-instance" prop="gatewayInstance">
            <el-input v-model="gwState.gatewayInstance" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="command" prop="command">
            <el-input v-model="gwState.command" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'GatewayState',
  data () {
    return {
      gwState: {
        name: '',
        ip: '',
        edgexCoreMetadata: '',
        edgexCoreData: '',
        edgexCoreCommand: '',
        command: '',
        gatewayInstance: ''
      },
      dialogFormVisible: false
    }
  },
  methods: {
    clear () {
      this.gwState = {}
    }
  }
}
</script>

<style scoped>

</style>
