// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font_icon/iconfont.css'
import store from './store'
import router from './router'
import App from './App'
import './style/style.css'

// Vue.use(Loading.directive)
Vue.use(ElementUI, {size: 'small'})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

// Vue.prototype.$loading = Loading.service
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
// Vue.prototype.$message = Message
// 设置代理，前端请求默认发送到 http://localhost:
var axios1 = require('axios')
var axios = axios1.create({
  withCredentials: false,
  crossDomain: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// axios.defaults.baseURL = 'http://localhost:8000'
// 让前端能够带上 cookie，我们需要通过 axios 主动开启 withCredentials 功能
axios.defaults.withCredentials = false
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
