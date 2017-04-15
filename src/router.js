import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const routes = [
  { path: '/', component: require('./views/search') },
  { path: '/about', component: require('./views/about') }
]

export default new Router({
  routes,
  mode: 'history'
})
