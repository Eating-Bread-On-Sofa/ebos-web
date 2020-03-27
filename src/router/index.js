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
import ProfileFunction from '../components/profile/ProfileFunction'
import LogIndex from '../components/log/LogIndex'
import Log from '../components/log/Log'
import DeviceException from '../components/log/DeviceException'
import GatewayException from '../components/log/GatewayException'
import ScenarioIndex from '../components/Scenario/ScenarioIndex'
import ScenarioService from '../components/Scenario/ScenarioService'
import DeviceService from '../components/Scenario/DeviceService'

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
          path: '/rule',
          name: 'Rule',
          component: Rule
        },
        {
          path: '/device',
          name: 'Device',
          component: Device
        },
        {
          path: '/messageRouting',
          name: 'MessageRouting',
          component: MessageRouting
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
            },
            {
              path: '/profilefunction',
              name: 'ProfileFunction',
              component: ProfileFunction
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
          path: '/log',
          name: 'Log',
          component: Log
        },
        {
          path: '/logIndex',
          name: 'LogIndex',
          component: LogIndex
        }
      ]
    },
    {
      path: '/log',
      name: 'Log',
      component: Log
    },
    {
      path: '/DeviceException',
      name: 'DeviceException',
      component: DeviceException
    },
    {
      path: '/GatewayException',
      name: 'GatewayException',
      component: GatewayException
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
