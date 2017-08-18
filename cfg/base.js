'use strict';

const path = require('path');
const defaultSettings = require('./default');
// const node_modules = path.resolve(__dirname, 'node_modules');
// const pathToReact = path.resolve(node_modules, 'react/dist/react.js');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:

// 额外的项目插件，放在 additionalPaths 数组里面
// let additionalPaths = [];

module.exports = {
  // additionalPaths: additionalPaths,
  // port: defaultSettings.port,
  // debug: true,
  devtool: 'eval-source-map',
  // output: {
  //   path: path.join(__dirname, '/../build/public'),
  //   filename: 'app.js',
  //   publicPath: defaultSettings.publicPath
  //   // sourceMapFilename: '[name].map'
  // },
  // __dirname 代表当前路径
  // context: path.join(__dirname, '/../src'),
  devServer: {
    contentBase: path.join(__dirname, '/../app'),
    historyApiFallback: true,
    hot: true,
    open: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false,
    proxy: {
      '/api': {
        target: 'http://jiekouUrl.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  // resolve 指定可以被 import 的文件后缀
  resolve: {
    extensions: ['.js', '.jsx', '.less'],
    // resolve.alias 路径的别名，方便引入文件的时候简写.
    alias: {
      // react: pathToReact,
      Actions: `${defaultSettings.srcPath}/actions/`,
      Api: `${defaultSettings.srcPath}/api/`,
      Components: `${defaultSettings.srcPath}/components/`,
      Stores: `${defaultSettings.srcPath}/stores/`,
      Styles: `${defaultSettings.srcPath}/styles/`,
      Util: `${defaultSettings.srcPath}/utils/`,
      // 设置 appEnv 为当前环境
      Config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
      // moment: 'moment/min/moment-with-locales.min.js'
    },
    modules: [
      path.resolve(__dirname, 'app'), 'node_modules'
    ]
  }
  // modules: {
  //   //  确定moment模块中没有其它新的依赖 就可以配置这项，webpack 将不再扫描这个文件中的依赖。
  //   noParse: [/moment-with-locales/]
  // }
}
