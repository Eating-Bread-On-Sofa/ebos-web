<template>
    <div>
      <el-dialog
        title="新增消息路由"
        width="30%"
        :visible.sync="dialogFormVisible"
        @close="clear">
        <el-form v-model="FormData" label-width="120px" style="text-align: left">
          <el-form-item label="消息路由名称">
            <el-input v-model="FormData.name" placeholder="请输入消息路由名称"></el-input>
          </el-form-item>
          <el-form-item label="传入队列">
            <el-input v-model="FormData.incomingQueue" placeholder="请输入传入队列名称"></el-input>
          </el-form-item>
          <el-form-item label="传出队列">
            <el-input v-model="FormData.outcomingQueue" placeholder="请输入传出队列名称"></el-input>
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
  name: 'MessageRoutingEditForm',
  data () {
    return {
      dialogFormVisible: false,
      FormData: {
        name: '',
        incomingQueue: '',
        outcomingQueue: ''
      }
    }
  },
  methods: {
    clear () {
      this.FormData = {}
    },
    onSubmit () {
      var _this = this
      this.$axios
<<<<<<< HEAD
        .post('/mqrouters/', _this.FormData).then(resp => {
=======
        .post('http://localhost:8000/mqr', _this.FormData).then(resp => {
        // .post('/mqrouters/', _this.FormData).then(resp => {
>>>>>>> 3849457aeb372fe79896a0b9b013b5a52631bfed
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
