const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = function base(isDebug, target) {
  return {
    context: path.resolve(__dirname, './src'),
    target: 'web',
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        // NOTE: if you add a new alias be sure to also update .babelrc
        src: path.resolve('./src'),
      },
      modules: [
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'src'),
      ],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: [path.join(__dirname, 'node_modules')],
          loader: 'babel-loader',
          include: [path.join(__dirname, 'src')],
          options: {
            cacheDirectory: isDebug,
            babelrc: true,
            caller: { target },
          },
        },
        {
          test: /\.s?[ac]ss$/,
          exclude: [path.join(__dirname, 'node_modules')],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            'css-loader',
            'sass-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.s?[ac]ss$/,
          include: [path.join(__dirname, 'node_modules')],
          use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/i,
          loader: 'file-loader',
          options: {
            name() {
              if (process.env.NODE_ENV === 'development') {
                return '[path][name].[ext]';
              }

              return '[path][name].[ext]'; // [hash]
            },
            outputPath: 'images/',
          },
        },
        // Font Definitions
        {
          test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        template: './public/index.ejs',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
        inject: true,
        alwaysWriteToDisk: true,
      }),
      new ScriptExtHtmlWebpackPlugin(),
      new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, 'dist'),
      }),
      new ResourceHintWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isDebug ? '[name].css' : '[name].[chunkhash:8].css',
        chunkFilename: isDebug ? '[name].css' : '[id].[chunkhash:8].css',
      }),
      new CopyWebpackPlugin([
        path.resolve(__dirname, './src/public/robots.txt'),
        path.resolve(__dirname, './src/public/favicons/favicon.ico'),
        path.resolve(__dirname, './src/public/favicons/android-chrome-192x192.png'),
        path.resolve(__dirname, './src/public/favicons/android-chrome-512x512.png'),
        path.resolve(__dirname, './src/public/favicons/apple-touch-icon.png'),
        path.resolve(__dirname, './src/public/favicons/favicon-16x16.png'),
        path.resolve(__dirname, './src/public/favicons/favicon-32x32.png'),
        path.resolve(__dirname, './src/public/favicons/favicon.ico'),
        path.resolve(__dirname, './src/public/favicons/site.webmanifest'),
      ]),
      new LoadablePlugin(),
    ],
  };
};
