const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const webpackRoot = require('../webpack.frontend');

module.exports = {
  ...webpackRoot,
  output: {
    path: path.resolve(__dirname, '../dist/app-development'),
    filename: 'app-development.js',
  },
  plugins: [
    ...webpackRoot.plugins,
    new MiniCssExtractPlugin({
      filename: 'app-development.css',
    }),
    new MonacoPlugin({
      languages: ['typescript', 'javascript', 'csharp'],
    }),
  ],
};
