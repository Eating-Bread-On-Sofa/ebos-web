<template>
  <el-container style="margin-top: 5px;margin-right: 5px;margin-left: 5px">
    <el-side style="width: 150px;margin-top: 20px">
      <profile-side-menu></profile-side-menu>
    </el-side>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>

</template>

<script>
import ProfileSideMenu from './ProfileSideMenu'
import DeviceProfile from './DeviceProfile'
export default {
  name: 'ProfileIndex',
  components: {DeviceProfile, ProfileSideMenu}
}
</script>

<style scoped>
</style>
