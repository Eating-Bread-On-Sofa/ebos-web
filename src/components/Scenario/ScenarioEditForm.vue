<template>
    <div>
      <el-dialog
        title="新增/修改场景服务"
        :visible.sync="dialogFormVisible"
        width="30%"
        @close="clear">
        <el-form v-model="scenarioEdit" label-width="120px" style="text-align: left" ref="dataForm">
          <el-form-item label="场景服务名称">
            <el-input v-model="scenarioEdit.form.name" autocomplete="off" placeholder="请输入场景服务名称"></el-input>
          </el-form-item>
          <el-form-item label="选择网关">
            <el-select v-model="gwIndex" placeholer="请选择网关" @change="handleGW">
              <el-option v-for="(item, i) in gwList" :key="i" :label="item.name" :value="i">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ip}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备及命令">
            <el-select v-model="command" multiple placeholder="请选择设备及命令" @change="handleCommand">
              <el-option v-for="(item, i) in commandList" :key="i" :label="item.commandName" :value="i">
                <span style="float: left">指令：{{ item.commandName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">设备：{{ item.deviceName}}</span>
              </el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="服务命令内容">-->
<!--            <el-input type="textarea" :row="10" v-model="form.command" autocomplete="off" placeholder="请输入要执行的命令名称JSON数组，如: [{'name':'1'},{'name':'2'}]"></el-input>-->
<!--          </el-form-item>-->
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
      gwList: [],
      // deviceList: [],
      commandList: [],
      gwIndex: '',
      command: [],
      gwAndDevice: {
        gatewayName: '',
        gatewayIP: '',
        commands: []
      },
      scenarioEdit: {
        // gwSelected: {},
        // gwAndDevice: {
        //   gatewayName: '',
        //   gatewayIP: '',
        //   commands: []
        // },
        form: {
          name: '',
          content: []
        }
      }
    }
  },
  mounted () {
    this.getGWList()
  },
  methods: {
    getGWList () {
      this.$axios
        .get('/gateways/').then(resp => {
          if (resp && resp.status === 200) {
            this.gwList = resp.data
          }
        }).catch(() => {
          this.$message('获取网关信息失败！请重试！')
        })
    },
    handleGW () {
      this.gwAndDevice.gatewayName = this.gwList[this.gwIndex].name
      this.gwAndDevice.gatewayIP = this.gwList[this.gwIndex].ip
      // this.$axios.get('/devices/ip/' + this.gwAndDevice.gatewayIP).then(resp => {
      //   if (resp && resp.status === 200) {
      //     this.deviceList = resp.data
      //   }
      // })
      this.$axios.get('/commands/list').then(resp => {
        if (resp && resp.status === 200) {
          this.commandList = resp.data
        }
      })
      // this.$axios
      //   .get('/gateways/gateway/' + this.gwName).then(resp => {
      //     if (resp && resp.status === 200) {
      //       this.gwAndDevice.gatewayIP = resp.data.ip
      //       this.gwAndDevice.gatewayName = this.gwName
      //     }
      //   })
    },
    handleCommand () {
      this.gwAndDevice.commands = []
      var item = {}
      for (var x in this.command) {
        item.commandName = this.commandList[x].commandName
        item.deviceName = this.commandList[x].deviceName
        this.gwAndDevice.commands.push(item)
        item = {}
      }
    },
    clear () {
      // this.scenarioEdit = {
      //   gwList: [],
      //   gwSelected: {},
      //   gwAndDevice: {
      //     gatewayName: '',
      //     gatewayIP: '',
      //     commands: []
      //   },
      //   form: {
      //     name: '',
      //     content: []
      //   }
      // }
    },
    onSubmit () {
      this.scenarioEdit.form.content.push(this.gwAndDevice)
      this.$axios
        .post('/scenarios/', this.scenarioEdit.form).then(resp => {
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
