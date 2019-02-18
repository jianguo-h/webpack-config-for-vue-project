// 项目中的三方库放在这里统一打包，比如vue全家桶, axios等ajax库, 以及一些ui库(如element-ui, iview等)

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const libsPath = path.resolve(__dirname, '../app/libs');
const dllConfig = {
  mode: 'production',
  entry: {
    libs: ['vue'/* , 'vue-router', 'vuex' */]
  },
  output: {
    path: libsPath,
    filename: '[name].[hash:8].js',
    library: '[name]_library'
  },
  plugins: [
    new CleanWebpackPlugin([libsPath], {
      allowExternal: true
    }),
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_library',
      path: path.resolve(libsPath, '[name]-manifest.json')
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        warnings: false,
        output: {
          comments: false
        },
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
    })
  ]
};

webpack(dllConfig, (errout, stats) => {
  if(errout) throw errout;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');
});