'use strict'
const common = require('./common');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const {
  entry,
  output,
  resolve,
  babelLoader,
} = common;

module.exports = {
  mode: 'production',
  entry,
  output,
  resolve,
  module:{
    rules: [
      babelLoader,
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              plugins: [ autoprefixer()]
            }
          },
          "sass-loader",
        ]
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      filename: '[path]',
    }),
  ]
};