<template>
  <el-container>
    <el-header style="width: 100%;height: 50px;padding: 0px;background-color: #333">
      <img :src="info.logoUrl" alt="" style="float: left;height: 50px; width: 200px;min-width: 120px">
      <span style="position: absolute;left: 220px;font-size: 20px;font-weight: bold;line-height:50px; color: white; font-family: 楷体">{{ info.name }}</span>
        <i class="el-icon-switch-button" v-on:click="logout" style="float: right;margin-top: 10px;font-size: 20px; padding: 5px;color: white"></i>
      <span style="float: right;margin-top: 10px;margin-right: 10px; padding: 8px;">
        <el-badge :value="messageCount" :max="99" class="item">
        <i class="el-icon-bell" v-on:click="message" style="padding-right: 2px;font-size: 20px;color: white"></i>
        </el-badge>
      </span>
    </el-header>
    <el-container>
      <nav-menu style="min-height: 800px;background-color: #333 !important"></nav-menu>
      <el-main style="padding: 0px;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from './common/NavMenu'
import {createRouter} from '../router'

export default {
  name: 'Home',
  components: {NavMenu},
  data () {
    return {
      messageCount: '',
      info: {
        name: '',
        logoUrl: '',
        nameAdmin: ''
      }
    }
  },
  // computed: {
  //   logo () {
  //     return localStorage.socket + '/u/file/' + this.info.logoUrl
  //   }
  // },
  mounted () {
    this.loadSysInfo()
    this.ruleAlert()
    this.messageCount = this.$store.state.messageCenter.length
  },
  methods: {
    loadSysInfo () {
      // 实际API
      // this.$axios.get('http://localhost:8093/api/system/info').then(resp => {
      // kong网关代理API
      this.$axios.get(localStorage.socket + '/u/system/info').then(resp => {
      // this.$axios.get('http://localhost:8000/u/system/info').then(resp => {
      // 开发代理API
      // this.$axios.get('/users/system/info').then(resp => {
        if (resp && resp.data.code === 200) {
          this.info.logoUrl = localStorage.socket + '/u/file/' + resp.data.result[0].logoUrl
          this.info.name = resp.data.result[0].name
          this.info.nameAdmin = resp.data.result[0].nameAdmin
        }
      }).catch(() => {
        this.$message.error('获取系统信息失败')
      })
    },
    ruleAlert () {
      var that = this
      setInterval(function () {
        // 实际API
        // that.$axios.get('http://localhost:8083/api/ruleAlert').then(resp => {
        // kong网关代理API
        that.$axios.get(localStorage.socket + '/rc/ruleAlert').then(resp => {
          // that.$axios.get('http://localhost:8000/rc/ruleAlert').then(resp => {
          // 开发模式下代理API
          // that.$axios.get('/rules/ruleAlert').then(resp => {
          // var flag = resp.data.alertFlag
          // var msg = resp.data.alertMsg
          // if (flag === true) {
          //   that.$notify({
          //     title: '设备告警：',
          //     message: msg,
          //     type: 'warning',
          //     duration: 0
          //   })
          // }
          var list = resp.data.alertList
          if (list.length) {
            for (let alert of list) {
              if (this.$notify) {
                this.$store.commit('addMessage', alert)
                this.$notify.close()
              }
              that.$notify({
                title: '设备告警：',
                message: alert,
                type: 'warning',
                duration: 0
              })
            }
          }
        })
      }, 5000)
    },
    message () {
      this.$router.replace('/messageCenter')
    },
    logout () {
      var _this = this
      // 实际API
      // this.$axios.get('http://localhost:8093/api/logout').then(resp => {
      // kong网关代理API
      this.$axios.get(localStorage.socket + '/u/logout').then(resp => {
      // this.$axios.get('http://localhost:8000/u/logout').then(resp => {
      // 开发代理API
      // this.$axios.get('/users/logout').then(resp => {
        if (resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/login')
          // 清空路由，防止路由重复加载
          const newRouter = createRouter()
          _this.$router.matcher = newRouter.matcher
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
