import webpack, { Configuration, Entry } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';

// add hot-reload related code to entry chunks
Object.keys(webpackBaseConfig.entry as Entry).forEach(name => {
  (webpackBaseConfig.entry as Entry)[name] = [
    'webpack-hot-middleware/client',
  ].concat((webpackBaseConfig.entry as Entry)[name]);
});

const webpackDevConfig: Configuration = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  output: {
    filename: 'static/js/[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

export default webpackDevConfig;
