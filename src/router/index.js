import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Rule from '@/components/Rule'
import Login from '../components/Login'
import Register from '../components/Register'
import Device from '../components/Device'
import Log from '../components/Log'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
