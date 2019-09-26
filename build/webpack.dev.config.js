const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

// add hot-reload related code to entry chunks
Object.keys(webpackBaseConfig.entry).forEach(name => {
  webpackBaseConfig.entry[name] = ['webpack-hot-middleware/client'].concat(
    webpackBaseConfig.entry[name]
  );
});

const webpackDevConfig = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
        /* use: [
          {
            loader: 'vue-loader',
            options: {
              js: 'babel-loader',
              css: ['style-loader', 'happypack/loader?id=css'],
              less: ['style-loader', 'happypack/loader?id=less']
            }
          }
        ] */
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});

module.exports = webpackDevConfig;
