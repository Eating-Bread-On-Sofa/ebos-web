<template>
    <div>
      <dialog
        title="查看该场景下的设备状况"
        :visible.sync="dialogFormVisible"
        width="30%"
        @close="clear">
        <el-table
          :data="tableData"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          tooltip-effect="dark"
          border
          style="width: 100%">
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="设备" prop="device"></el-table-column>
          <el-table-column label="起始" prop="origin"></el-table-column>
          <el-table-column label="值" prop="value"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭</el-button>
        </div>
      </dialog>
    </div>
</template>

<script>
export default {
  name: 'ScenarioDeviceState',
  data () {
    return {
      dialogFormVisible: false,
      deviceData: []
    }
  },
  methods: {
    clear () {
      this.deviceData = []
    }
  }
}
</script>

<style scoped>

</style>
