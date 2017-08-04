'use strict';

const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base');
const defaultSettings = require('./default');

// Add needed plugins here
// 开发环境需要的 插件
// let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server/',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, '/../build/public'),
    filename: 'js/app.js',
    publicPath: defaultSettings.publicPath
    // sourceMapFilename: '[name].map'
  },
  cache: true,
  // devtool: 'eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: '移动保全',
    //   filename: 'index.html',
    //   template: path.join(__dirname, '/../app/index.templete.html'),
    //   inject: true,
    //   hash: true
    //   // minify: {    //压缩HTML文件
    //   //   removeComments: true,    //移除HTML中的注释
    //   //   collapseWhitespace: true    //删除空白符与换行符
    //   // }
    // }),
    // 如果文件内容没有改变，则不重复打包
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commons',
    //   filename: 'js/commons.js',
    //   minChunks: 2
    // }),
    // debug 配置项需要使用插件的形式引入
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: true
    //   },
    //   comments: false,
    //   beautify: false,
    //   sourceMap: false
    // }),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.NoErrorsPlugin(),
    new defaultSettings.ExtractTextPlugin('css/style.css')
  ],
  module: defaultSettings.getDefaultModules()
})

// Add needed loaders to the defaults here
// 开发环境需要的 loaders
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  // include: defaultSettings.srcPath,
  // loader: 'babel-loader',
  loaders: ['react-hot-loader/webpack', 'babel-loader']
  
//   // use: [{
//   //   loader: 'babel-loader',
//   //    options: {
//   //     "babelrc": false,
//   //     "presets": [
//   //       "es2015", "stage-2", "react"
//   //     ]
//   //   }
//   // }]
//   // include: [].concat(
//   //   config.additionalPaths,
//   //   [ path.join(__dirname, '/../src') ]
//   // )
});

module.exports = config;
