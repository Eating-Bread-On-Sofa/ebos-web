<template>
  <el-container style="margin-top: 5px;margin-right: 5px;margin-left: 5px">
    <el-aside style="width: 150px;margin-top: 20px">
      <command-side-menu></command-side-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import CommandSideMenu from './CommandSideMenu'
export default {
  name: 'CommandIndex',
  components: {CommandSideMenu}
}
</script>

<style scoped>

</style>
