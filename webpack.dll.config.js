const webpack = require('webpack');
const library = '[name]_dll';
const path = require('path');
const args = require('minimist')(process.argv.slice(2));
// console.log(args.env)

const vendorDlls = [
  'react',
  'react-dom',
  'react-router',
  'antd'
]

module.exports = {
  entry: {
    vendorDlls
  },
  output: {
    path: path.join(__dirname, `/build/${args.env}`),
    filename: 'dll/[name].dll.js',
    library
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      comments: false,
      beautify: false,
      sourceMap: false
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'manifest.json'),
      // This must match the output.library option above
      name: library
    })
  ]
}