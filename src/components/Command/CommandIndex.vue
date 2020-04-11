<template>
  <el-container>
    <el-side style="width: 150px;margin-top: 20px">
      <command-side-menu></command-side-menu>
    </el-side>
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
