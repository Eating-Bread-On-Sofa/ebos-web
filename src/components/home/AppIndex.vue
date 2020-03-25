<template>
  <el-container>
    <el-side style="width: 100px;margin-top: 20px">
      <home-side-menu></home-side-menu>
    </el-side>
    <el-main></el-main>
  </el-container>
</template>

<script>
import HomeSideMenu from './HomeSideMenu'
export default {
  name: 'AppIndex',
  components: {HomeSideMenu}
}
</script>

<style scoped>

</style>
