import webpack, { Configuration, Entry } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config';

const baseConfigEntry = webpackBaseConfig.entry;
const devConfigEntry: Entry = {};
if (typeof baseConfigEntry === 'object' && !Array.isArray(baseConfigEntry)) {
  Object.keys(baseConfigEntry).forEach(entryName => {
    devConfigEntry[entryName] = ['webpack-hot-middleware/client'].concat(
      baseConfigEntry[entryName] as string
    );
  });
}

const webpackDevConfig: Configuration = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: devConfigEntry,
  output: {
    filename: 'static/js/[name].[fullhash:8].js',
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
