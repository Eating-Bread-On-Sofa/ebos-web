<template>
  <el-container>
    <el-header style="width: 100%;height: 50px;padding: 0px;background-color: #333">
      <img src="../img/logo.jpg" alt="" style="float: left;height: 50px; width: 200px;min-width: 120px">
      <span style="position: absolute;right: 100px;font-size: 20px;font-weight: bold;line-height:50px; color: #881401; font-family: 楷体">BJTU边缘计算平台</span>
      <i class="el-icon-switch-button" v-on:click="logout" style="float: right;margin-top: 10px;font-size: 20px; padding: 5px;color: #881401"></i>
    </el-header>
    <el-container>
      <el-aside style="background-color: #333 !important;width: 200px;height: 1000px">
        <nav-menu></nav-menu>
      </el-aside>
      <el-main style="padding: 0px;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from './common/NavMenu'
export default {
  name: 'Home',
  components: {NavMenu},
  methods: {
    logout () {
      var _this = this
      this.$axios.get('/users/logout').then(resp => {
        if (resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/login')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
