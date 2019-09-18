const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename:'[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      // chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      root: __dirname, //根目录
      verbose: true, //开启控制台输出信息
      dry: false, //启用删除文件
      cleanAfterEveryBuildPatterns: ['dist/main.*.js', 'dist/mainfest.*.js'],
    }),
    // new webpack.NamedChunksPlugin(),
    // new WebpackMd5Hash(),
  ],
};
