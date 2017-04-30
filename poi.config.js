const OfflinePlugin = require('offline-plugin')

module.exports = options => ({
  autoprefixer: false,
  postcss: [
    require('postcss-salad')
  ],
  extendWebpack(config) {
    if (options.mode === 'production') {
      config
        .plugin('offline')
        .use(OfflinePlugin, [{
          caches: {
            main: [':rest:']
          },
          ServiceWorker: {
            events: true
          },
          AppCache: {
            events: true
          }
        }])
    }
  }
})
