<template>
    <div>
      <el-dialog
        title="新增/修改设备服务"
        :visible.sync="dialogFormVisible"
        @close="clear">
        <el-form v-model="form" style="text-align: left" ref="dataForm">
          <el-form-item label="选择设备" :label-width="formLabelWidth" prop="deviceName">
            <el-select v-model="form.deviceName" placeholder="请选择设备">
              <el-option v-for="(item, i) in deviceList" :index="item.name" :key="i" label="item.name" value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备服务名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入设备服务名称"></el-input>
          </el-form-item>
          <el-form-item label="命令类型" :label-width="formLabelWidth" prop="commandType">
            <el-select v-model="form.commandType" placeholder="请选择命令类型">
              <el-option label="get" value="get"></el-option>
              <el-option label="post" value="post"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
            <el-input v-model="form.description" autocomplete="off" placeholder="请输入设备服务描述"></el-input>
          </el-form-item>
          <el-form-item label="消息体" :label-width="formLabelWidth" prop="JSONObject">
            <el-input type="textarea" :row="10" v-model="form.JSONObject" autocomplete="off" placeholder="请输入JSON body"></el-input>
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
  name: 'DeviceServiceEdit',
  data () {
    return {
      dialogFormVisible: false,
      deviceList: [],
      form: {
        name: '',
        deviceName: '',
        commandType: '',
        description: '',
        JSONObject: ''
      },
      formLabelWidth: '120px'
    }
  },
  // mounted: function() {
  //   this.loadDeviceList()
  // },
  methods: {
    clear () {
      this.form = {}
    },
    loadDeviceList () {
      this.$axios
        .get('8091/api/device/list').then(resp => {
          if (resp && resp.status === 200) {
            this.deviceList = resp.data
          }
        })
    },
    onSubmit () {
      this.$axios
        .post('8082/api/command/jsonobject', {
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
