<template>
  <el-container style="margin-top: 5px;margin-right: 5px;margin-left: 5px">
<!--    <el-aside style="width: 150px;margin-top: 20px">-->
<!--      <gateway-side-menu></gateway-side-menu>-->
<!--    </el-aside>-->
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import GatewaySideMenu from './GatewaySideMenu'
export default {
  name: 'GatewayIndex',
  components: {GatewaySideMenu}
}
</script>

<style scoped>

</style>
