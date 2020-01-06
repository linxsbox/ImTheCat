let proxyConfig = {
  // '/api': { // path rule 路径规则名
  //   target: '<url>', // 目标 host url
  //   changeOrigin: false, // 是否支持跨域 {type: Boolean, default: false}
  //   ws: false, // 是否是 websockets {type: Boolean, default: false}
  // },
};

let devServer = {
  host: '0.0.0.0',
  port: 8080,
  // 代理行为控制
  // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
  // overlay: { // 浏览器页面是否输出 警告 和 错误信息
  //   warnings: false, // 警告信息 {type: Boolean, default: false}
  //   errors: false // 错误信息 {type: Boolean, default: false}
  // }
  // https: false, // 是否是安全连接
  // open: false, // 是否打开浏览器
  // hotOnly: false,
};

if (Object.keys(proxyConfig).length > 0) {
  devServer['proxy'] = proxyConfig; // url or options
} else {
  console.log('webpack.proxy rules: ', Object.keys(proxyConfig).length);
}

module.exports = devServer;
