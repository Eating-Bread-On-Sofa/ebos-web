<template>
  <el-container>
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
import ProfileFunction from './ProfileFunction'
export default {
  name: 'ProfileIndex',
  components: {ProfileFunction, DeviceProfile, ProfileSideMenu}
}
</script>

<style scoped>
</style>
