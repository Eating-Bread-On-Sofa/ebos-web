<template>
  <el-container style="margin-top: 5px;margin-right: 5px;margin-left: 5px">
    <el-aside style="width: 150px;margin-top: 20px">
      <device-side-menu></device-side-menu>
    </el-aside>
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
