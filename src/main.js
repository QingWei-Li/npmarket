import './polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import api from './api'
import Vueo from 'vueo'
import App from './App'
import Timeago from 'vue-timeago'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)
Vue.use(api)
Vue.use(Vueo)
Vue.use(Timeago, {
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
