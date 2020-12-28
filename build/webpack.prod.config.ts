import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const webpackProdConfig: Configuration = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            js: 'happypack/loader?id=babel',
            less: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'less-loader',
            ],
            css: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin({}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              minifyFontValues: { removeQuotes: false },
            },
          ],
        },
      }),
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          keep_fnames: false,
          keep_classnames: false,
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            comparisons: false,
          },
          output: {
            ascii_only: true,
            comments: false,
          },
        },
      }),
    ],
  },
});

export default webpackProdConfig;
