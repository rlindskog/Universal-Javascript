const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { DEV, ROOT, PORT } = require('../src/universal/settings')


const plugins = DEV ? [] : [ new webpack.optimize.UglifyJsPlugin() ]
module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: './src/server/server.js', // set this to your server entry point. This should be where you start your express server with .listen()
  target: 'node', // tell webpack this bundle will be used in nodejs environment.
  externals: [nodeExternals()], // Omit node_modules code from the bundle. You don't want and don't need them in the bundle.
  output: {
    path: path.resolve('dist'),
    filename: 'serverBundle.js',
    libraryTarget: 'commonjs2' // IMPORTANT! Add module.exports to the beginning of the bundle, so universal-hot-reload can access your app.
  },
  // The rest of the config is pretty standard and can contain other webpack stuff you need.
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve('src')
      }]
  },
  plugins: plugins

}
