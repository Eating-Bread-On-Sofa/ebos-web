<template>
    <el-container style="margin-top: 5px;margin-right: 5px;margin-left: 5px">
      <el-side style="width: 150px;margin-top: 20px">
        <message-routing-side-menu></message-routing-side-menu>
      </el-side>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
</template>

<script>
import MessageRoutingSideMenu from './MessageRoutingSideMenu'
export default {
  name: 'MessageRoutingIndex',
  components: {MessageRoutingSideMenu}
}
</script>

<style scoped>

</style>
