const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /(\.jsx|\.js)$/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [__dirname, 'node_modules'],
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Config: path.resolve(__dirname, 'src/config/'),
      Ducks: path.resolve(__dirname, 'src/ducks/'),
      PropTypes: path.resolve(__dirname, 'src/prop-types/'),
      Scenes: path.resolve(__dirname, 'src/scenes/'),
      Services: path.resolve(__dirname, 'src/services/'),
      Utils: path.resolve(__dirname, 'src/utils/')
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: 'Cloud District',
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
