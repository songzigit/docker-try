const { merge } = require('webpack-merge');
const  { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const baseConfig = require('./webpack.common.config');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin()
  ]
});
