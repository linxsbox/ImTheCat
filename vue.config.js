
let env = process.env.NODE_ENV === 'production'

// let proxyConfig = {
//   '/api': { // path rule 路径规则名
//     target: '<url>', // 目标 host url
//     changeOrigin: false, // 是否支持跨域 {type: Boolean, default: false}
//     ws: false, // 是否是 websockets {type: Boolean, default: false}
//   },
// }

let devServer = {
  host: '0.0.0.0',
  port: 8080,
  // 代理行为控制
  // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
  // proxy: proxyConfig, // url or options
  // overlay: { // 浏览器页面是否输出 警告 和 错误信息
  //   warnings: false, // 警告信息 {type: Boolean, default: false}
  //   errors: false // 错误信息 {type: Boolean, default: false}
  // }
  // https: false, // 是否是安全连接
  // open: false, // 是否打开浏览器
  // hotOnly: false,
}

// see https://cli.vuejs.org/zh/config/
module.exports = {
  // outputDir: 'dist', // 构建文件路径 {type: String, default: 'dist'}
  // assetsDir: '', // 静态资源文件路径，相对于 outputDir 目录 {type: String, default: ''}
  // indexPath: 'index.html', // index.html 的输出路径，相对于 outputDir 目录 {type: String, default: 'index.html'}
  // filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。要求 index 的 HTML 是被 Vue CLI 自动生成的。
  // lintOnSave: true, // eslint-loader 配置 true | false | 'error'
  // productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  // 开发 web 服务配置
  devServer: devServer,
  configureWebpack: () => {
    if (env) {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // config.resolve.alias // 别名配置
    config.module // 图片载入配置
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 40960 // 小于 40kb 的文件内联
      }))
  }
}
