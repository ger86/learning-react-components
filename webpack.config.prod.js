const merge = require('webpack-merge');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin(),
    //new BundleAnalyzerPlugin({ analyzerPort: 7777 })
  ],

  module: {
    rules: [
      {
        include: [/node_modules/, /src/],
        test: /(\.sass|\.css|\.scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
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
  }
});
