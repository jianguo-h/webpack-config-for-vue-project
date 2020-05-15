import express from 'express';
import webpack from 'webpack';
import webpackDevConfig from './webpack.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';

const app = express();
const devPort = process.env.PORT ?? 8080;
const compiler = webpack(webpackDevConfig);
const url = 'http://localhost:' + devPort;

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

app.listen(devPort);
