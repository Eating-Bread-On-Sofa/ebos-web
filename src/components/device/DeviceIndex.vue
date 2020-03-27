<template>
  <el-container>
    <el-side style="width: 150px;margin-top: 20px">
      <device-side-menu></device-side-menu>
    </el-side>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import DeviceSideMenu from './DeviceSideMenu'
export default {
  name: 'DeviceIndex',
  components: {DeviceSideMenu}
}
</script>

<style scoped>

</style>
