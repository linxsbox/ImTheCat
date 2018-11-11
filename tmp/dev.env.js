'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const console = require('console')
const conf = require('../src/config')

const tempPorxyTable = `
{
  "${conf.dev.rootpath}": {
    "target": "${conf.dev.url}",
    "changeOrigin": true,
    "pathRewrite": {}
  }
}`
// "^${conf.dev.rootpath}": "${conf.dev.rootpath}"
const proxyTable = conf.dev.origin ? JSON.parse(tempPorxyTable) : {}

console.info('Development origin proxy: \x1b[33m%s\x1b[0m \n', conf.dev.origin)

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PROXY_TABLE: proxyTable
})
