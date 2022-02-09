import { UserConfig } from 'vite';
import viteVue from '@vitejs/plugin-vue';
import path from 'path';

const baseConfig: UserConfig = {
  base: '/',
  envPrefix: ['NODE_ENV', 'VUE_'],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]-[local]-[hash:base64:5]',
    },
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true,
      },
      css: {
        charset: false,
      },
    },
  },
  plugins: [viteVue()],
};

export default baseConfig;
