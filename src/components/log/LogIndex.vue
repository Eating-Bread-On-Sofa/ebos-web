<template>
  <el-container>
    <el-side style="width: 100px;margin-top: 20px">
      <log-side-menu></log-side-menu>
    </el-side>
    <el-main></el-main>
  </el-container>
</template>

<script>
import LogSideMenu from './LogSideMenu'
export default {
  name: 'LogIndex',
  components: {LogSideMenu}
}
</script>

<style scoped>

</style>
