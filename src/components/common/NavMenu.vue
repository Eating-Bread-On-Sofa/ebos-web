<template>
  <div>
    <img src="../../img/logo.jpg" alt="" style="height: 100px; width: 20.8%; position:absolute; top:-100px; left:0; min-width: 120px">
    <span style="position: absolute; right: 100px; padding-top: 0;font-size: 20px;font-weight: bold; top: -90px; line-height:50px;  color: #881401; font-family: 楷体">BJTU边缘计算平台</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="position: absolute; font-size: 40px; padding: 10px; top: -100px; right: 0; color: #881401"></i>
    <el-col :span="5">
      <el-menu
        :default-active="'/index'"
        router
        background-color="#881401"
        text-color="white"
        unique-opened="true"
        active-text-color="#F59044"
        style="min-width: 120px">
        <el-submenu v-for="(item,i) in navList" :key="i" :index="item.name">
          <template slot="title">
            <i :class=item.icon></i>
            <span>{{ item.navItem }}</span>
          </template>
          <el-menu-item class="subMenu" v-for="(subitem,j) in item.subList" :key="j" :index="subitem.name" style="min-width: 120px">{{subitem.subItem}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index',
          navItem: '首页',
          subList: [{name: '/index', subItem: '系统首页'}, {name: '/index2', subItem: '账户设置'}, {name: '/index3', subItem: '系统信息'}],
          icon: 'el-icon-s-order'
        },
        {name: '/gateway',
          navItem: '网关管理',
          subList: [{name: '/gateway', subItem: '网关列表'}],
          icon: 'el-icon-monitor'
        },
        {name: '/messageRouting',
          navItem: '消息路由',
          subList: [{name: '/messageRouting', subItem: '消息路由'}],
          icon: 'el-icon-chat-dot-square'
        },
        {name: '/rule',
          navItem: '规则引擎',
          subList: [{name: '/rule', subItem: '规则列表'}],
          icon: 'el-icon-edit-outline'
        },
        {name: '/profile',
          navItem: '设备模板',
          subList: [{name: '/deviceprofile', subItem: '设备模板'}],
          icon: 'el-icon-document-add'
        },
        {name: '/device',
          navItem: '设备管理',
          subList: [{name: '/device', subItem: '设备列表'}, {name: '/monitor', subItem: '设备监控'}],
          icon: 'el-icon-takeaway-box'
        },
        {name: '/scenario',
          navItem: '场景服务',
          subList: [{name: '/scenario', subItem: '场景服务'}, {name: '/scenarioShow', subItem: '场景展示'}],
          icon: 'el-icon-data-analysis'
        },
        {name: '/command',
          navItem: '指令管理',
          subList: [{name: '/command', subItem: '指令列表'}],
          icon: 'el-icon-set-up'
        },
        {name: '/user',
          navItem: '用户管理',
          subList: [],
          icon: 'el-icon-user'
        },
        {name: '/logIndex',
          navItem: '操作审计',
          subList: [{name: '/log', subItem: '操作日志'}, {name: '/deviceLog', subItem: '设备日志'}, {name: '/gatewayLog', subItem: '网关日志'}],
          icon: 'el-icon-warning-outline'
        }
      ]
    }
  },
  methods: {
    logout () {
      var _this = this
      this.$axios.get('/logout').then(resp => {
        if (resp.data.code === 200) {
          // _this.$store.commit('logout')
          _this.$router.replace('/login')
        }
      })
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  span {
    pointer-events: none;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline: 0;
  }
  .subMenu {
    background-color: #551513 !important;
  }
</style>
