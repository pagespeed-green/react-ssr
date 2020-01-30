const webpackMerge = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const commonConfig = require('./webpack.config.base.js');

function getEntryByTarget(target) {
  if (target === 'web') {
    return path.resolve(__dirname, './src/index.jsx');
  }

  return path.resolve(__dirname, './src/index-ssr.js');
}

function getProdConfig(target) {
  return webpackMerge(commonConfig(false, target), {
    name: target,
    target,
    entry: getEntryByTarget(target),
    output: {
      path: `${__dirname}/dist/${target}`,
      filename: '[id]-[chunkhash:8].js',
      publicPath: '/static/',
      libraryTarget: target === 'node' ? 'commonjs2' : undefined,
    },
    externals:
      target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 250000,
        maxSize: 1500000,
      },
      minimizer: [new TerserPlugin({
        cache: true,
        parallel: true,
      }), new OptimizeCSSAssetsPlugin({})],
    },
  });
}

module.exports = [getProdConfig('web'), getProdConfig('node')];
