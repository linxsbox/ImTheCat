const path = require('path');
const devServer = require('./webpack.proxy.js');
const env = process.env.NODE_ENV === 'production';

function resolve (dir) {
  return path.join(__dirname, dir);
}

// see https://cli.vuejs.org/zh/config/
module.exports = {
  // outputDir: 'dist', // 构建文件路径 {type: String, default: 'dist'}
  // assetsDir: '', // 静态资源文件路径，相对于 outputDir 目录 {type: String, default: ''}
  // indexPath: 'index.html', // index.html 的输出路径，相对于 outputDir 目录 {type: String, default: 'index.html'}
  // filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。要求 index 的 HTML 是被 Vue CLI 自动生成的。
  // lintOnSave: true, // eslint-loader 配置 true | false | 'error'
  // productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  publicPath: env ? '/blog/' : '/',
  // 开发 web 服务配置
  devServer: devServer,
  configureWebpack: () => {
    if (env) {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  // https://github.com/neutrinojs/webpack-chain
  chainWebpack: config => {
    config.resolve.alias // 别名配置
      // @  .  ~ 三者在默认环境中以实现相关配置规则，覆盖则会导致错误
      // https://cli.vuejs.org/zh/guide/html-and-static-assets.html#url-%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99
      .set('cps', resolve('./src/components'))
      .set('assets', resolve('./src/assets'));

    config.resolve.extensions
      .add('.ts');

    config.module // 图片载入配置
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 40960 // 小于 40kb 的文件内联
      }));

    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader');

    // 删除构建时默认产生的 preload & prefetch 类型是 link 的标签。
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
  pwa: {
    // pwa
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
};
