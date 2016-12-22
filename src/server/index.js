// require('babel-polyfill')
const universalHotReload = require('universal-hot-reload').default
universalHotReload(
  require('../../webpack/server.config.js'),
  require('../../webpack/client.config.js')
)
