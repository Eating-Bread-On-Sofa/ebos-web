<template>
  <el-container>
    <el-header style="width: 100%;height: 50px;padding: 0px;background-color: #333">
      <el-card class="admin-header">
        <a href="/index">
          <img src="../img/logo.jpg" alt="" style="float: left;height: 50px; width: 200px;min-width: 120px">
        </a>
        <span style="position: absolute;left: 220px;font-size: 20px;font-weight: bold;line-height:50px; color: white; font-family: 楷体">BJTU边缘计算平台后台管理系统</span>
        <span style="position: absolute;right: 20px;"><i class="el-icon-switch-button" v-on:click="logout" style="float: right;margin-top: 10px;font-size: 20px; padding: 5px;color: white"></i></span>
      </el-card>
    </el-header>
    <el-container>
      <el-aside style="background-color: #333 !important;width: 200px;height: 1000px">
        <admin-menu></admin-menu>
      </el-aside>
      <el-main style="padding: 0px;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminMenu from './AdminMenu'
import createRouter from '../../router'
export default {
  name: 'AdminIndex',
  components: {AdminMenu},
  logout () {
    this.$axios.get('/users/logout').then(resp => {
      if (resp && resp.status === 200) {
        this.$store.commit('logout')
        this.$router.replace('/index')
        // 清空路由，防止路由重复加载
        const newRouter = createRouter()
        this.$router.matcher = newRouter.matcher
      }
    }).catch(() => {})
  }
}
</script>

<style scoped>
  .admin-header {
    opacity: 0.85;
  }

</style>
