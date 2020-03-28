<template>
  <el-container>
    <el-side style="width: 150px;margin-top: 20px">
      <scenario-side-menu></scenario-side-menu>
    </el-side>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import ScenarioSideMenu from './ScenarioSideMenu'
export default {
  name: 'ScenarioIndex',
  components: {ScenarioSideMenu}
}
</script>

<style scoped>

</style>
