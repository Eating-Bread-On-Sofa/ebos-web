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
<<<<<<< HEAD
import Log from '../components/Log'
import DeviceProfile from '../components/profile/DeviceProfile'
import ProfileFunction from '../components/profile/ProfileFunction'
=======
import LogIndex from '../components/log/LogIndex'
import Log from '../components/log/Log'
import DeviceException from '../components/log/DeviceException'
import GatewayException from '../components/log/GatewayException'
>>>>>>> 70103d682033e863c585e25023f1cb6cd6023400

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
<<<<<<< HEAD
          component: ProfileIndex,
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
          path: '/log',
          name: 'Log',
          component: Log
=======
          component: ProfileIndex
        },
        {
          path: '/logIndex',
          name: 'LogIndex',
          component: LogIndex
>>>>>>> 70103d682033e863c585e25023f1cb6cd6023400
        }
      ]
    },
    {
<<<<<<< HEAD
=======
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
>>>>>>> 70103d682033e863c585e25023f1cb6cd6023400
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
