import axios from 'axios'
import nprogress from 'nprogress'

export default function (Vue) {
  const instance = axios.create({
    baseURL: 'https://api.npms.io/v2/'
  })
  instance.interceptors.request.use(config => {
    nprogress.start()
    return config
  }, Promise.reject)

  instance.interceptors.response.use(response => {
    nprogress.done()
    return response
  }, Promise.reject)

  Vue.prototype.$npms = instance
  Vue.prototype.$fetch = axios.create()
}
