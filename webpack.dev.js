const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 3. inject style into DOM
          'css-loader', // 2. turns css into js
          'sass-loader', // 1. turns sass into css
        ],
      },
    ],
  },
  devtool: 'source-map',
})
