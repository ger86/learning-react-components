const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',

  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 8,
        compress: {
          dead_code: true,
          inline: false,
          global_defs: {
            'process.env.NODE_ENV': 'production'
          }
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin('styles.css')
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
              includePaths: ['./node_modules', './src/style'],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
});
