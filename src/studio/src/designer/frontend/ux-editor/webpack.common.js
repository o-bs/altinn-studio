const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpackRoot = require('../webpack.frontend');

module.exports = {
  ...webpackRoot,
  output: {
    path: path.resolve(__dirname, '../dist/ux-editor'),
    filename: 'ui-editor.js',
  },
  plugins: [
    ...webpackRoot.plugins,
    new MiniCssExtractPlugin({
      filename: 'ui-editor.css',
    }),
  ],
};
