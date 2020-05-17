import express from 'express';
import webpack from 'webpack';
import webpackDevConfig from './webpack.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import { DEV_PORT } from './constant';

const app = express();
const compiler = webpack(webpackDevConfig);
const url = 'http://localhost:' + DEV_PORT;

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output?.publicPath ?? '/',
  stats: { colors: true },
});
const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler);

// force page reload when html-webpack-plugin template changes
/* compiler.hooks.compilation.tap('HtmlWebpackPlugin', compilation => {
  compilation.hooks.htmlWebpackPluginAfterEmit.tap('HtmlWebpackPlugin', () => {
    webpackHotMiddlewareInstance.publish({
      action: 'reload',
    });
  });
}); */

// use middleWare
app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);

webpackDevMiddlewareInstance.waitUntilValid(async () => {
  console.log('server start at ' + url);
  await open(url);
});

app.listen(DEV_PORT);
