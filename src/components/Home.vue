<template>
  <el-container>
    <el-header style="height: 100px">
      <img src="../img/logo.jpg" alt="" style="position: absolute; left: 0px;height: 100px; width: 200px;min-width: 120px">
      <span style="position: absolute;right: 100px;font-size: 40px;font-weight: bold;line-height:100px; color: #881401; font-family: 楷体">BJTU边缘计算平台</span>
      <i class="el-icon-switch-button" v-on:click="logout" style="float: right;margin-top: 20px;font-size: 40px; padding: 10px;color: #881401"></i>
    </el-header>
    <el-container>
      <el-aside style="width: 200px;height: 100%">
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
      this.$axios.get('/logout').then(resp => {
        if (resp.data.code === 200) {
          // _this.$store.commit('logout')
          _this.$router.replace('/login')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
