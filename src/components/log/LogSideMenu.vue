<template>
  <el-row class="submenu">
    <div style="background-color: #a4da89;height: 50px;padding-top: 20px">
      <i class="el-icon-s-home"></i>
      <h4 style="display: inline">操作审计</h4>
    </div>
    <el-menu
      default-active="0"
      active-text-color="red"
      @select="handleSelect">
      <el-menu-item index="0">
        <i class="el-icon-s-platform"></i>
        <span slot="title">操作日志</span>
      </el-menu-item>
      <el-menu-item index="1">
        <i class="el-icon-s-custom"></i>
        <span slot="title">设备异常</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">网关异常</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'LogSideMenu',
  methods: {
    handleSelect (key) {
      switch (key) {
        case '0':
          this.$router.push('/log')
          break
        case '1':
          this.$router.push('/DeviceException')
          break
        case '2':
          this.$router.push('/GatewayException')
          break
      }
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
