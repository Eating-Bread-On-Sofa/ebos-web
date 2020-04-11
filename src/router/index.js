import Vue from 'vue'
import Router from 'vue-router'
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
import Log from '../components/log/Log'
import DeviceException from '../components/log/DeviceException'
import GatewayException from '../components/log/GatewayException'
import ScenarioIndex from '../components/Scenario/ScenarioIndex'
import ScenarioService from '../components/Scenario/ScenarioService'
import DeviceService from '../components/Scenario/DeviceService'
import MessageRoutingIndex from '../components/messagerouting/MessageRoutingIndex'
import RuleIndex from '../components/rule/RuleIndex'
import DeviceIndex from '../components/device/DeviceIndex'
import GatewayIndex from '../components/Gateway/GatewayIndex'
import Gateway from '../components/Gateway/Gateway'
import CommandIndex from '../components/Command/CommandIndex'
import Command from '../components/Command/Command'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex
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
            }
          ]
        },
        {
          path: '/profile',
          name: 'ProfileIndex',
          component: ProfileIndex,
          redirect: '/deviceprofile',
          children: [
            {
              path: '/deviceprofile',
              name: 'DeviceProfile',
              component: DeviceProfile
            }
          ]
        },
        {
          path: '/scenario',
          name: 'ScenarioIndex',
          component: ScenarioIndex,
          redirect: '/scenarioservice',
          children: [
            {
              path: '/scenarioservice',
              name: 'ScenarioService',
              component: ScenarioService
            },
            {
              path: '/deviceservice',
              name: 'DeviceService',
              component: DeviceService
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
            }
          ]
        },
        {
          path: '/logIndex',
          name: 'LogIndex',
          component: LogIndex,
          redirect: '/log',
          children: [
            {
              path: '/log',
              name: 'Log',
              component: Log
            },
            {
              path: '/deviceException',
              name: 'DeviceException',
              component: DeviceException
            },
            {
              path: '/gatewayException',
              name: 'GatewayException',
              component: GatewayException
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
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
