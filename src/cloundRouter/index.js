import Vue from 'vue'
import Router from 'vue-router'
const App = resolve => require(['../cloundManager/index.vue'], resolve)
const userManager = resolve => require(['../cloundManager/userManager.vue'], resolve)
const businessManager = resolve => require(['../cloundManager/businessManager.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      children: [
        { path: 'businessManager', component: businessManager, name: '商户管理', meta: { title: '商户管理' }},
        { path: 'userManager', component: userManager, name: '用户管理', meta: { title: '用户管理' }},
      ]
    }
  ]
})
