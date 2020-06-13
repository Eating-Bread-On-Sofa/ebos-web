<template>
  <div>
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>模板库</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ProfilesLibrary'
}
</script>

<style scoped>

</style>
