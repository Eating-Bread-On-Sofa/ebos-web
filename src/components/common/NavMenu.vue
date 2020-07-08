<template>
  <div>
    <el-menu
      default-active="/index"
      router
      unique-opened
      background-color="transparent"
      text-color="#999"
      active-text-color="#36bed6">
      <el-submenu v-for="(item,i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <i :class=item.icon></i>
          <span>{{ item.navItem }}</span>
        </template>
        <el-menu-item class="subMenu" v-for="(subItem,j) in item.subList" :key="j" :index="subItem.name">{{subItem.subItem}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index',
          navItem: '首　　页',
          subList: [{name: '/index', subItem: '系统首页'}, {name: '/index2', subItem: '账户设置'}, {name: '/systemSetting', subItem: '系统信息'}],
          icon: 'el-icon-s-order'
        },
        {name: '/commandIndex',
          navItem: '指令管理',
          subList: [{name: '/command', subItem: '指令列表'}],
          icon: 'el-icon-set-up'
        },
        {name: '/messageRoutingIndex',
          navItem: '消息路由',
          subList: [{name: '/messageRouting', subItem: '消息路由'}],
          icon: 'el-icon-chat-dot-square'
        },
        {name: '/ruleIndex',
          navItem: '规则引擎',
          subList: [{name: '/rule', subItem: '规则列表'}],
          icon: 'el-icon-edit-outline'
        },
        {name: '/profileIndex',
          navItem: '设备模板',
          subList: [{name: '/deviceProfile', subItem: '模板管理'}, {name: '/profileLib', subItem: '模板库'}],
          icon: 'el-icon-document-add'
        },
        {name: '/deviceIndex',
          navItem: '设备管理',
          subList: [{name: '/device', subItem: '设备列表'}, {name: '/monitor', subItem: '设备监控'}],
          icon: 'el-icon-takeaway-box'
        },
        {name: '/scenarioIndex',
          navItem: '场景服务',
          subList: [{name: '/scenario', subItem: '场景服务'}, {name: '/scenarioShow', subItem: '场景展示'}],
          icon: 'el-icon-data-analysis'
        },
        {name: '/gatewayIndex',
          navItem: '网关管理',
          subList: [{name: '/gateway', subItem: '网关列表'}, {name: '/gatewayService', subItem: '网关服务'}, {name: '/serviceManage', subItem: '服务管理'}],
          icon: 'el-icon-monitor'
        },
        {name: '/user',
          navItem: '用户管理',
          subList: [],
          icon: 'el-icon-user'
        },
        {name: '/logIndex',
          navItem: '操作审计',
          subList: [{name: '/log', subItem: '操作日志'}],
          // subList: [{name: '/log', subItem: '操作日志'}, {name: '/deviceLog', subItem: '设备日志'}, {name: '/gatewayLog', subItem: '网关日志'}],
          icon: 'el-icon-warning-outline'
        }
      ]
    }
  }
  // methods: {
  //   logout () {
  //     var _this = this
  //     this.$axios.get('/logout').then(resp => {
  //       if (resp.data.code === 200) {
  //         // _this.$store.commit('logout')
  //         _this.$router.replace('/login')
  //       }
  //     })
  //   }
  // }
}
</script>

<style scoped>
  .subMenu {
    background-color: #333 !important;
  }
</style>
