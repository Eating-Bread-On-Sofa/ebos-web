<template>
  <el-container style="margin-top: 5px;margin-right: 5px;margin-left: 5px">
<!--    <el-aside style="width: 150px;margin-top: 20px">-->
<!--      <log-side-menu></log-side-menu>-->
<!--    </el-aside>-->
    <el-main>
      <router-view/>
    </el-main>
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
