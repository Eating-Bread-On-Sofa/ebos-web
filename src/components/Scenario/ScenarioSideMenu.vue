<template>
  <el-row class="submenu">
    <div style="background-color: #a4da89;height: 50px;padding-top: 20px">
      <i class="el-icon-s-open"></i>
      <h4 style="display: inline">场景服务</h4>
    </div>
    <el-menu
      default-active="/scenarioservice"
      active-text-color="red"
      router>
      <el-menu-item v-for="(item, i) in ScenarioMenu" :index="item.name" :key="i">
        <i class="el-icon-s-order"></i>
        {{item.menuname}}
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'ScenarioSideMenu',
  data () {
    return {
      ScenarioMenu: [
        {name: '/scenarioservice', menuname: '场景服务'}
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
