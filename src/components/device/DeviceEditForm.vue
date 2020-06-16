<template>
  <div>
    <el-dialog
      title="新增设备信息"
      width="30%"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="deviceEditForm" label-width="120px" style="text-align: left">
        <el-form-item label="选择网关" prop="gwip">
          <el-select v-model="deviceEditForm.gwip" placeholer="请选择网关IP" @change="handleGWIP">
            <el-option v-for="item in gwList" :key="item.ip" :label="item.name" :value="item.ip"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="deviceEditForm.deviceForm.name" autocomplete="off" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备描述" prop="description">
          <el-input v-model="deviceEditForm.deviceForm.description" autocomplete="off" placeholder="请输入设备描述"></el-input>
        </el-form-item>
<!--        <el-form-item label="操作状态" prop="operatingState">-->
<!--          <el-select v-model="deviceEditForm.deviceForm.operatingState" placeholder="请选择操作状态">-->
<!--            <el-option label="ENABLED" value="ENABLED"></el-option>-->
<!--            <el-option label="UNABLED" value="UNABLED"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="管理状态" prop="adminState">-->
<!--          <el-select v-model="deviceEditForm.deviceForm.adminState" placeholder="请选择管理状态">-->
<!--            <el-option label="UNLOCKED" value="UNLOCKED"></el-option>-->
<!--            <el-option label="LOCKED" value="LOCKED"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="标签" prop="labels">
          <el-input v-model="deviceEditForm.labelText" autocomplete="off" placeholder="请输入标签" @change="handleLabel"></el-input>
        </el-form-item>
        <el-form-item label="协议" prop="protocols">
          <el-select v-model="deviceEditForm.protocolName" placeholder="请选择协议" @change="handleProtocol">
            <el-option v-for="(item, i) in protocolList" :key="i" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-for="(item, key) in deviceEditForm.deviceForm.protocols[deviceEditForm.protocolName]" :key="key" :label="key">
          <el-input v-model="deviceEditForm.deviceForm.protocols[deviceEditForm.protocolName][key]"></el-input>
        </el-form-item>
        <el-form-item label="设备模板" prop="profile">
          <el-select v-model="deviceEditForm.deviceForm.profile.name" placeholer="请选择设备模板">
            <el-option v-for="item in profileList" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备服务名称" prop="service.name">
          <el-select v-model="deviceEditForm.deviceForm.service.name" placeholder="请选择设备服务">
            <el-option v-for="(item, i) in deviceServiceList" :key="i" :label="item.name" :value="item.name"></el-option>
          </el-select>
<!--          <el-input v-model="deviceEditForm.deviceForm.service.name" autocomplete="off" placeholder="请输入设备服务名称"></el-input>-->
        </el-form-item>
<!--        <el-form-item label="服务管理状态" prop="service">-->
<!--          <el-select v-model="deviceEditForm.deviceForm.service.adminState" placeholder="请选择服务管理状态">-->
<!--            <el-option label="UNLOCKED" value="UNLOCKED"></el-option>-->
<!--            <el-option label="LOCKED" value="LOCKED"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
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
  name: 'DeviceEditForm',
  data () {
    return {
      dialogFormVisible: false,
      gwList: [],
      profileList: [],
      protocolList: [],
      protocolItem: {},
      deviceServiceList: [],
      deviceEditForm: {
        gwip: '',
        labelText: '',
        protocolName: '',
        deviceForm: {
          name: '',
          description: '',
          operatingState: 'ENABLED',
          adminState: 'UNLOCKED',
          labels: [],
          protocols: {},
          service: {
            name: '',
            adminState: 'UNLOCKED'
          },
          profile: {
            name: ''
          }
        }
      }
    }
  },
  mounted () {
    this.getGWList()
    this.getProtocolList()
  },
  methods: {
    getGWList () {
      this.$axios
        .get('http://localhost:8000/gc').then(resp => {
        // .get('/gc').then(resp => {
          if (resp && resp.status === 200) {
            this.gwList = resp.data
          }
        })
    },
    getProtocolList () {
      var _this = this
      this.$axios
        .get('http://localhost:8000/d/protocol').then(resp => {
        // .get('/d/protocol').then(resp => {
          if (resp && resp.status === 200) {
            _this.protocolList = resp.data
          }
        }).catch(() => {
          this.$message('获取协议列表失败！')
        })
    },
    handleGWIP () {
      this.getDeviceServiceList()
      this.getProfileList()
    },
    handleProtocol () {
      this.$axios
        .get('http://localhost:8000/d/protocol/' + this.deviceEditForm.protocolName).then(resp => {
        // .get('/d/protocol/' + this.deviceEditForm.protocolName).then(resp => {
          if (resp && resp.status === 200) {
            this.deviceEditForm.deviceForm.protocols = resp.data
          }
        }).catch(() => {
          this.$message('获取协议信息失败！')
        })
    },
    handleLabel () {
      this.deviceEditForm.deviceForm.labels.push(this.deviceEditForm.labelText)
    },
    getProfileList () {
      this.$axios
        .get('/profiles/gateway/' + this.deviceEditForm.gwip + '/list').then(resp => {
        // .get('http://localhost:8000/p/ip/' + this.deviceEditForm.gwip).then(resp => {
          if (resp && resp.status === 200) {
            this.profileList = resp.data
          }
        }).catch(() => {
          this.$message('请先选择网关!')
        })
    },
    getDeviceServiceList () {
      this.$axios
        .get('http://localhost:8000/d/service/' + this.deviceEditForm.gwip).then(resp => {
        // .get('/d/service/' + this.deviceEditForm.gwip).then(resp => {
          if (resp && resp.status === 200) {
            this.deviceServiceList = resp.data
          }
        }).catch(() => {
          this.$message('请先选择网关!')
        })
    },
    clear () {
      this.deviceEditForm = {
        gwip: '',
        deviceForm: {
          name: '',
          description: '',
          operatingState: 'ENABLED',
          adminState: 'UNLOCKED',
          labels: [],
          protocols: {},
          profile: {
            name: ''
          },
          service: {
            name: '',
            adminState: 'UNLOCKED'
          }
        }
      }
    },
    onSubmit () {
      var _this = this
      this.$axios
        // .post('http://localhost:8081/api/device/ip/' + _this.deviceEditForm.gwip, _this.deviceEditForm.deviceForm).then(resp => {
        .post('http://localhost:8000/d/ip/' + _this.deviceEditForm.gwip, _this.deviceEditForm.deviceForm).then(resp => {
        // .post('/d/ip/' + _this.deviceEditForm.gwip, _this.deviceEditForm.deviceForm).then(resp => {
          if (resp && resp.status === 200) {
            _this.dialogFormVisible = false
            _this.$emit('onSubmit')
          }
        }).catch(() => {
          _this.$message('添加设备失败！请重试！')
        })
    }
  }
}
</script>

<style scoped>

</style>
