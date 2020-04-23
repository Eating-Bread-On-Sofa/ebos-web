<template>
  <div>
    <el-dialog
      title="增加指令"
      width="30%"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="commandForm" label-width="120px" style="text-align: left">
        <el-form-item label="名称">
          <el-input v-model="commandForm.commandEdit.name" autocomplete="off" placeholder=""></el-input>
        </el-form-item>
                <el-form-item label="描述" prop="description">
                  <el-input v-model="commandForm.commandEdit.description" autocomplete="off" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="指令类型">
                  <el-select v-model="commandForm.commandEdit.commandType" placeholder="">
                    <el-option label="put" value="put"></el-option>
                    <el-option label="get" value="get"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="等级">
                  <el-select v-model="commandForm.commandEdit.level" placeholder="">
                    <el-option label="command" value=1></el-option>
                    <el-option label="scenario" value=2></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="jsonObject" placeholder="">
                  <el-input type="textarea" v-model="commandForm.commandEdit.jsonObject" autocomplete="off" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="指令选择">
                  <el-select v-model="commandForm.list" placeholder="">
                    <el-option v-for="item in commandList" :key="item.commandId" :label="item.commandName" :value="item"></el-option>
                  </el-select>
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
  name: 'CommandEditForm',
  data () {
    return {
      dialogFormVisible: false,
      commandList: [],
      commandForm: {
        list: {},
        commandEdit: {
          commandType: '',
          commandName: '',
          level: 1,
          name: '',
          description: '',
          jsonObject: null,
          deviceId: '',
          deviceName: '',
          commandId: ''
        }
      }
    }
  },
  mounted () {
    this.getCommandList()
  },
  methods: {
    getCommandList () {
      this.$axios
        .get('/commands/command/list').then(resp => {
          if (resp && resp.status === 200) {
            this.commandList = resp.data
          }
        })
    },
    clear () {
      this.commandList = []
      this.commandForm = {
        list: {},
        commandEdit: {
          commandType: '',
          commandName: '',
          level: 1,
          name: '',
          description: '',
          jsonObject: null,
          deviceId: '',
          deviceName: '',
          commandId: ''
        }
      }
    },
    onSubmit () {
      var _this = this
      this.commandForm.commandEdit.commandId = this.commandForm.list.commandId
      this.commandForm.commandEdit.commandName = this.commandForm.list.commandName
      this.commandForm.commandEdit.deviceId = this.commandForm.list.deviceId
      this.commandForm.commandEdit.deviceName = this.commandForm.list.deviceName
      this.$axios
        .post('/commands/command', _this.commandForm.commandEdit).then(resp => {
          if (resp && resp.status === 200) {
            _this.dialogFormVisible = false
            _this.$emit('onSubmit')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
