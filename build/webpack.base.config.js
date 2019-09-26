const path = require('path');
const config = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.prod.publicPath
        : config.dev.publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
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
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@src': path.resolve(__dirname, '../src')
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
          reuseExistingChunk: true
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: -11
        }
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
