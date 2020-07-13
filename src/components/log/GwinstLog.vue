<template>
  <div>
    <el-dialog
      title="请先选择网关"
      width="30%"
      :visible.sync="selectDialog">
      <el-form v-model="gwip" label-width="35%" style="text-align: left">
        <el-form-item label="选择网关">
          <el-select style="width: 240px" v-model="gwip" placeholder="请选择网关查看设备">
            <el-option v-for="(item, i) in gwList" :key="i" :label="item.ip" :value="item.ip">
              <span style="float: left">网关名称：{{ item.name }}</span>
              <span style="float: right;color: #551513;font-size: 13px">IP：{{ item.ip }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="selectDialog = false">取消</el-button>
        <el-button type="primary" @click="selectDialog = false">确定</el-button>
      </div>
    </el-dialog>
    <log :come="come" :ip="gwip" :port="port"></log>
  </div>
</template>

<script>
import Log from './Log'
export default {
  name: 'GwinstLog',
  components: {Log},
  data () {
    return {
      come: '网关日志',
      port: '8090',
      gwip: '',
      gwList: [],
      selectDialog: false
    }
  },
  mounted () {
    this.selectGw()
  },
  methods: {
    selectGw () {
      // 实际API
      // this.$axios.get('http://localhost:8089/api/gateway').then(resp => {
      // kong网关代理API
      // this.$axios.get('http://localhost:8000/gc').then(resp => {
      // 开发模式下代理API
      this.$axios.get('/gateways').then(resp => {
        if (resp && resp.status === 200) {
          this.gwList = resp.data
          this.selectDialog = true
        }
      }).catch(() => {
        this.$message.error('获取网关信息失败！')
      })
    }
  }
}
</script>

<style scoped>

</style>
