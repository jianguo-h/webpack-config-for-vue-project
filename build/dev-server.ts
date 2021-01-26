import express from 'express';
import webpack from 'webpack';
import webpackDevConfig from './webpack.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';

const app = express();
const port = 8080;
const compiler = webpack(webpackDevConfig);
const url = 'http://localhost:' + port;

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler);
const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler);

// use middleWare
app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);

webpackDevMiddlewareInstance.waitUntilValid(async () => {
  console.log('server start at ' + url);
  await open(url);
});

app.listen(port);
