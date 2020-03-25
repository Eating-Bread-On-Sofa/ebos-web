import Vue from 'vue'
import Router from 'vue-router'
import Rule from '@/components/Rule'
import Login from '../components/Login'
import Register from '../components/Register'
import Device from '../components/Device'
import Log from '../components/Log'
import DeviceException from '../components/DeviceException'
import GatewayException from '../components/GatewayException'
import MessageRouting from '@/components/MessageRouting'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Rule',
      name: 'Rule',
      component: Rule
    },
    {
      path: '/Device',
      name: 'Device',
      component: Device
    },
    {
      path: '/Log',
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
      path: '/MessageRouting',
      name: 'MessageRouting',
      component: MessageRouting
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
