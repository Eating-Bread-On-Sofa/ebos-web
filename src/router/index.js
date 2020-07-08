import Vue from 'vue'
import Rule from '../components/rule/Rule'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Device from '../components/device/Device'
import MessageRouting from '../components/messagerouting/MessageRouting'
import AppIndex from '../components/home/AppIndex'
import ProfileIndex from '../components/profile/ProfileIndex'
import DeviceProfile from '../components/profile/DeviceProfile'
import LogIndex from '../components/log/LogIndex'
import OamLog from '../components/log/OamLog'
import GwinstLog from '../components/log/GwinstLog'
import ScenarioIndex from '../components/Scenario/ScenarioIndex'
import ScenarioService from '../components/Scenario/ScenarioService'
import MessageRoutingIndex from '../components/messagerouting/MessageRoutingIndex'
import RuleIndex from '../components/rule/RuleIndex'
import DeviceIndex from '../components/device/DeviceIndex'
import GatewayIndex from '../components/gateway/GatewayIndex'
import Gateway from '../components/gateway/Gateway'
import CommandIndex from '../components/command/CommandIndex'
import Command from '../components/command/Command'
import DeviceMonitor from '../components/device/DeviceMonitor'
import ScenarioShow from '../components/Scenario/ScenarioShow'
import ServiceManage from '../components/gateway/ServiceManage'
import GatewayService from '../components/gateway/GatewayService'
import ProfileLib from '../components/profile/ProfileLib'

import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history', // 将模式转换成history模式
  // base: '/bjtu/', // 配置路由的根目录
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      // meta: {
      //   requireAuth: true
      // },
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex
          // meta: {
          //   requireAuth: true
          // }
        },
        {
          path: '/ruleIndex',
          name: 'RuleIndex',
          component: RuleIndex,
          redirect: '/rule',
          children: [
            {
              path: '/rule',
              name: 'Rule',
              component: Rule
              // meta: {
              //   requireAuth: true
              // }
            }
          ]
        },
        {
          path: '/gatewayIndex',
          name: 'GatewayIndex',
          component: GatewayIndex,
          redirect: '/gateway',
          children: [
            {
              path: '/gateway',
              name: 'Gateway',
              component: Gateway
              // meta: {
              //   requireAuth: true
              // }
            },
            {
              path: '/gatewayService',
              name: 'GatewayServcie',
              component: GatewayService
              // meta: {
              //   requireAuth: true
              // }
            },
            {
              path: '/serviceManage',
              name: 'ServiceManage',
              component: ServiceManage
              // meta: {
              //   requireAuth: true
              // }
            }
          ]
        },
        {
          path: '/deviceIndex',
          name: 'DeviceIndex',
          component: DeviceIndex,
          redirect: '/device',
          children: [
            {
              path: '/device',
              name: 'Device',
              component: Device
              // meta: {
              //   requireAuth: true
              // }
            },
            {
              path: '/monitor',
              name: 'DeviceMonitor',
              component: DeviceMonitor
              // meta: {
              //   requireAuth: true
              // }
            }
          ]
        },
        {
          path: '/messageRoutingIndex',
          name: 'MessageRoutingIndex',
          component: MessageRoutingIndex,
          redirect: '/messageRouting',
          children: [
            {
              path: '/messageRouting',
              name: 'MessageRouting',
              component: MessageRouting
              // meta: {
              //   requireAuth: true
              // }
            }
          ]
        },
        {
          path: '/profileIndex',
          name: 'ProfileIndex',
          component: ProfileIndex,
          redirect: '/deviceProfile',
          children: [
            {
              path: '/deviceProfile',
              name: 'DeviceProfile',
              component: DeviceProfile
              // meta: {
              //   requireAuth: true
              // }
            },
            {
              path: '/profileLib',
              name: 'ProfileLib',
              component: ProfileLib
              // meta: {
              //   requireAuth: true
              // }
            }
          ]
        },
        {
          path: '/scenarioIndex',
          name: 'ScenarioIndex',
          component: ScenarioIndex,
          redirect: '/scenario',
          children: [
            {
              path: '/scenario',
              name: 'ScenarioService',
              component: ScenarioService
              // meta: {
              //   requireAuth: true
              // }
            },
            {
              path: '/scenarioShow',
              name: 'ScenarioShow',
              component: ScenarioShow
              // meta: {
              //   requireAuth: true
              // }
            }
          ]
        },
        {
          path: '/commandIndex',
          name: 'CommandIndex',
          component: CommandIndex,
          redirect: '/command',
          children: [
            {
              path: '/command',
              name: 'Command',
              component: Command
              // meta: {
              //   requireAuth: true
              // }
            }
          ]
        },
        {
          path: '/logIndex',
          name: 'LogIndex',
          component: LogIndex,
          redirect: '/oamlog',
          children: [
            {
              path: '/oamlog',
              name: 'OamLog',
              component: OamLog
              // meta: {
              //   requireAuth: true
              // }
            },
            {
              path: '/gwinstLog',
              name: 'GwinstLog',
              component: GwinstLog
              // meta: {
              //   requireAuth: true
              // }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
