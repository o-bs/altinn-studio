const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpackRoot = require('../webpack.frontend');

module.exports = {
  ...webpackRoot,
  output: {
    path: path.resolve(__dirname, '../dist/dashboard'),
    filename: 'dashboard.js',
  },
  plugins: [
    ...webpackRoot.plugins,
    new MiniCssExtractPlugin({
      filename: 'dashboard.css',
    }),
  ],
};
console.log(module.exports, __dirname, __filename);
