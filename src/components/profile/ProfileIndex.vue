<template>
  <el-container>
    <el-side style="width: 150px;margin-top: 20px">
      <profile-side-menu></profile-side-menu>
    </el-side>
    <el-main></el-main>
  </el-container>

</template>

<script>
import ProfileSideMenu from './ProfileSideMenu'
export default {
  name: 'ProfileIndex',
  components: {ProfileSideMenu}
}
</script>

<style scoped>
</style>
