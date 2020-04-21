<template>
    <div>
      <el-dialog
        title="场景详情展示"
        :visible.sync="dialogFormVisible"
        @close="clear">
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'ScenarioShow',
  data () {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    clear () {}
  }
}
</script>

<style scoped>

</style>
