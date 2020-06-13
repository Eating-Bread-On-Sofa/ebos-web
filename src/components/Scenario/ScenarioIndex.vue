<template>
  <el-container style="margin-top: 5px;margin-right: 5px;margin-left: 5px">
<!--    <el-aside style="width: 150px;margin-top: 20px">-->
<!--      <scenario-side-menu></scenario-side-menu>-->
<!--    </el-aside>-->
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
