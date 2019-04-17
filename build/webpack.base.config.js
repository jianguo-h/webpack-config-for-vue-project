const path = require('path');
const config = require('../config');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
module.exports = {
  entry: {
    app: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.prod.publicPath : config.dev.publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|woff|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'static/images/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../app/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true
      }
    }),
    new HappyPack({
      id: 'babel',                      // 用id来标识
      // threads: 4,                    // 开启的子进程的个数
      threadPool: happyThreadPool,      // 共享进程池
      loaders: ['babel-loader']         // 处理的loader
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: ['css-loader', 'postcss-loader']
    }),
    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      loaders: ['css-loader', 'postcss-loader', 'less-loader']
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@app': path.resolve(__dirname, '../app'),
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: -10,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          chunks: "all",
          minChunks: 2,
          priority: -11
        },
        /*styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'all',
          enforce: true
        }*/
      }
    }
  }
};