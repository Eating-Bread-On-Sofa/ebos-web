<template>
    <div>
      <el-dialog
        title="新增设备模板"
        :visible.sync="dialogFormVisible"
        @close="clear">
<!--        <el-form v-model="form" style="text-align: left" ref="dataForm">-->
<!--          <el-form-item label="yaml格式文本">-->
<!--            <el-input type="textarea" :row="10" v-model="form" autocomplete="off" placeholder="请输入yaml格式的文本"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->

<!--        <el-input v-model="gwip" autocomplete="off" placeholder="请输入网关的IP地址"></el-input>-->
        <el-form v-model="profileForm" style="text-align: left">
          <el-form-item label="选择网关" prop="gwip">
            <el-select v-model="profileForm.gwip" placeholer="请选择网关IP">
              <el-option v-for="item in gwList" :key="item.ip" :label="item.name" :value="item.ip"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="yml描述" prop="text">
            <el-input type="textarea" row="10" v-model="profileForm.text" placeholder="请检查上传yml文件内容，或输入yml格式文本"></el-input>
            <file-reader @load="profileForm.text = $event"></file-reader>
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
import FileReader from './FileReader'
export default {
  name: 'ProfileEditForm',
  components: {FileReader},
  data () {
    return {
      dialogFormVisible: false,
      profileForm: {
        gwip: '',
        text: ''
      },
      gwList: []
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
        })
    },
    clear () {
      this.profileForm = {}
    },
    onSubmit () {
      var _this = this
      var axios = require('axios')
      var instance = axios.create({
        headers: {'content-type': 'text/plain'}
      })
      instance.post('profiles/ip/' + _this.profileForm.gwip + '/yml', _this.profileForm.text
      ).then(resp => {
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
