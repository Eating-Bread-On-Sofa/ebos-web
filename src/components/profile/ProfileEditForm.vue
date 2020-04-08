<template>
    <div>
      <el-dialog
        title="新增/修改设备模板"
        :visible.sync="dialogFormVisible"
        @close="clear">
<!--        <el-form v-model="form" style="text-align: left" ref="dataForm">-->
<!--          <el-form-item label="yaml格式文本">-->
<!--            <el-input type="textarea" :row="10" v-model="form" autocomplete="off" placeholder="请输入yaml格式的文本"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogFormVisible = false">取消</el-button>-->
<!--          <el-button type="primary" @click="onSubmit">确定</el-button>-->
<!--        </div>-->
        <el-input type="textarea" row="10" v-model="text"></el-input>
        <file-reader @load="text = $event"></file-reader>

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
      text: ''
    }
  },
  methods: {
    clear () {
      this.text = ''
    }
  }

}
</script>

<style scoped>

</style>
