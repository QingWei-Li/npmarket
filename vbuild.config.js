const OfflinePlugin = require('offline-plugin')

module.exports = options => ({
  postcss: [
    require('postcss-salad')
  ],
  autoprefixer: false,
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
