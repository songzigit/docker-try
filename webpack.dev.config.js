const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 9999,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://music_api:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
});
