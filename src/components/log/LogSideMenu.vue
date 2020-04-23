<template>
  <el-row class="submenu">
    <div style="background-color: #a4da89;height: 50px;padding-top: 20px">
      <i class="el-icon-s-open"></i>
      <h4 style="display: inline">操作审计</h4>
    </div>
    <el-menu
      default-active="/log"
      active-text-color="red"
      router>
      <el-menu-item v-for="(item, i) in MenuList" :index="item.name" :key="i">
        <i class="el-icon-s-order"></i>
        {{item.menuname}}
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'LogSideMenu',
  data () {
    return {
      MenuList: [
        {name: '/log', menuname: '操作日志'},
        {name: '/deviceLog', menuname: '设备日志'},
        {name: '/gatewayLog', menuname: '网关日志'}
      ]
    }
  }
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
