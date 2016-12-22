const webpack = require('webpack')
const path = require('path')
const { DEV, ROOT, PORT } = require('../src/universal/settings')
const webpackDevServerUrl = `http://localhost:${PORT + 2}`

const plugins = DEV ? [
  new webpack.HotModuleReplacementPlugin() // enable webpack hot module replacement
] : [
  new webpack.optimize.UglifyJsPlugin()
]

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: [
    'webpack-dev-server/client?' + webpackDevServerUrl,
    'webpack/hot/only-dev-server',
    './src/client/index'
  ],
  output: {
    path: path.resolve(ROOT, 'dist'),
    publicPath: webpackDevServerUrl + '/dist/', // MUST BE FULL PATH!
    filename: 'client.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve('src'),
        query: {
          presets: ['react', 'react-hmre'],
        }
      }]
  },
  plugins: plugins
}
