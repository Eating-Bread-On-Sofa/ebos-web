<template>
  <el-row class="submenu">
    <div style="background-color: #a4da89;height: 50px;padding-top: 20px">
      <i class="el-icon-s-open"></i>
      <h4 style="display: inline">设备模板</h4>
    </div>
    <el-menu
      default-active="0"
      active-text-color="red">
      <el-menu-item index="0">
        <i class="el-icon-s-order"></i>
        <span slot="title">设备模板管理</span>
      </el-menu-item>
      <el-menu-item index="1">
        <i class="el-icon-s-operation"></i>
        <span slot="title">模板功能管理</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'ProfileSideMenu'
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
