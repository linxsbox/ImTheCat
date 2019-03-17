// see https://cli.vuejs.org/zh/config/
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 20480 // 小于 20kb 的文件内联
      }))
  }
}
