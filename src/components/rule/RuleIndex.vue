<template>
  <el-container style="margin-top: 5px;margin-right: 5px;margin-left: 5px">
    <el-aside style="width: 150px;margin-top: 20px">
      <rule-side-menu></rule-side-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import RuleSideMenu from './RuleSideMenu'
export default {
  name: 'RuleIndex',
  components: {RuleSideMenu}
}
</script>

<style scoped>

</style>
