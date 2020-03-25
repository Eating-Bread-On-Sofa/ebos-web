<template>
  <el-row class="submenu">
    <div style="background-color: #a4da89;height: 50px;padding-top: 20px">
      <i class="el-icon-s-home"></i>
      <h4 style="display: inline">系统首页</h4>
    </div>
    <el-menu
      default-active="0"
      active-text-color="red">
      <el-menu-item index="0">
        <i class="el-icon-s-platform"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-menu-item index="1">
        <i class="el-icon-s-custom"></i>
        <span slot="title">账户设置</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">系统信息</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'HomeSideMenu'
}
</script>

<style scoped>
  .submenu {
    position: fixed;
    margin-left: auto;
    left: 10px;
    top: 100px;
    width: 150px;
  }

</style>
