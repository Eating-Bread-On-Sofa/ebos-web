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
import Log from '../components/Log'

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
          component: ProfileIndex
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
