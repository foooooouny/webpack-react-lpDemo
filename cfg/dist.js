'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackAssetPlugin = require('html-webpack-include-assets-plugin');

const baseConfig = require('./base');
const defaultSettings = require('./default');

// Add needed plugins here
// 生产环境所需额外插件

// let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../app/index.js'),
  output: {
    path: path.join(__dirname, '/../build/dist'),
    filename: 'js/[name].[chunkhash].js'
    // publicPath: defaultSettings.publicPath
    // sourceMapFilename: '[name].map'
  },
  cache: false,
  // devtool: 'sourcemap',
  devtool: 'hidden-source-map',
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dllConfig/antd-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dllConfig/react_dom-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dllConfig/react_A_router-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dllConfig/other-manifest.json')
    }),
    new HtmlWebpackPlugin({
      title: '移动保全',
      filename: 'index.html',
      template: path.join(__dirname, '/../app/index.templete.html'),
      inject: true,
      hash: true
      // minify: {    //压缩HTML文件
      //   removeComments: true,    //移除HTML中的注释
      //   collapseWhitespace: true    //删除空白符与换行符
      // }
    }),
    new HtmlWebpackAssetPlugin({
      assets: ['dll/antd.dll.js', 'dll/react_dom.dll.js', 'dll/react_A_router.dll.js', 'dll/other.dll.js'],
      files: ['index.html'],
      append: false,
      hash: true
    }),
    // 如果文件内容没有改变，则不重复打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'js/commons.[chunkhash].js',
      minChunks: 2
    }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': '"production"'
    // }),
    // new BowerWebpackPlugin({
    //   searchResolveModulesDirectories: false
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      comments: false,
      beautify: false,
      sourceMap: false
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.NoErrorsPlugin(),
    new defaultSettings.ExtractTextPlugin({
      filename: 'css/style.css',
			allChunks: true
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
// 生产环境所需额外 loades
config.module.rules.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/
  // include: [].concat(
  //   config.additionalPaths,
  //   [ path.join(__dirname, '/../src') ]
  // )
});

module.exports = config;
