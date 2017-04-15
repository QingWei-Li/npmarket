import Vue from 'vue'
import router from './router'
import api from './api'
import Vueo from 'vueo'
import App from './App'

Vue.use(api)
Vue.use(Vueo)

if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
