<template>
  <el-row class="submenu">
    <div style="background-color: #a4da89;height: 50px;padding-top: 20px">
      <i class="el-icon-s-open"></i>
      <h4 style="display: inline">网关管理</h4>
    </div>
    <el-menu
      default-active="/gateway"
      active-text-color="red"
      router>
      <el-menu-item v-for="(item, i) in GatewayMenu" :index="item.name" :key="i">
        <i class="el-icon-s-order"></i>
        {{item.menuname}}
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'GatewaySideMenu',
  data () {
    return {
      GatewayMenu: [
        {name: '/gateway', menuname: '网关列表'}
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
