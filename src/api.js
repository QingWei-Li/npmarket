import axios from 'axios'
import nprogress from 'nprogress'

// const cached = {}

export default function (Vue) {
  const instance = axios.create({
    baseURL: 'https://api.npms.io/v2/'
  })
  instance.interceptors.request.use(config => {
    // if (cached[config.url]) {
    // }
    config.data = {}
    // Do something before request is sent
    nprogress.start()
    return config
  }, error => {
    // Do something with request error
    return Promise.reject(error)
  })

  instance.interceptors.response.use(response => {
    // Do something before request is sent
    nprogress.done()
    return response
  }, error => {
    // Do something with request error
    return Promise.reject(error)
  })

  Vue.prototype.$npms = instance
  Vue.prototype.$fetch = axios.create()
}
