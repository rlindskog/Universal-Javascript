const path = require('path')

function Settings() {
  this.HOST = process.env.HOST || 'localhost'
  this.PORT = process.env.PORT || 3000
  this.DEV = process.env.NODE_ENV !== 'production'
  this.PROD = !this.DEV
  this.ROOT = path.resolve(__dirname, '..', '..')
}

module.exports = new Settings()
