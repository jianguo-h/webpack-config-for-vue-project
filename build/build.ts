import { UserConfig } from 'vite';
import { merge } from 'webpack-merge';
import baseConfig from './base.config';
import path from 'path';

const buildConfig: UserConfig = merge(baseConfig, {
  mode: 'production',
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: atRule => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  esbuild: {
    legalComments: 'none',
    minifyWhitespace: true,
    minifySyntax: true,
    pure: [...Object.keys(console).map(funcName => `console.${funcName}`)],
  },
  build: {
    brotliSize: false,
    target: 'modules',
    outDir: path.resolve(__dirname, '../dist'),
    assetsDir: 'static',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1024,
    reportCompressedSize: false,
    sourcemap: false,
    manifest: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        entryFileNames: 'static/js/app.[hash].entry.js',
        chunkFileNames: 'static/js/[name].[hash].chunk.js',
        assetFileNames: chunkInfo => {
          if (chunkInfo.name.endsWith('.css')) {
            return 'static/css/[name].[hash].asset.css';
          }
          return 'static/media/[name].[hash].asset.[ext]';
        },
      },
    },
  },
});

export default buildConfig;
