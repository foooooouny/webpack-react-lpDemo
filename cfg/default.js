'use strict';

let ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const srcPath = path.join(__dirname, '/../');
const defaultPort = 8000;

/**
 *
 * Get the default modules object for webpack
 *
 * @return {object}
 *
 * 配置默认的参数
 */

let getDefaultModules = () => {
  return {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // 加载器的执行顺序，不设置为正常执行。可选值 'pre|post' 前|后
        enforce: 'pre',
        include: srcPath,
        // exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader'})
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader']}),
        include: srcPath
      },
      {
        test: /\.styl/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader']
      },
      // {
      //   test: /\.(eot|ttf|woff|woff2)$/,
      //   loader: 'url-loader?limit=8192&name=image/[name].[ext]'
      // },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader?name=image/[name].[ext]'
      },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file-loader?name=videos/[name].[ext]'
      }
      // json-loader 在webpack2中默认读取
      // {
      //   test: /\.json$/,
      //   use: [
      //     'json-loader',
      //     {
      //       exclude: /node_modules/
      //     }
      //   ]
      // }
      // ,{
      //   test: /\.(js|jsx)$/, //用babel编译jsx和es6
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      //   options: {
      //     cacheDirectory: true,
      //     presets: ['es2015', 'react'],
      //     plugins: [
      //         ['transform-object-rest-spread'],
      //         ['transform-runtime']
      //     ]
      //   }
      // }
    ]
  }
}

module.exports = {
  srcPath,
  publicPath: '/public/',
  port: defaultPort,
  getDefaultModules,
  ExtractTextPlugin
};

