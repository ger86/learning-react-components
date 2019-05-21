const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
  module: {
    rules: [
      {
        include: [/node_modules/, /src/],
        test: /(\.sass|\.css|\.scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules', './src/sass'],
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    historyApiFallback: true,
    https: false
  }
});
