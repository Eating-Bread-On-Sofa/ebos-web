<template>
    <div>
      <el-button type="primary" icon="el-icon-circle-plus" @click="dialogFormVisible = true"></el-button>
      <el-dialog
        title="新增/修改设备模板"
        :visible.sync="dialogFormVisible"
        @close="clear">
        <el-form v-model="form" style="text-align: left" ref="dataForm">
          <el-form-item label="yaml格式文本">
            <el-input v-model="form" autocomplete="off" placeholder="请输入yaml格式的文本"></el-input>
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
  name: 'ProfileEditForm',
  data () {
    return {
      dialogFormVisible: false,
      form: ''
    }
  },
  methods: {
    clear () {
      this.form = ''
    },
    onSubmit () {
      this.$axios
        .post('')
    }
  }
}
</script>

<style scoped>

</style>
