<template>
  <div>
    <el-dialog
      title="新增设备信息"
      width="30%"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="deviceEditForm" label-width="120px" style="text-align: left">
        <el-form-item label="选择网关" prop="gwip">
          <el-select v-model="deviceEditForm.gwip" placeholer="请选择网关IP">
            <el-option v-for="item in gwList" :key="item.ip" :label="item.name" :value="item.ip"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="deviceEditForm.deviceForm.name" autocomplete="off" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备描述" prop="description">
          <el-input v-model="deviceEditForm.deviceForm.description" autocomplete="off" placeholder="请输入设备描述"></el-input>
        </el-form-item>
        <el-form-item label="操作状态" prop="operatingState">
          <el-select v-model="deviceEditForm.deviceForm.operatingState" placeholder="请选择操作状态">
            <el-option label="ENABLED" value="ENABLED"></el-option>
            <el-option label="UNABLED" value="UNABLED"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理状态" prop="adminState">
          <el-select v-model="deviceEditForm.deviceForm.adminState" placeholder="请选择管理状态">
            <el-option label="UNLOCKED" value="UNLOCKED"></el-option>
            <el-option label="LOCKED" value="LOCKED"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="labels">
          <el-input v-model="deviceEditForm.deviceForm.labels" autocomplete="off" placeholder="请输入标签"></el-input>
        </el-form-item>
        <el-form-item label="协议" prop="protocols">
          <el-input v-model="deviceEditForm.deviceForm.protocols" autocomplete="off" placeholder="请输入协议"></el-input>
        </el-form-item>
        <el-form-item label="设备服务名称" prop="service.name">
          <el-input v-model="deviceEditForm.deviceForm.service.name" autocomplete="off" placeholder="请输入设备服务名称"></el-input>
        </el-form-item>
        <el-form-item label="服务管理状态" prop="service">
          <el-select v-model="deviceEditForm.deviceForm.service.adminState" placeholder="请选择服务管理状态">
            <el-option label="UNLOCKED" value="UNLOCKED"></el-option>
            <el-option label="LOCKED" value="LOCKED"></el-option>
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
  name: 'DeviceEditForm',
  data () {
    return {
      dialogFormVisible: false,
      gwList: [],
      deviceEditForm: {
        gwip: '',
        deviceForm: {
          name: '',
          description: '',
          operatingState: '',
          adminState: '',
          labels: [],
          protocols: {},
          service: {
            name: '',
            adminState: ''
          }
        }
      }
    }
  },
  mounted () {
    this.getGWList()
    this.getProfileList()
  },
  methods: {
    getGWList () {
      this.$axios
        .get('/gateways/gateway').then(resp => {
          if (resp && resp.status === 200) {
            this.gwList = resp.data
          }
        })
    },
    getProfileList () {

    },
    clear () {
      this.deviceEditForm = {
        gwip: '',
        deviceForm: {
          name: '',
          description: '',
          operatingState: '',
          adminState: '',
          labels: [],
          service: {
            name: '',
            adminState: ''
          }
        }
      }
    },
    onSubmit () {
      var _this = this
      this.$axios
        .post('/devices/ip/' + _this.deviceEditForm.gwip, _this.deviceEditForm.deviceForm).then(resp => {
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
