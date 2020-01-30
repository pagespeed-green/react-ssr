const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require('./webpack.config.base.js');

module.exports = function dev() {
  return webpackMerge(commonConfig(true, 'web'), {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.jsx'),
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
      publicPath: '/static/',
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      historyApiFallback: true,
      clientLogLevel: 'warning',
      compress: true,
      contentBase: path.join(__dirname, 'dist'),
      publicPath: '/static/',
      hot: true,
      inline: true,
      port: process.env.PORT || 3004,
      host: 'localhost',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      disableHostCheck: true,
      quiet: false,
      noInfo: false,
    },
    optimization: {
      minimize: false,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerPort: 3003,
      }),
    ],
  });
};
