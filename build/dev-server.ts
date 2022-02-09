import { createServer } from 'vite';
import detectPort from 'detect-port';
import baseConfig from './base.config';
import { merge } from 'webpack-merge';
import checker from 'vite-plugin-checker';

const devConfig = merge(baseConfig, {
  mode: 'development',
  plugins: [
    checker({
      typescript: true,
      overlay: true,
      // eslint: {
      //   files: Object.values(baseConfig?.resolve?.alias ?? {}),
      //   extensions: baseConfig?.resolve?.extensions ?? [],
      // },
    }),
  ],
  server: {
    hmr: true,
    open: true,
    host: true,
  },
});

let port = 8080;
async function startDevServer() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _port = await detectPort(port);
  if (_port === port && devConfig.server) {
    devConfig.server.port = _port;
    const server = await createServer(devConfig);
    await server.listen();
    server.printUrls();
    return;
  }
  port += 1;
  await startDevServer();
}

startDevServer();
