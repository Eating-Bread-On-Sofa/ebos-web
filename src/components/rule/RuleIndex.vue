<template>
  <el-container>
    <el-side style="width: 150px;margin-top: 20px">
      <rule-side-menu></rule-side-menu>
    </el-side>
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
