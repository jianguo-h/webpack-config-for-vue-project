const express = require('express');
const webpack = require('webpack');
const config = require('../config');
const webpackDevConfig = require('./webpack.dev.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// 当环境变量不存在时设置为开发环境
if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env;
}

const app = express();
const devPort = config.dev.port;
const compiler = webpack(webpackDevConfig);
const url = 'http://localhost:' + devPort;

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  stats: { colors: true }
});
const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler, {
  log: () => { }
});

// force page reload when html-webpack-plugin template changes
compiler.hooks.compilation.tap('HtmlWebpackPlugin', compilation => {
  compilation.hooks.htmlWebpackPluginAfterEmit.tap('HtmlWebpackPlugin', () => {
    webpackHotMiddlewareInstance.publish({
      action: 'reload'
    });
  });
});
/*compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    webpackHotMiddlewareInstance.publish({
      action: 'reload'
    });
    cb();
  });
}); */

// use middleWare
app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);

let _resolve;
new Promise(resolve => {
  _resolve = resolve;
});

webpackDevMiddlewareInstance.waitUntilValid(() => {
  console.log('server start at ' + url);
  _resolve();
});

app.listen(devPort);