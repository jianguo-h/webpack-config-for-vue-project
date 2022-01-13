/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const webpackBaseConfig: Configuration = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: !isProduction,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader'],
      },
      {
        test: /.less$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          'postcss-loader',
        ],
      },
      {
        exclude: [
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /\.vue$/,
          /\.(css|sass|scss|less)$/,
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : undefined,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
};

export default webpackBaseConfig;
