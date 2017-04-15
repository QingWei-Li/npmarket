var OfflinePlugin = require('offline-plugin')
var offline = new OfflinePlugin({
  caches: {
    main: [':rest:']
  },
  ServiceWorker: {
    events: true
  },
  AppCache: {
    events: true
  }
})

module.exports = {
  postcss: [
    require('postcss-salad')
  ],
  autoprefixer: false,
  homepage: '/',
  eslint: true,
  sourceMap: false,
  production: {
    webpack(cfg) {
      cfg.plugins.push(offline)

      return cfg
    }
  }
}
