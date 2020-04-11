<template>
  <el-container>
    <el-side style="width: 150px;margin-top: 20px">
      <gateway-side-menu></gateway-side-menu>
    </el-side>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import GatewaySideMenu from './GatewaySideMenu'
import Gateway from './Gateway'
export default {
  name: 'GatewayIndex',
  components: {GatewaySideMenu, Gateway}
}
</script>

<style scoped>

</style>
